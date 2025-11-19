import { axiosInstance } from "@/service";

export async function getIpSuggest(score: number) {
  return await axiosInstance.get("/ip/suggest", {
    params: {
      score,
    },
  });
}

export async function getIpScore(score: number) {
  return await axiosInstance.get("/user/suggest", {
    params: {
      score,
    },
  });
}

export async function getIpDiagnosis() {
  return await axiosInstance.get("/user/diagnosis");
}
