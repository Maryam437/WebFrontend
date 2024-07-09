import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/student";

export const studentList = () => axios.get(REST_API_BASE_URL+'/all');

export const createStudent = (student) => axios.post(REST_API_BASE_URL+'/create', student);

export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL+'/update/'+studentId, student);

export const deleteStudent =  (studentId) =>  axios.delete(REST_API_BASE_URL+'/delete/'+studentId);