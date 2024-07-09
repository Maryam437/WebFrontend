import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Instructure = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [instructures, setInstructures] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const API_URL = 'http://localhost:8081/api/instructure';

  useEffect(() => {
    fetchInstructures();
  }, []);

  const fetchInstructures = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setInstructures(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInstructure = { name, email, subject, experience, qualification };

    try {
      if (editing) {
        await axios.put(`${API_URL}/update/${currentId}`, newInstructure);
        setEditing(false);
        setCurrentId(null);
      } else {
        await axios.post(`${API_URL}/create`, newInstructure);
      }
      fetchInstructures();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (instructure) => {
    setEditing(true);
    setCurrentId(instructure.instructure_id);
    setName(instructure.name);
    setEmail(instructure.email);
    setSubject(instructure.subject);
    setExperience(instructure.experience);
    setQualification(instructure.qualification);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchInstructures();
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setExperience('');
    setQualification('');
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Teacher Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the subject you teach"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">
              Experience (years)
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your years of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="qualification" className="block text-gray-700 font-bold mb-2">
              Qualification
            </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your highest qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {editing ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Instructors List</h2>
        <ul>
          {instructures.map((instructure) => (
            <li key={instructure.instructure_id} className="mb-4">
              <div>
                <strong>Name:</strong> {instructure.name}
              </div>
              <div>
                <strong>Email:</strong> {instructure.email}
              </div>
              <div>
                <strong>Subject:</strong> {instructure.subject}
              </div>
              <div>
                <strong>Experience:</strong> {instructure.experience} years
              </div>
              <div>
                <strong>Qualification:</strong> {instructure.qualification}
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(instructure)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(instructure.instructure_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructure;
