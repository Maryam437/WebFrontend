import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        country: '',
        password: '',
        address: ''
    });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/student/all')
            .then(response => {
                setStudents(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error when listing students:', error);
            });
    }, []);

    const handleDelete = (studentId) => {
        axios.delete(`http://localhost:8081/api/student/delete/${studentId}`)
            .then(response => {
                setFeedback('Student deleted successfully');
                axios.get('http://localhost:8081/api/student/all')
                    .then(response => {
                        setStudents(response.data);
                    })
                    .catch(error => {
                        console.error('Error when listing students:', error);
                    });
            })
            .catch(error => {
                setFeedback('Error when deleting student');
                console.error('Error when deleting student:', error);
            });
    }

    const handleUpdate = (studentId) => {
        setCurrentStudent(studentId);
        const student = students.find(std => std.id === studentId);
        setUpdatedData({
            firstname: student.firstname,
            lastname: student.lastname,
            email: student.email,
            age: student.age,
            country: student.country,
            address: student.address,
            password: student.password
        });
        setIsModalOpen(true);
    }

    const handleSubmit = () => {
        axios.put(`http://localhost:8081/api/student/update/${currentStudent}`, updatedData)
            .then(response => {
                setFeedback('Student updated successfully');
                setIsModalOpen(false);
                axios.get('http://localhost:8081/api/student/all')
                    .then(response => {
                        setStudents(response.data);
                    })
                    .catch(error => {
                        console.error('Error when listing students:', error);
                    });
            })
            .catch(error => {
                setFeedback('Error when updating student');
                console.error('Error when updating student:', error);
            });
    }

    const handleChange = (e) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-900">Student Profile</h1>
                {feedback && <p className="text-center mb-4 text-green-600">{feedback}</p>}
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">S/N</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">First Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Last Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Age</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Country</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Address</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Update</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((std, index) => (
                            <tr key={std.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{index + 1}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.firstname}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.lastname}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.age}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.country}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{std.address}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    <button onClick={() => handleUpdate(std.id)} className="ml-2 text-blue-600">Update</button>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                    <button onClick={() => handleDelete(std.id)} className="ml-2 text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Update Student</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={updatedData.firstname}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={updatedData.lastname}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={updatedData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={updatedData.age}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={updatedData.country}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={updatedData.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
