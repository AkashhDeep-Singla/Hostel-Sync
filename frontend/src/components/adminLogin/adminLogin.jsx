import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../LoginRegister/loginRegister.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function AdminLogin() {
    const [formData, setFormData] = useState({
        name: '',
        hostel: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isActive, setIsActive] = useState(false);
    const makeActive = () => {
        setIsActive(true);
    };
    const removeActive = () => {
        setIsActive(false);
    };

    const [passwordMatch, setPasswordMatch] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!passwordMatch) {
            alert("Passwords dont match")
            console.log(formData);
            return
        }
        try {
            const response = await axios.post(
                "http://localhost:3005/admin/signup",
                formData,
                {
                    withCredentials: true
                }
            )
            console.log(response);
            navigate("/account");
            alert("User registered successfully !")
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.msg || "An error occurred";
            alert(errorMessage);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(() => ({
            ...formData,
            [name]: value,
        }))
        if (name === "password" || name === "confirm_password") {
            setPasswordMatch(
                name === "password"
                    ? value === formData.confirmPassword : value === formData.password
            )
        }
    }

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:3005/admin/login",
                loginData, {
                withCredentials: true
            }
            )
            console.log(response);
            alert("Login successfull !")
            navigate('/account')
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.message || "An error occurred";
            alert(errorMessage);
        }
    }

    const handleChangeAgain = (e) => {
        const { name, value } = e.target
        setLoginData(() => ({
            ...loginData,
            [name]: value,
        }))
    }


    return (
        <div className="logMain">
            <div class={isActive ? "logContainer active" : "logContainer"} id="logContainer">
                <div class="form-logContainer sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <input type="text" name="name" id='name' onChange={handleChange} value={formData.name} placeholder="Name" />
                        <input type="text" name="hostel" id='hostel' onChange={handleChange} value={formData.hostel} placeholder="Hostel" />
                        <input type="text" name="role" id='role' onChange={handleChange} value={formData.role} placeholder="Role" />
                        <input type="email" name="email" id='email' onChange={handleChange} value={formData.email} placeholder="Email" />
                        <div className='relative w-[100%]'>
                            <input type={passwordVisible ? "text" : "password"} name="password" id='password' onChange={handleChange} value={formData.password} placeholder="Password" />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                            />
                        </div>
                        <div className='relative w-[100%]'>
                            <input type={confirmPasswordVisible ? "text" : "password"} name="confirm_password" id='confirm_password' onChange={handleChange} value={formData.confirm_password} placeholder="Confirm Password" />
                            <FontAwesomeIcon
                                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                            />
                        </div>
                        <input type="password" name="password" id='password' onChange={handleChange} value={formData.password} placeholder="Password" />
                        <input type="password" name="confirmPassword" id='confirmPassword' onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-logContainer sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input type="email" name="email" id='email' onChange={handleChangeAgain} value={loginData.email} placeholder="Email" />
                        <div className='relative w-[100%]'>
                            <input type={passwordVisible ? "text" : "password"} name="password" id='password' onChange={handleChangeAgain} value={loginData.password} placeholder="Password" />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                            />
                        </div>
                        <a href="#">Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="toggle-logContainer">
                    <div class="toggle">
                        <div class="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button class="hider" id="login" onClick={removeActive}>Sign In</button>
                        </div>
                        <div class="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button class="hider" id="register" onClick={makeActive}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
