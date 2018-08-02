import axios from 'axios'

axios.defaults.baseURL = 'https://fonoapi.freshpixl.com/v1';
const API_TOKEN = 'a50f78619a20475b7adef4403aea1ab3da81feb07899f5ec';

const fono = {    
    getDevice: function(device, brand, position, limit){
        return axios.post('/getdevice', {
            token: API_TOKEN, 
            device: device,
            brand: brand, 
            position: position, 
            limit: limit
        });
    },
    getLatest: function(brand, limit){
        return axios.post('/getlatest', {
            token: API_TOKEN, 
            brand: brand, 
            limit: limit
        });
    }
};

export default fono;