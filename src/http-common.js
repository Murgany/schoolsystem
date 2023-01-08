import axios from "axios";

const http = axios.create({
    baseURL: "https://simpleschoolsystem.pythonanywhere.com"
    // baseURL: "http://127.0.0.1:8000/api/"
})

export default http;
