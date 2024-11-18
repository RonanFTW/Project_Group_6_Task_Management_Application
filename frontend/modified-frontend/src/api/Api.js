import axios from 'axios';

const ApiConnection = axios.create({ baseURL: 'http://localhost:5000/api' });

// Get tasks
export const DisTasks = async () => {
    try {
        const response = await ApiConnection.get('/tasks'); 
        console.log('Tasks from backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in DisTasks:', error);
        return []; 
    }
};

// Create a new task
export const CreateTask = async (task) => {
    try {
        console.log('Sending data to backend:', task); 
        const response = await ApiConnection.post('/tasks', {
            title: task.title,
            description: task.description, 
            priority: task.priority,        
            due_date: task.due_date         
        });
        console.log('Task created:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error in CreateTask:', error);
        throw error;
    }
};

// Edit an existing task
export const EditTask = async (id, task) => {
    try {
        console.log(`Updating task ID ${id} with data:`, task); 
        const response = await ApiConnection.put(`/tasks/${id}`, {
            title: task.title,
            description: task.description, 
            priority: task.priority,        
            due_date: task.due_date         
        });
        console.log('Task updated:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error in EditTask:', error);
        throw error;
    }
};

// Delete a task
export const DelTask = async (id) => {
    try {
        console.log(`Deleting task ID ${id}`); 
        const response = await ApiConnection.delete(`/tasks/${id}`);
        console.log(`Task ID ${id} deleted successfully`); 
        return response.status === 204; 
    } catch (error) {
        console.error('Error in DelTask:', error);
        throw error;
    }
};

// Get analytics data
export const TaskAn = async () => {
    try {
        const response = await ApiConnection.get('/tasks/analytics');
        console.log('Analytics data:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error in TaskAn:', error);
        throw error;
    }
};

// Sign up a user
export const signUpUser = async (userData) => {
    try {
        console.log('Signing up user:', userData); 
        const response = await ApiConnection.post('/users/signup', userData);
        console.log('User signed up successfully:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error in signUpUser:', error);
        throw error;
    }
};

// Sign in a user
export const signInUser = async (userData) => {
    try {
        console.log('Signing in user:', userData); 
        const response = await ApiConnection.post('/users/login', userData);
        console.log('User signed in successfully:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error in signInUser:', error);
        throw error;
    }
};

export default ApiConnection;
