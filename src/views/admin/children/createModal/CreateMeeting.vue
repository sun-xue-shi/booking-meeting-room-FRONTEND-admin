<template>
  <div class="modal">
    <Modal
      title="添加会议室"
      :open="props.isCreateOpen"
      @ok="handleOk(createMeeting)"
      @cancel="props.handelClose()"
      ok-text="创建"
      cancel-text="取消"
      style="top: 25%"
    >
      <Form
        :model="createMeeting"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 15 }"
        layout="r"
        autocomplete="off"
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
            v-model:value="createMeeting.name"
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
            v-model:value="createMeeting.location"
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
            v-model:value="createMeeting.capacity"
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
            v-model:value="createMeeting.equipment"
            placeholder="会议室设备，如：‘白板’"
          />
        </FormItem>

        <FormItem label="描述" name="description">
          <Textarea
            :maxlength="200"
            v-model:value="createMeeting.description"
            placeholder="请输入会议室详细描述"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { createRoom } from "@/service/room_manage/create";
import {
  Modal,
  Form,
  FormItem,
  Input,
  Textarea,
  message,
} from "ant-design-vue";
import { ref } from "vue";

export interface Meeting {
  name: string;
  capacity: number | undefined;
  equipment: string;
  description: string;
  location: string;
}

const createMeeting = ref<Meeting>({
  name: "",
  capacity: undefined,
  equipment: "",
  description: "",
  location: "",
});

interface CreateModalProps {
  isCreateOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handelClose: Function;
}

const props = defineProps<CreateModalProps>();

// 确定后创建会议室
async function handleOk(values: Meeting) {
  const res = await createRoom(values);

  const { data } = res.data;
  if (res.status === 200 || res.status === 201) {
    message.success("创建成功");
    props.handelClose();
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }
}
</script>

<style scoped lang="less"></style>
