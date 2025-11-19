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
  industry: string;
  douyinAccount: string;
  phone: string;
  email: string;
  targetNeeds: string;
  captcha: string;
}

export function updateInfo(updateInfo: UpdateInfo) {
  return axiosInstance.post("/user/update", updateInfo);
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
