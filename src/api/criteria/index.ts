import { AxiosError } from "axios"
import axios from "axios";

export async function getAllCriteria() {
    try {
        const response = await axios.get('https://0ab6-14-241-225-123.ngrok-free.app/criteria');
        return response.data;
    } catch(error) {
        if (error instanceof AxiosError) {
            console.error('Axios error: ', error)
            throw new Error(error.response?.data)
        } else console.error(error)
        throw new Error('Failed to fetch all criteria')
    }
}

export async function createCriteria(data: { name: string, description: string }) {
    try {
        const response = await axios.post('https://0ab6-14-241-225-123.ngrok-free.app/criteria', data);
        return response.data;
    } catch(error) {
        if (error instanceof AxiosError) {
            console.error('Axios error: ', error)
            throw new Error(error.response?.data)
        } else console.error(error)
        throw new Error('Failed to create criteria')
    }
}