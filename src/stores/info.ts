import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserInfo } from "@/service/common/api";
import { message } from "ant-design-vue";
import { updateInfoCaptcha } from "@/service/email/captcha";

export interface UpdateUserInfo {
  headPic: string;
  nickName: string;
  username: string;
  email: string;
  captcha: string;
  industry: string;           // 行业
  douyinAccount: string;      // 抖音账号
  contactInfo: string;        // 联系方式
  targetRequirements: string[]; // 目标需求
}

export const useInfoStore = defineStore("info", () => {
  const isSend = ref(false);
  const isLoading = ref(false);
  const timeout = ref(30);

  const updateUserInfo = ref<UpdateUserInfo>({
  headPic: "",
  nickName: "",
  username: "",
  email: "",
  captcha: "",
  industry: "",
  douyinAccount: "",
  contactInfo: "",
  targetRequirements: [],
});

  async function getLoginInfo() {
  const res = await getUserInfo();
  const { data } = res.data;
  updateUserInfo.value.email = data.email;
  updateUserInfo.value.headPic = data.headPic;
  updateUserInfo.value.nickName = data.nickName;
  updateUserInfo.value.username = data.username || "";
  updateUserInfo.value.industry = data.industry || "";
  updateUserInfo.value.douyinAccount = data.douyinAccount || "";
  updateUserInfo.value.contactInfo = data.contactInfo || "";
  updateUserInfo.value.targetRequirements = data.targetRequirements || [];
}

  function timeCutdown() {
    const timer = setInterval(() => {
      timeout.value -= 1;
      if (timeout.value < 0) {
        clearInterval(timer);
        timeout.value = 30;
        return;
      }
    }, 1000);
  }

  async function sendCaptcha() {
    if (!updateUserInfo.value.email) {
      message.warn("请填写邮箱地址!");
      return;
    } else {
      isLoading.value = true;
      const res = await updateInfoCaptcha();

      const { data } = res.data;

      if (res.status === 200 || res.status === 201) {
        message.success(data);
        isLoading.value = false;
        isSend.value = true;
        setTimeout(() => {
          isSend.value = false;
        }, 1000 * 30);
        timeCutdown();
        return res;
      } else {
        message.error(data || "系统繁忙,请稍后再试");
        return res;
      }
    }
  }

  return {
    getLoginInfo,
    updateUserInfo,
    sendCaptcha,
    isSend,
    timeout,
    isLoading,
  };
});

// export default useInfoStore
