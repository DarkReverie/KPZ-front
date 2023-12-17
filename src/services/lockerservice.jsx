import axios from 'axios';

const API_URL = 'http://localhost:5110/api/Locker';
export const getLockerData = async () => {
    try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
    
} catch (error) {
    console.error('Error fetching locker data:', error);
    throw error;
    }
};

export const getLockerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching locker with id ${id}:`, error);
        throw error;
    }
}


export const updateLocker = async (id, customerData) => {
    try {
        const url = `${API_URL}/id=${id}`;
        await axios.put(url, customerData);
    } catch (error) {
        console.error(`Error updating locker with id ${id}:`, error);
        throw error;
    }
};

export const deleteLocker = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 204) {
        return true;
    }
        throw new Error(`Error deleting locker with id ${id}`);
    } catch (error) {
        console.error(`Error deleting locker with id ${id}:`, error);
        throw error;
    }
};


export const addLocker = async (id, lockerNumber, isAvailable) => {
    const url = 'http://localhost:5110/api/Locker';
    const data = {
        "id": id,
        "LockerNumber": lockerNumber,
        "isAvailable": isAvailable
    };

    try {
        await axios.post(url, data);
      return true; 
    } catch (error) {
        console.log(error);
      return false; 
    }
};