import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (request) => {
    const { id } = request.params;
    const response = await fetch(`http://localhost:4000/api/devices/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device: request.body }),
    });
    const device = await response.json();
    return new Response(JSON.stringify(device), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


