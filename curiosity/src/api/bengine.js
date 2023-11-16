import { auth0 } from '../auth';

export const getSensorAir = async (deviceId, startTime) => {
    const token = await auth0.getAccessTokenSilently();
    try {
        const response = await fetch(`http://localhost:3000/api/airs?deviceId=${deviceId}&startTime=${startTime}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log(response);

        if (!response.ok) {
            console.log('Failed to fetch sensor air data');
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching sensor air data:', error);
        return [];
    }
};

export const getDevices = async () => {
    const token = await auth0.getAccessTokenSilently()
    try {
        const response = await fetch('http://localhost:3000/api/devices', {
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
        return data;
    } catch (error) {
        console.error('An error occurred while fetching devices data:', error);
        return [];
    }
};
