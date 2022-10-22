import axios from "axios";
import { Platform } from "react-native";

/* const url = Platform.OS === 'ios' ? 'http://192.168.42.41:3000' : 'http://10.0.2.2:3000' */

const api = axios.create({
    baseURL: 'https://backend-tasks-react-native.herokuapp.com',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default api

