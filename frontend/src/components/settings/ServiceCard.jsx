import { useEffect, useState } from "react";
import { useServiceDetails, useHotelDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const ServiceCard = ({ service, hotel, reservations, available }) => {
  const {
    serviceDetails,
    isFetching: fetchserv,
    getServicesDetails,
  } = useServiceDetails();
  const {
    hotelDetails,
    isFetching: fetchhote,
    getHotelsDetails,
  } = useHotelDetails();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getServicesDetails(service);
    getHotelsDetails(hotel);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este servicio?"))
      return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/hotels/v1/services/${service.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Servicio eliminado");
      } else {
        const data = await response.json();
        alert("Error al eliminar el servicio: " + data.msg);
      }
    } catch (error) {
      alert("Error al eliminar el servicio");
    } finally {
      setIsDeleting(false);
    }
  };

  if (fetchserv || fetchhote) {
    return <LoadingSpinner />;
  }

  return (
    <div className="channels-card">
      <span className="channels-card-title">{serviceDetails.data.name}</span>
      <span className="channels-card-text">{hotelDetails.data.name}</span>
      <span className="channels-card-text">
        {reservations.map((reservation) => (
          <div key={reservation._id}>
            <span>
              Start Date:{" "}
              {reservation.startDate
                ? new Date(reservation.startDate).toLocaleDateString()
                : "N/A"}
            </span>
            <span>
              End Date:{" "}
              {reservation.endDate
                ? new Date(reservation.endDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        ))}
      </span>
      <span
        className="channels-card-title"
        style={{ color: available ? "green" : "red" }}
      >
        {available ? "On course" : "Not on course"}
      </span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        style={{
          backgroundColor: "#AA4F4F",
          color: "white",
          borderRadius: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        // Estilos al pasar el mouse sobre el botón
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#EA8686";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#AA4F4F";
        }}
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  );
};
