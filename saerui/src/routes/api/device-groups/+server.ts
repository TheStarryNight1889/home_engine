import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const response = await fetch('http://localhost:4000/api/device-groups');
    const device_groups = await response.json();
	return new Response(JSON.stringify(device_groups), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


