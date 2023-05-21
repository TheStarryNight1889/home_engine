import axios from 'axios';

export const getSensorAir = async () => {
    try{
        const response = await axios.get('http://localhost:3000/sensor/air');
        console.log('fetched sensor air data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('failed to fetch sensor air data');
        return []
    }
}