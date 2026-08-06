import axios from "axios";
import { baseUrl } from "./baseURL";

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});