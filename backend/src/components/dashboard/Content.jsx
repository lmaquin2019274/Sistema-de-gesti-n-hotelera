/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Settings } from "../settings/Settings";
import { Hotels } from "../hotel/Hotels";
import { HotelView } from '../hotel/HotelView'
import { Rooms } from "../room/Rooms"
import { RoomView } from "../room/RoomView"
import { HotelRooms } from "../room/HotelRooms";
import { Events } from "../events/Events";
import { EventView } from "../events/EventView";
import { HotelEvents } from "../events/HotelEvents";
import { Home } from "../Home";
import { HotelSettings } from '../settings/HotelSettings'
import { EventSettings } from '../settings/EventSettings'
import { RoomSettings } from '../settings/RoomSettings'

export const Content = ({hotels, getHotels, rooms, getRooms, hotelRooms, events, getEvents, hotelEvents}) => {
    return(
        <div className="content-container">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="hotelSettings" element={<HotelSettings/>}/>
                <Route path="eventSettings" element={<EventSettings/>}/>
                <Route path="roomSettings" element={<RoomSettings/>}/>
                <Route path="hotel" element={<Hotels hotels={hotels}/>}/>
                <Route path="hotel/:id" element={<HotelView getHotels={getHotels}/>}/>
                <Route path="room" element={<Rooms rooms={rooms}/>}/>
                <Route path="room/:id" element={<RoomView getRooms={getRooms}/>}/>
                <Route path="room/search/:id" element={<HotelRooms hotelRooms={hotelRooms}/>}/>
                <Route path="event" element={<Events events={events}/>}/>
                <Route path="event/:id" element={<EventView getEvents={getEvents}/>}/>
                <Route path="event/search/:id" element={<HotelEvents hotelEvents={hotelEvents}/>}/>
            </Routes>
        </div>
    )
}   