import { axiosInstance } from "@/service";

export const submitFeedback = (data: any) => {
  return axiosInstance.post("/user/feedback", data);
};
