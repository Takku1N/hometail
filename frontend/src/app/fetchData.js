import axios from 'axios';

const fetchData = async (path) => {
    const base_api = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get(`${base_api}${path}`, { withCredentials: true });
    console.log(`${base_api}${path}`);

    return response.data;
}

// Use the modern export syntax
export default fetchData;