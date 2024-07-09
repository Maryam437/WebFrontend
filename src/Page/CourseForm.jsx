/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const CourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseRoom, setCourseRoom] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ courseName, courseTitle, courseRoom, courseId });
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Course Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-gray-700 font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseTitle" className="block text-gray-700 font-bold mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              name="courseTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseRoom" className="block text-gray-700 font-bold mb-2">
              Course Room
            </label>
            <input
              type="text"
              id="courseRoom"
              name="courseRoom"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter course room"
              value={courseRoom}
              onChange={(e) => setCourseRoom(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseId" className="block text-gray-700 font-bold mb-2">
              Course ID
            </label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter course ID"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
