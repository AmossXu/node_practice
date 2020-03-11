import axios from 'axios';
import {
    Message
} from 'element-ui';

import {
    showLoading,
    hideLoading
} from '../src/config/loading';


axios.interceptors.request.use((req) => {
    showLoading();
    return req;
}, err => Promise.reject(err));

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {
    hideLoading();
    return res;
    return Promise.reject(res);
}, (err) => {
    hideLoading();
    Message.error(error.response.data);
    return Promise.reject(err);
});

export default axios