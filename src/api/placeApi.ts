import axios from "axios";

const BASE_URL =
  "https://smart-route-planner-backend-kttq.onrender.com/api/places";

export const getPlaces = async (
  routeCoordinates: any[],
  category: string
) => {

  const response =
    await axios.post(
      `${BASE_URL}/along-route`,
      {
        routeCoordinates,
        category
      }
    );

  return response.data;
};