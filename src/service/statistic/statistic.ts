import { axiosInstance } from "@/service";

export async function meetingRoomUsedCount(startTime: string, endTime: string) {
  return await axiosInstance.get("/statistic/roomUsedCount", {
    params: {
      startTime,
      endTime,
    },
  });
}

export async function userBookingCount(startTime: string, endTime: string) {
  return await axiosInstance.get("/statistic/bookingCount", {
    params: {
      startTime: startTime,
      endTime: endTime,
    },
  });
}
