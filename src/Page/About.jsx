import axios from 'axios';
import React, { useEffect, useState } from 'react';

function About() {
  const [students, setStudents] = useState([]);
  const [postData, setPostStudentData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    address: '',
    country: ''
  });

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch all students
  const fetchStudents = () => {
    axios.get('http://localhost:8081/api/student/all')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error when listing students:', error);
      });
  }

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostStudentData({ ...postData, [name]: value });
  }

  // Function to handle adding a new student
  const handleAdd = () => {
    axios.post('http://localhost:8081/api/student/create', postData)
      .then(response => {
        fetchStudents(); // Refresh student list after adding
        setPostStudentData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          age: '',
          address: '',
          country: ''
        });
      })
      .catch(error => {
        console.error('Error when posting student:', error);
      });
  }

  // Function to handle deleting a student
  const handleDelete = (studentId) => {
    axios.delete(`http://localhost:8081/api/student/delete/${studentId}`)
      .then(response => {
        fetchStudents(); // Refresh student list after deleting
      })
      .catch(error => {
        console.error('Error when deleting student:', error);
      });
  }

  // Function to handle updating a student
  const handleUpdate = (studentId, updatedData) => {
    axios.put(`http://localhost:8081/api/student/update/${studentId}`, updatedData)
      .then(response => {
        fetchStudents(); // Refresh student list after updating
      })
      .catch(error => {
        console.error('Error when updating student:', error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">About Student</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed in your account so be careful what you share.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div className="mt-2">
                <input
                  value={postData.firstname}
                  onChange={handleInputChange}
                  type="text" name="firstname" id="firstname" autoComplete="firstname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Maryam" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div className="mt-2">
                <input
                  value={postData.lastname}
                  onChange={handleInputChange}
                  type="text" name="lastname" id="lastname" autoComplete="lastname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ali" />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  value={postData.email}
                  onChange={handleInputChange}
                  type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="maryam@example.com" />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input
                  value={postData.password}
                  onChange={handleInputChange}
                  type="password" name="password" id="password" autoComplete="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="password" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
              <div className="mt-2">
                <input
                  value={postData.age}
                  onChange={handleInputChange}
                  type="text" name="age" id="age" autoComplete="age" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="25" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div className="mt-2">
                <input
                  value={postData.address}
                  onChange={handleInputChange}
                  type="text" name="address" id="address" autoComplete="address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="123 Street, City" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
              <div className="mt-2">
                <select
                  value={postData.country}
                  onChange={handleInputChange}
                  id="country" name="country" autoComplete="country" className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value="Tanzania">Tanzania</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button
            onClick={handleAdd}
            type="button" // Change to "submit" if using form submission
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </form>
    </div>
  );
}

export default About;
