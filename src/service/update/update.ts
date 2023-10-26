import { axiosInstance } from "@/service";

interface UpdatePassword {
  username: string;
  password: string;
  email: string;
  captcha: string;
}

interface UpdateInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

export function updatePassword(updatePassword: UpdatePassword) {
  return axiosInstance.post("/user/admin/update_password", updatePassword);
}

export function updateInfo(updateInfo: UpdateInfo) {
  return axiosInstance.post("/user/admin/update", updateInfo);
}

export function getUserInfo() {
  return axiosInstance.get("/user/info");
}
