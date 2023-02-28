import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const MqttHandlers = {
    fowardToApi: (topic: string, message: Buffer, apiUrl: string) => {
        const [, type, subType] = topic.split('/');
        const url = `${apiUrl}/${type}/${subType}`;
        const data = JSON.parse(message.toString());

        axios.post(url, {data,})
            .then((res: AxiosResponse) => {
                console.log(res.data);
            }).catch((error) => {
                console.error(`API error: ${error.response}`);
            });
    }
}