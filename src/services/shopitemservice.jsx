import axios from 'axios';

const API_URL = 'http://localhost:5110/api/Shopitem';

export const getShopItemData = async () => {
    try {
    const response = await axios.get(API_URL);
    return response.data;
} catch (error) {
    console.error('Error fetching shop item data:', error);
    throw error;
    }
};

export const getShopItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching shop item with id ${id}:`, error);
        throw error;
    }
}


export const updateShopItem = async (id, customerData) => {
    try {
        const url = (`${API_URL}/${id}`);
        console.log(url);
        await axios.put(url, customerData);
    } catch (error) {
        console.error(`Error updating shop item with id ${id}:`, error);
        throw error;
    }
};

export const deleteShopItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 204) {
        return true;
    }
        throw new Error(`Error deleting shop item with id ${id}`);
    } catch (error) {
        console.error(`Error deleting shop item with id ${id}:`, error);
        throw error;
    }
};


export const addShopItem = async (id, name, description, price, stockQuantity) => {
    const url = 'http://localhost:5110/api/Shopitem';
    const data = {
        "id": id,
        "Name": name,
        "Description": description,
        "Price": price,
        "StockQuantity": stockQuantity
    };

    try {
        await axios.post(url, data);
      return true; 
    } catch (error) {
        console.log(error);
      return false; 
    }
};