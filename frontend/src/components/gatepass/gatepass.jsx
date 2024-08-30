import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import '../repeatPop.css'

const Gatepass = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        enrollmentNumber: '',
        gender:'',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        parentname: '',
        parentphone: '',
        parentEmail: '',
        roomtype: '',
        hostelname: '',
        roomseater:'',
        roomfloor:'',
    });
    const [termsAgreed, setTermsAgreed] = useState(false);

    const hostelNames = {
        Female: {
          'Attach Bathroom Non AC': ['IBN-A','IBN-B','IBN-C'],
          'Common Bathroom Non AC': ['Pie-A', 'Pie-B','Pie-C'],
          'Attach Bathroom With AC': ['Nightingale-A', 'Nightingale-B'],
          'Common Bathroom With AC': ['Vasco'],
        },
        Male: {
          'Attach Bathroom Non AC': ['Colambus'],
          'Common Bathroom Non AC': ['Armstrong'],
          'Attach Bathroom With AC': ['Franklin'],
          'Common Bathroom With AC': ['Marco Polo'],
        }
      };

    const images = [
        {
            src: "https://images.pexels.com/photos/7969098/pexels-photo-7969098.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Capture the Beauty",
        },
        {
            src: "https://images.pexels.com/photos/4907235/pexels-photo-4907235.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
            src: "https://images.pexels.com/photos/7969094/pexels-photo-7969094.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
    ];

    useEffect(() => {
        gsap.fromTo(
            ".signup-container",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline
            .to(".signup-image", {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power4.out",
                stagger: 0.1,
            })
            .set(".signup-image", { opacity: 0, scale: 0.8 })
            .to(`.signup-image:nth-child(${ currentImage + 1})`, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power4.out",
            });
    }, [currentImage]);

    const handleClick = () => {
        navigate("/user");
        if (window.location.pathname === "/") {
            window.location.reload();
        }
    };

    const handleSlide = (index) => {
        if (index !== currentImage) {
            setCurrentImage(index);
        }
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = () => {
        setTermsAgreed(!termsAgreed);
    };

    const handleSubmit = async () => {
    
        if (!termsAgreed) {
            alert("You must agree to the terms and conditions.");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3005/reservation", formData);
            console.log("Booking successful", response);
            alert('Your request has been sent will let you know about the room');
            navigate("/");
        } catch (error) {
            console.error("Error booking", error);
            alert("Failed to book. Please try again.");
        }
    };

    function handlePopClose(){
        const forms = document.getElementsByClassName("popForm");
        for (let i = 0; i < forms.length; i++) {
            forms[i].style.transform = 'scale(0)';
        }    
    }

return (
    <div className="fixer">
        <div className="black__div"></div>
        <div className="w-full h-screen bg-transparent flex items-center justify-center main_form">
        <div className="signup-container w-[70%] h-[70%] bg-white rounded-2xl flex overflow-hidden p-2 px-2 relative gap-3">
            <img
                className="absolute left-0 z-10 top-0"
                width={150}
                src="/logo-noback.png"
                alt=""
            />
            
            <p className="absolute z-10 text-white bottom-0 text-[70px] font-montserrat my-20 mx-[50px] font-bold block text-center">
                HostelSync
            </p>
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={`Slide ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity rounded-2xl signup-image ${currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }}
            />
        ))}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlide(index)}
                            className={`w-6 h-3 rounded-full ${currentImage === index ? "bg-white" : "bg-white/50"
                                } transition-all duration-300`}
                        ></button>
                    ))}
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between font-montserrat gap-2 p-5">
                    <div className="flex flex-col gap-10 justify-between">
                        <h1 className="text-[35px]">Applying for Gatepass</h1>
                        <div className="flex flex-col gap-4 justify-between">
                            <div>
                                <input 
                                    name="enrollmentNumber"
                                    className="border-black border-solid border-[2px] p-5 rounded-2xl w-full"
                                    type="text"
                                    placeholder="University RollNo."
                                    value={formData.enrollmentNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    name="outday"
                                    className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="Out Day"
                                    value={formData.outday}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Out Day</option>
                                    <option value="Day Out">Day Out</option>
                                    <option value="Night Out">Night Out</option>
                                </select>
                                <select
                                    name="reason"
                                    className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                    type="text"
                                    placeholder="Reason for out"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required>
                                    <option value="">Select Reason</option>
                                    <option value="Going to Tricity">Going to Tricity</option>
                                    <option value="Going Home">Going Home</option>
                                    <option value="Going for Grooming">Going for Grooming</option>
                                    <option value="Vacation">Vacation</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Going to City">Going to City</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="block mb-1 text-gray-700">Out Time</label>
                                <input
                                    name="outtime"
                                    className="border-black flex-1 border-solid border-[2px] p-5 rounded-2xl"
                                    type="time"
                                    placeholder="Out Time"
                                    value={formData.outtime}
                                    onChange={handleChange}
                                />
                                <label className="block mb-1 text-gray-700">In Time</label>
                                <input
                                    name="intime"
                                    className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                    type="time"
                                    placeholder="In Time"
                                    value={formData.intime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                {formData.outday === 'Night Out'? (
                                    <>
                                        <label className="block mb-1 text-gray-700">Out Date</label>
                                        <input
                                            name="outdate"
                                            className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                            type="date"
                                            placeholder="Out Date"
                                            value={formData.outdate}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="block mb-1 text-gray-700">In Date</label>
                                        <input
                                            name="indate"
                                            className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                            type="date"
                                            placeholder="In Date"
                                            value={formData.indate}
                                            onChange={handleChange}
                                        />
                                    </>
                                ):(
                                    <>
                                        <label className="block mb-1 text-gray-700">Out Date</label>
                                        <input
                                            name="outdate"
                                            className="flex-1 border-black border-solid border-[2px] p-5 rounded-2xl"
                                            type="date"
                                            value={formData.outdate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-full flex items-end">
                            <button
                                onClick={handleSubmit}
                                className="w-full text-[30px] text-white bg-[#e82574] p-3 rounded-2xl hover:bg-[#bc1c5c] transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </div>
);
};

export default Gatepass;