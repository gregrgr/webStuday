//引入axios
import axios from "axios";

//引入Loading服务
import { Message, Loading } from 'element-ui';


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
    return config;
},error=>{
    return Promise.reject(error);
})

axios.interceptors.response.use(response=>{
    //取消动画
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);
})


//响应拦截

export default axios;