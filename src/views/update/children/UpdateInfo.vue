<template>
  <div class="update-container">
    <h1>会议室预定系统</h1>
    <Form
      :model="infoStore.updateUserInfo"
      @finish="updateBtn"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      :colon="false"
    >
      <FormItem label="头像" name="headPic">
        <img
          :src="getURL(infoStore.updateUserInfo.headPic)"
          alt="头像"
          width="100"
          height="100"
        />
        <UploadDragger
          name="file"
          action="http://localhost:3005/user/upload"
          @change="handleChange"
        >
          <InboxOutlined />
          点击 / 拖拽文件到此
        </UploadDragger>
      </FormItem>

      <FormItem
        label="昵称"
        name="nickName"
        :rules="{ message: '请输入你的昵称' }"
      >
        <Input
          placeholder="请输入昵称"
          :maxlength="20"
          v-model:value="infoStore.updateUserInfo.nickName"
        />
      </FormItem>

      <FormItem
        label="邮箱"
        name="email"
        :rules="{
          required: true,
          message: '请输入正确的邮箱格式',
          type: 'email',
        }"
      >
        <Input
          placeholder="请输入qq邮箱"
          :maxlength="20"
          v-model:value="infoStore.updateUserInfo.email"
        />
      </FormItem>

      <FormItem
        label="验证码"
        name="captcha"
        :rules="{ required: true, length: 6, message: '6位验证码' }"
      >
        <div class="captcha">
          <Input
            placeholder="请输入验证码"
            :maxlength="6"
            v-model:value="infoStore.updateUserInfo.captcha"
          />
        </div>
        <Button
          type="primary"
          @click="infoStore.sendCaptcha"
          class="btn"
          :disabled="infoStore.isSend"
          :loading="infoStore.isLoading"
        >
          <span v-show="infoStore.isSend">{{ infoStore.timeout }}s后再次 </span
          >发送
        </Button>
      </FormItem>

      <FormItem :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
        <Button class="register" type="primary" html-type="submit">
          确认修改
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  FormItem,
  Form,
  Input,
  message,
  UploadDragger,
  type UploadChangeParam,
} from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
// import { ref } from "vue";
// import { updateInfoCaptcha } from "@/service/email/captcha";
import { updateInfo } from "@/service/update/update";
import { getURL } from "@/utils/getUrl";
import { useInfoStore, type UpdateUserInfo } from "@/stores/info";

const infoStore = useInfoStore();
infoStore.getLoginInfo();

async function updateBtn(values: UpdateUserInfo) {
  const res = await updateInfo(values);
  const { data } = res.data;
  if (res.status === 200 || res.status === 201) {
    message.success("修改成功");
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}

function handleChange(info: UploadChangeParam) {
  const { status } = info.file;
  if (status === "done") {
    infoStore.updateUserInfo.headPic = info.file.response.data;
    message.success(info.file.name + "文件上传成功");
  } else if (status === "error") {
    message.error(info.file.name + "文件上传失败");
  }
}
</script>

<style scoped lang="less">
.update-container {
  width: 400px;
  text-align: center;

  .register {
    width: 90%;
  }

  .captcha {
    margin-right: 125px;
  }
  .btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
  }
}
</style>
