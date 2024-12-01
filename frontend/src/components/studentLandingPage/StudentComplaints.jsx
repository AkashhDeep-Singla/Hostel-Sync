import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faExclamationCircle, faInfoCircle, faCheckCircle, faSpinner, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const StudentComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3005/logout", {}, { withCredentials: true });
            if (response.status === 200) {
                localStorage.clear();
                navigate("/");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:3005/student/stdComplaintList', {
                    withCredentials: true,
                });
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setComplaints(sortedData);
            } catch (error) {
                console.error('Error fetching complaints data:', error);
            }
        };

        fetchComplaints();
    }, []);

    const getStatusIconAndText = (status) => {
        switch (status) {
            case 'Approved':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl mr-2" />
                        <span className="text-green-500">{status}</span>
                    </div>
                );
            case 'Rejected':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl mr-2" />
                        <span className="text-red-500">{status}</span>
                    </div>
                );
            case 'Pending':
                return (
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSpinner} className="text-yellow-500 text-2xl mr-2 animate-spin" />
                        <span className="text-yellow-500">{status}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const getIssueIcon = (issueType) => {
        switch (issueType) {
            case 'Maintenance':
                return faWrench;
            case 'Safety':
                return faExclamationCircle;
            case 'Information':
            default:
                return faInfoCircle;
        }
    };

    return (
        <>
            <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-white">
                <div className="logo mb-4 md:mb-0">
                    <a href="#"><img src="./nameLogo.jpg" alt="logo" /></a>
                </div>
                <div className="nav__btns ml-auto">
                    <button className="btn bg-[#e82574] text-white py-2 px-4 rounded hover:bg-pink-500"
                        onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="complaint-container">
                {complaints.map((complaint, index) => (
                    <div key={index} className="complaint-details-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black">
                        <div className="left-side w-full md:w-1/2 mb-4 md:mb-0">
                            <p><strong>Type of complaint:</strong> {complaint.issuetype}</p>
                            <p><strong>Issue:</strong> {complaint.issue}</p>
                            <p><strong>Description:</strong> {complaint.description}</p>
                        </div>
                        <div className="right-side w-full md:w-1/2 flex items-center justify-center md:justify-end">
                            <p><strong>Status:</strong> {getStatusIconAndText(complaint.status)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StudentComplaints;
