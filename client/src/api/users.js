import axiosInstance  from "./index";
const host = "http://localhost:5000"

export const loginUser = async (payload)=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/auth/login`,payload)
        return data 
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

export const registerUser = async (payload)=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/auth/register`,payload)
        return data 
    } catch (error) {
        return error.response.data
    }
}

export const getUserInfo = async()=>{
    try {
        const {data} = await axiosInstance.get(`${host}/api/auth/user`)
        return data;
    } catch (error) {
        return error.response.data
    }
}

export const getUsers = async()=>{
    try {
        const {data} = await axiosInstance.get(`${host}/api/auth/admin/users`)
        return data
    } catch (error) {
        return error.response.data
    }
}

export const VerifyUser = async(request)=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/auth/admin/verify-user`,request)
        return data
    } catch (error) {
        return error.response.data
    }
}

export const changePassword = async(request)=>{
     try {
        const {data} = await axiosInstance.post(`${host}/api/auth/password`,request)
        return data
    } catch (error) {
        return error.response.data
    }
}

export const getEmailReset = async(request)=>{
     try {
        const {data} = await axiosInstance.post(`${host}/api/auth/email-forgot-password`,request)
        return data
    } catch (error) {
        return error.response.data
    }
}