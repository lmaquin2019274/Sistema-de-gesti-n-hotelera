import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/hotels/v1',
    timeout: 1000
})

//User
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
export const updateUser = async (data, token) => {
    try{
        const response = await apiClient.put('/settings/update', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (data) => {
    try{
        return await apiClient.put('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (data) => {
    try{
        return await apiClient.post('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (data) => {
    try{
        return await apiClient.patch('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}


//Hotels
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
export const createHotel = async (data) => {
    try{
        return await apiClient.post('/hotel', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const editHotel = async (data, token) => {
    try{
        return await apiClient.put('/hotel/edit', data, {
            headers: {
                'x-token': `${token}`
            }
        });
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getBadHotels = async () => {
    try{
        return await apiClient.get('/hotel/bad')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const deleteHotel = async (data, token) => {
    console.log(data)
    try{
        return await apiClient.put('/hotel/delete', data, {
            headers: {
                'x-token': `${token}`
            }
        });
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const restoreHotel = async (data, token) => {
    try{
        const response = await apiClient.put('/hotel/restore', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}


//Rooms
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
export const getBadRooms = async (id) => {
    try{
        return await apiClient.get(`/room/bad/${id}`)
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
export const crateRoom = async (data, token) => {
    try{
        return await apiClient.post('/room', data, {
            headers: {
                'x-token': `${token}`
            }
        });
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const deleteRoom = async (data, token) => {
    console.log(data)
    try{
        return await apiClient.put('/room/delete', data, {
            headers: {
                'x-token': `${token}`
            }
        });
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const restoreRoom = async (data, token) => {
    try{
        const response = await apiClient.put('/room/restore', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}


//Events
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
export const getBadEvents = async (id) => {
    try{
        return await apiClient.get(`/event/bad/${id}`)
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
export const crateEvent = async (data, token) => {
    console.log(data)
    try{
        return await apiClient.post('/event', data, {
            headers: {
                'x-token': `${token}`
            }
        });
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
export const deleteEvent = async (data, token) => {
    console.log(data)
    try{
        return await apiClient.put('/event/delete', data, {
            headers: {
                'x-token': `${token}`
            }
        });
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const restoreEvent = async (data, token) => {
    try{
        const response = await apiClient.put('/event/restore', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}