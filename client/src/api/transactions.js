import axiosInstance  from "./index";
export const host = "http://localhost:5000"

export const verifyAcc = async (payload)=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/transactions/verify-user`,payload)
        return data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data

    }
}

export const transferFunds = async(payload)=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/transactions/transfer-funds`,payload)
        return data
    } catch (error) {
         console.log(error.response.data)
        return error.response.data
    }
}

export const transactionsList = async()=>{
    try {
        const {data} = await axiosInstance.post(`${host}/api/transactions/transactions-list`)
        return data
    } catch (error) {
        console.log(error.response.msg)
        return error.response.data.msg
    }
}

export const getstripeApiKey = async()=>{
    try {
         const {data} = await axiosInstance.get(`${host}/api/payments/send-stripe`)
         return data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
   
		
}