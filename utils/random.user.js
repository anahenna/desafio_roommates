import axios from "axios";

export const getRandomUser = async () => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        return response.data.results[0];
    } catch (error) {
        console.error('Error al obtener el usuario aleatorio:', error);
        throw error; 
    }
}


