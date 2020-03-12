import axios from 'axios';
import {
    Message
} from 'element-ui';
import router from './router'

import {
    showLoading,
    hideLoading
} from '../src/config/loading';

//请求拦截
axios.interceptors.request.use((req) => {
    showLoading();

    if (localStorage.eleToken) {
        //配置统一的请求头header
        req.headers.Authorization = localStorage.eleToken;
    }

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

    //获取错误状态码
    const {
        status
    } = error.response;
    if (status == 401) {
        Message.error('Token失效，请重新登录');
        //清楚token
        localStorage.removeItem('eleToken');
        //跳转到登录页面
        router.push('./login')
    }
    return Promise.reject(err);
});

export default axios