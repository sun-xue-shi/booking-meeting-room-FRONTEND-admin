import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserInfo } from "@/service/update/update";
import { message } from "ant-design-vue";
import { updateInfoCaptcha } from "@/service/email/captcha";

export interface UpdateUserInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

export const useInfoStore = defineStore("info", () => {
  const isSend = ref(false);
  const isLoading = ref(false);
  const timeout = ref(30);

  const updateUserInfo = ref<UpdateUserInfo>({
    headPic: "",
    nickName: "",
    email: "",
    captcha: "",
  });

  async function getLoginInfo() {
    const res = await getUserInfo();
    const { data } = res.data;
    updateUserInfo.value.email = data.email;
    updateUserInfo.value.headPic = data.headPic;
    updateUserInfo.value.nickName = data.nickName;
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
      return message.warn("请填写邮箱地址!");
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
      } else {
        message.error(data || "系统繁忙,请稍后再试");
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
