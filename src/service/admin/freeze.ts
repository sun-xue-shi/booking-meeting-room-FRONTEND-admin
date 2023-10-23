import { axiosInstance } from "@/service";

export async function freezeUser(id: number) {
  return await axiosInstance.get("/user/freeze", {
    params: {
      id,
    },
  });
}
