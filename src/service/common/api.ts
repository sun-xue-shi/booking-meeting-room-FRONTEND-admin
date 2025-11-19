import { axiosInstance } from "@/service";

export function passLogin(username: string, password: string) {
  return axiosInstance.post("/user/passlogin", {
    username,
    password,
  });
}

export function emailLogin(username: string, email: string, captcha: string) {
  return axiosInstance.post("/user/emaillogin", {
    username,
    email,
    captcha,
  });
}

interface RegisterUser {
  username: string;
  password: string;
  email: string;
  captcha: string;
}

export function register(registerUser: RegisterUser) {
  return axiosInstance.post("/user/register", registerUser);
}

interface UpdateInfo {
  username: string;
  industry: string;
  douyinAccount: string;
  contactInfo: string;
  email: string;
  targetRequirements: string[];
  captcha: string;
}

export function updateUserInfo(updateUserInfo: UpdateInfo) {
  return axiosInstance.post("/user/update", updateUserInfo);
}

export function getUserInfo() {
  return axiosInstance.get("/user/info");
}

interface UpdatePassword {
  username: string;
  password: string;
  email: string;
  captcha: string;
}

export function updatePassword(updatePassword: UpdatePassword) {
  return axiosInstance.post("/user/update_password", updatePassword);
}
