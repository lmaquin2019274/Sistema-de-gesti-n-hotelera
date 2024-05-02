/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useHotels, useUserDetails, useRooms } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {
  const { getHotels, allHotels, isFetching: isHotelsFetching } = useHotels();
  const { getRooms, allRooms, isFetching: isRoomsFetching } = useRooms();
  const { isLogged } = useUserDetails();

  useEffect(() => {
      getHotels(isLogged);
      getRooms(isLogged);
  }, []);

  if (isHotelsFetching || isRoomsFetching) {
      return <LoadingSpinner />;
  }

  return (
      <div className="dashboard-container">
          <Navbar />
          <Content hotels={allHotels || []} getHotels={getHotels} rooms={allRooms || []} getRooms={getRooms} />
      </div>
  );
};

