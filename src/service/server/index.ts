import { axiosInstance } from "@/service";

// 提交服务需求
interface ServiceRequestData {
  packageOption: number;
  serviceOption: number;
  description: string;
  contactName: string;
  contactInfo: string;
}

export const submitServiceRequest = (data: ServiceRequestData) => {
  return axiosInstance.post("/server/need", data);
};

// 获取用户服务进度
export const getServiceProgress = () => {
  return axiosInstance.get("/server/progress");
};

// 服务评价数据接口
interface ServiceReviewData {
  rating: number; // 评价星级
  content: string; // 评价内容
}

// 提交服务评价
export const submitServiceReview = (data: ServiceReviewData) => {
  return axiosInstance.post("/server/review", data);
};
