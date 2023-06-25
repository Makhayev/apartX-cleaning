import { api } from "@/api/AxiosInstance";

export const LandlordApi = {
  getCities() {
    return api.get("/home/getCities");
  },
  addApartment(
    cityId: number,
    address: string,
    area: number,
    roomNumber: number,
    description: string,
    imageUrls: string[],
    bathNumber: number
  ) {
    return api.post("/landlord/add_apartment", {
      cityId,
      address,
      area,
      roomNumber,
      description,
      imageUrls,
      bathNumber,
    });
  },
};
