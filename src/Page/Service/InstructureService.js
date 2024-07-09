import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/instructure";

export const instructureList = () => axios.get(REST_API_BASE_URL+'/all');

export const createInstructure = (instructure) => axios.post(REST_API_BASE_URL+'/create', instructure);

export const updateInstructure = (instructureId, instructure) => axios.put(REST_API_BASE_URL+'/update/'+instructureId, instructure);

export const deleteInstructure =  (instructureId) =>  axios.delete(REST_API_BASE_URL+'/delete/'+instructureId);