import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/course";

export const courseList = () => axios.get(REST_API_BASE_URL+'/all');

export const createCourse = (course) => axios.post(REST_API_BASE_URL+'/addcourse', course);

export const getCourse = (courseId) =>  axios.get(REST_API_BASE_URL+'/coursebyid/'+courseId);

export const updateCourse = (courseId, course) => axios.put(REST_API_BASE_URL+'/update/'+courseId, course);

export const deleteCourse =  (courseId) =>  axios.delete(REST_API_BASE_URL+'/delete/'+courseId);