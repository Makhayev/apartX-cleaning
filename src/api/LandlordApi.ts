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
  getMyApartments() {
    return api.get("/landlord/apartments");
  },
  getServices() {
    return api.get("/home/services");
  },
  postOrder(
    apartmentId: number,
    description: string,
    serviceIds: number[],
    dateTime: string,
    cleaningType: string,
    desiredPrice: number
  ) {
    return api.post("/landlord/post_order", {
      apartmentId,
      description,
      serviceIds,
      dateTime,
      cleaningType,
      desiredPrice,
    });
  },
};
