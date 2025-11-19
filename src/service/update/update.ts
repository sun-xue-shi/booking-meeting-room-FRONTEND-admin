import { axiosInstance } from "@/service";

interface UpdatePassword {
  username: string;
  password: string;
  email: string;
  captcha: string;
}

interface UpdateUserInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
  industry: string;
  douyinAccount: string;
  contactInfo: string;
  targetRequirements: string[];
}

export function updatePassword(updatePassword: UpdatePassword) {
  return axiosInstance.post("/user/admin/update_password", updatePassword);
}

export function updateUserInfo(updateUserInfo: UpdateUserInfo) {
  return axiosInstance.post("/user/admin/update", updateUserInfo);
}

export function getUserInfo() {
  return axiosInstance.get("/user/info");
}
