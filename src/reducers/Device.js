import {
    RECEIVE_DEVICES,
    REQUEST_DEVICE
} from '../actions/Device'

/**
 * application states. all data are modeled and kept here
 */

const initState = {
    devices: [],
    searchWord: '',
    latest: false,
    device: {}
};

const Devices = (state = initState, action) => {
    switch (action.type) {       
        case RECEIVE_DEVICES:{
            return Object.assign({}, state, { devices: action.devices, searchWord: action.searchWord, latest: action.latest});
        }
        case REQUEST_DEVICE:{
            return Object.assign({}, state, { device: action.device});
        }
        default:{
            return state;
        }
    }    
}

export default Devices;