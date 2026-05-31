import axios from "axios";

const BASE_URL =
  "https://smart-route-planner-backend-kttq.onrender.com/api/routes";

export const findRoute = async (
  startLocation: string,
  destinationLocation: string
) => {

  const response = await axios.post(
    `${BASE_URL}/find`,
    {
      startLocation,
      destinationLocation
    }
  );

  return response.data;
};
export const addStop =
async (
    request:any
) => {

    const response =
      await axios.post(
        `${BASE_URL}/addStop`,
        request
      );

    return response.data;
};