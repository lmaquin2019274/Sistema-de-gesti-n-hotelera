import React, { useState } from "react";
import { reserveRoom } from "../../services/api";

const ReserveButton = ({ roomId, onReserve }) => {
    const [isReserved, setIsReserved] = useState(false);

    const handleReserveClick = async () => {
        const result = await reserveRoom(roomId);
        if (!result.error) {
            setIsReserved(true);
            onReserve();  
        } else {
            console.error("Error reservando la habitación:", result.e);
        }
    };

    return (
        <div style={{ position: 'relative', width: '10%', height: '50px' }}>
            <button 
                onClick={handleReserveClick} 
                disabled={isReserved}
                style={{
                    backgroundColor: isReserved ? 'red' : 'green',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: '0px' 
                }}
            >
                {isReserved ? 'Reservado' : 'Reservar'}
            </button>
        </div>
    );
};

export default ReserveButton;
