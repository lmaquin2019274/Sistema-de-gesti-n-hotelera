import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/hotels/v1',
    timeout: 1000
})

export const login = async (data) => {
    try{
        return await apiClient.post('/auth/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try{
        return await apiClient.post('/auth/register', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}

export const getHotelsDetails = async (hotelId) => {
    try{
        return await apiClient.get(`/hotel/${hotelId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getHotels = async () => {
    try{
        return await apiClient.get('/hotel')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}