import axios from "axios";

const ApiConnection = axios.create({baseURL: 'http://localhost:5000/api'});

//CRUD API handling, will be imported into each other file
export const DisTasks = async () => await ApiConnection.get('/tasks');
export const CreateTask = async (create) => await ApiConnection.post('/tasks', create);
export const EditTask = async (id, edit) => await ApiConnection.put(`/tasks/${id}`, edit);
export const DelTask = async (id) => await ApiConnection.delete(`/tasks/${id}`);
export const TaskAn = async () => await ApiConnection.get('/tasks/analytics'); 
export default ApiConnection;
