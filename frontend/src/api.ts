import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getStats = () => axios.get(`${API_BASE_URL}/stats`);
export const getConsumers = () => axios.get(`${API_BASE_URL}/consumers`);
export const getConsumerDetail = (id: string) => axios.get(`${API_BASE_URL}/consumers/${id}`);
export const getAlerts = () => axios.get(`${API_BASE_URL}/alerts`);
export const getLogs = () => axios.get(`${API_BASE_URL}/logs`);
export const getModelPerformance = () => axios.get(`${API_BASE_URL}/model-performance`);
