import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseRoom, setCourseRoom] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/course/all');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchCourseById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/course/coursebyid/${id}`);
      setSelectedCourse(response.data);
      setCourseName(response.data.course_name);
      setCourseTitle(response.data.course_title);
      setCourseRoom(response.data.course_room);
      setCourseId(response.data.course_id);
    } catch (error) {
      console.error('Error fetching course by ID:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = {
        course_name: courseName,
        course_title: courseTitle,
        course_room: courseRoom,
      };
      if (courseId) {
        await axios.put(`http://localhost:8081/api/course/update/${courseId}`, course);
      } else {
        const response = await axios.post('http://localhost:8081/api/course/addcourse', course);
        // Assuming response.data contains the added course details
        setCourses([...courses, response.data]); // Add new course to the list
        setCourseName('');
        setCourseTitle('');
        setCourseRoom('');
      }
      fetchAllCourses(); // Refresh the courses list after update or add
    } catch (error) {
      console.error('Error submitting course:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/course/delete/${id}`);
      fetchAllCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
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
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {courseId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-md mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course.course_id} className="mb-2">
              {course.course_name} - {course.course_title}
              <button
                className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => fetchCourseById(course.course_id)}
              >
                Edit
              </button>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(course.course_id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseForm;
