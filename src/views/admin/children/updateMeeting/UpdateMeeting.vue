<template>
  <div class="modal">
    <Modal
      title="修改会议室信息"
      :open="props.isUpdateOpen"
      @ok="handleOk(updateMeeting)"
      @cancel="props.handelClose()"
      ok-text="更新"
      cancel-text="取消"
      style="top: 25%"
    >
      <Form
        :model="updateMeeting"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 15 }"
        layout="r"
      >
        <FormItem
          label="会议室名称"
          name="name"
          :rules="{
            required: true,
            message: '请输入会议室名称',
          }"
        >
          <Input
            :maxlength="20"
            v-model:value="updateMeeting.name"
            placeholder="会议室名称,如：‘二号报告厅’"
          />
        </FormItem>

        <FormItem
          label="位置"
          name="location"
          :rules="{
            required: true,
            message: '请输入会议室位置',
          }"
        >
          <Input
            :maxlength="20"
            v-model:value="updateMeeting.location"
            placeholder="会议室位置，如:‘教二’"
          />
        </FormItem>

        <FormItem
          label="容量"
          name="capacity"
          :rules="{
            required: true,
            message: '请输入会议室容量',
          }"
        >
          <Input
            v-model:value="updateMeeting.capacity"
            placeholder="会议室容量"
          />
        </FormItem>

        <FormItem
          label="设备"
          name="equipment"
          :rules="{
            required: true,
            message: '请输入会议室设备',
          }"
        >
          <Input
            :maxlength="50"
            v-model:value="updateMeeting.equipment"
            placeholder="会议室设备，如：‘白板’"
          />
        </FormItem>

        <FormItem label="描述" name="description">
          <Textarea
            :maxlength="200"
            v-model:value="updateMeeting.description"
            placeholder="请输入会议室详细描述"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {
  Modal,
  Form,
  FormItem,
  Input,
  Textarea,
  message,
} from "ant-design-vue";
import { ref } from "vue";
import { findRoom, updateRoom } from "@/service/room_manage/update";

interface UpdateModalProps {
  isUpdateOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handelClose: Function;
  id: number;
}

const props = defineProps<UpdateModalProps>();

export interface UpdateMeeting {
  name: string;
  capacity: number | undefined;
  equipment: string;
  description: string;
  location: string;
  id: number;
}

const updateMeeting = ref<UpdateMeeting>({
  name: "",
  capacity: undefined,
  equipment: "",
  description: "",
  location: "",
  id: props.id,
});

// 更新用户信息时的信息回显
async function roomInfo(id: number) {
  const res = await findRoom(id);

  const { data } = res.data;
  if (res.status === 200 || res.status === 201) {
    updateMeeting.value = data;
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }
}
roomInfo(props.id);

// 确定后修改会议室信息
async function handleOk(values: UpdateMeeting) {
  const res = await updateRoom(values);

  const { data } = res.data;
  if (res.status === 200 || res.status === 201) {
    message.success("更新成功");
    props.handelClose();
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }
}
</script>

<style scoped lang="less"></style>
