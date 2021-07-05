import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: __DEV__ ? config.api.devUrl : config.api.url,
});

export default api;