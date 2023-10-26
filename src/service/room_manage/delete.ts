import { axiosInstance } from "@/service";

export async function deleteRoom(id: number) {
  return await axiosInstance.delete("/meeting-room/" + id);
}
