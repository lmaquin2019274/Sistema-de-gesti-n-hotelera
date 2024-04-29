/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Hotels } from "../hotel/Hotels";
import { HotelView } from '../hotel/HotelView'

export const Content = ({hotels, getHotels}) => {
    return(
        <div className="content-container">
            <Routes>
                <Route path="hotel" element={<Hotels hotels={hotels}/>}/>
                <Route path="hotel/:id" element={<HotelView getHotels={getHotels}/>}/>
            </Routes>
        </div>
    )
}   