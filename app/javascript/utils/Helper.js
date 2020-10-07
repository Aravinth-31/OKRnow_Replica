import axios from 'axios';

export async function Get(url){
    const response=await axios.get(url);
    return response.data;
}
export async function Post(url, body) {
    const response = await axios.post(url, body);
    return response.data;
}
export async function Delete(url){
    const response=await axios.delete(url);
    return response.data;
}
export async function Patch(url,body){
    const response=await axios.patch(url,body);
    return response.data;
}

export function onChangeHandler(e, This) {
    This.setState({ [e.target.name]: e.target.value });
}
export function csrfToken(document) {
    return document.querySelector('[name="csrf-token"]').content;
}
export function passCsrfToken(document) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}
export function Interceptor() {
    axios.interceptors.request.use((config) => {
        console.log(`${config.method} ${config.url}`);
        config.headers.common['X-CSRF-TOKEN'] = document.querySelector('[name="csrf-token"]').content;
        config.headers.common['Content-Type']='application/json';
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}