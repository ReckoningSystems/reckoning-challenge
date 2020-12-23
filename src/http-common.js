
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080',  //will be the origin of the server 
    headers: {
        "Content-type": "application/json"
    } 
});