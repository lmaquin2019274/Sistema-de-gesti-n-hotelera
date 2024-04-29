/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useHotels, useUserDetails } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {
  const { getHotels, allHotels, isFetching } = useHotels();
  const { isLogged } = useUserDetails();

  useEffect(() => {
    getHotels(isLogged);
  }, []);

  if (isFetching) {
    <LoadingSpinner />;
  }
  return (
    <div className="dashboard-container">
      <Navbar />
      <Content hotels={ allHotels || []} getHotels={getHotels} />
    </div>
  );
};
