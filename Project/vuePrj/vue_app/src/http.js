//引入axios
import axios from "axios";

//引入Loading服务
import { Message, Loading } from 'element-ui';


import router from './router';

let loading;
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:"请稍等，加载中...",
        background:'rgba(0,0,0,7)'
    })
}
function endLoading(){
    loading.close();
}
//请求拦截

axios.interceptors.request.use(config=>{
    //加载动画
    startLoading();
    if(localStorage.eleToken){
        //设置统一的请求头
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},error=>{
    return Promise.reject(error);
})

axios.interceptors.response.use(res=>{
    //取消动画
    endLoading();
    return res;
},error=>{
    endLoading();
    Message.error(error.res.data);

    //获取错误状态码
    const {status} = error.res;
    if(status == 401){
        Message.error("登录失效，请重新登录");
        //清楚token
        localStorage.removeItem("eleToken");
        //跳转回登录页面
        router.push('/login');
    }

    return Promise.reject(error);
})


//响应拦截

export default axios; 