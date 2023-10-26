import { axiosInstance } from "@/service";
import type { UpdateMeeting } from "@/views/admin/children/updateMeeting/UpdateMeeting.vue";

export async function updateRoom(meetingRoom: UpdateMeeting) {
  return await axiosInstance.put("/meeting-room/update", meetingRoom);
}

export async function findRoom(id: number) {
  console.log(id);

  return await axiosInstance.get("/meeting-room/" + id);
}
