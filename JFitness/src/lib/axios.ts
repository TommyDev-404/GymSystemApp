import axios from "axios";
import { baseUrl } from "./baseURL";

export const api = axios.create({
  baseURL: baseUrl,//"https://jfitness-gym.tech/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});