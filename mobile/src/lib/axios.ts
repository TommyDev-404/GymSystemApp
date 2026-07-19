import axios from "axios";

export const ipAddress = "172.17.79.22";
export const baseUrl = `http://${ipAddress}:5000`;

export const api = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});