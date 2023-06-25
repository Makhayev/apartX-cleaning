import { api } from "@/api/AxiosInstance";

export const CleanerApi = {
  getOrders() {
    return api.get("/cleaner");
  },
  getLandLord(landLordId: number) {
    return api.get(`/cleaner/getLandlord/${landLordId}`);
  },
  respondToOrder(orderId: number, price: number) {
    const body = {
      orderId: orderId,
      price: price,
    };
    return api.post("/cleaner/respond", body);
  },
};
