import { axiosInstance } from "@/service";
import type { Meeting } from "@/views/admin/children/createModal/CreateMeeting.vue";

export async function createRoom(meetingRoom: Meeting) {
  return await axiosInstance.post("/meeting-room/create", meetingRoom);
}
