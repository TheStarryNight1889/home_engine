import { auth0 } from '../auth';

export const getSensorAir = async (deviceId, startTime) => {
    const token = await auth0.getAccessTokenSilently();
    try {
        const response = await fetch(`http://localhost:3000/sensor/air?deviceId=${deviceId}&startTime=${startTime}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            console.log('Failed to fetch sensor air data');
            return [];
        }

        const data = await response.json();
        console.log('Fetched sensor air data');
        console.log(data);
        return data;
    } catch (error) {
        console.error('An error occurred while fetching sensor air data:', error);
        return [];
    }
};

export const getDevices = async () => {
    const token = await auth0.getAccessTokenSilently()
    try {
        const response = await fetch('http://localhost:3000/device', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log('Failed to fetch devices data');
            return [];
        }

        const data = await response.json();
        console.log('Fetched devices data');
        console.log(data);
        return data;
    } catch (error) {
        console.error('An error occurred while fetching devices data:', error);
        return [];
    }
};

export const getDeviceConnections = async () => {
    const token = await auth0.getAccessTokenSilently()
    try {
        const response = await fetch('http://localhost:3000/device/connection', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.log('Failed to fetch device connections data');
            return [];
        }

        const data = await response.json();
        console.log('Fetched device connections data');
        console.log(data);
        return data;
    } catch (error) {
        console.error('An error occurred while fetching device connections data:', error);
        return [];
    }
};