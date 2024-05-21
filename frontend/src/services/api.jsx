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

export const reserveRoom = async (roomId) => {
    try {
        return await apiClient.put(`/room/reserve/${roomId}`);
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
};

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
export const putUserSettings = async () => {
    try{
        return await apiClient.get('/hotel')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async () => {
    try{
        return await apiClient.get('/hotel')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async () => {
    try{
        return await apiClient.get('/hotel')
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
export const getRooms = async () => {
    try{
        return await apiClient.get('/room')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getRoomsDetails = async (roomId) => {
    try{
        return await apiClient.get(`/room/${roomId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getHotelRooms = async (hotelId) => {
    try{
        return await apiClient.get(`/room/search/${hotelId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getHotelEvents = async (hotelId) => {
    try{
        return await apiClient.get(`/event/search/${hotelId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getEvents = async () => {
    try{
        return await apiClient.get('/event')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getEventDetails = async (eventId) => {
    try{
        return await apiClient.get(`/event/${eventId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}