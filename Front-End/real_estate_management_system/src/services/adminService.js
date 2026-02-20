import axios from 'axios';

const ADMIN_API_URL = "http://localhost:8080/api/admin/auth";

export const adminLogin = (adminData) => axios.post(`${ADMIN_API_URL}/login`, adminData);
