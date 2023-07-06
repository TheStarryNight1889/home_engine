import axios from 'axios';

export const getSensorAir = async (deviceId) => {
    try{
        const response = await axios.get(`http://localhost:3000/sensor/air?deviceId=${deviceId}`);
        console.log('fetched sensor air data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('failed to fetch sensor air data');
        return []
    }
}

export const getDevices = async () => {
    try{
        const response = await axios.get('http://localhost:3000/device');
        console.log('fetched devices data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('failed to fetch devices data');
        return []
    }
}