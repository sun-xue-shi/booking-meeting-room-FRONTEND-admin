<template>
  <div class="room-container">
    <div class="search">
      <Form :model="searchMeetingRoom" @finish="searchBtn" layout="inline">
        <FormItem label="会议室名称" name="name">
          <Input :maxlength="20" v-model:value="searchMeetingRoom.name" />
        </FormItem>

        <FormItem label="容纳人数" name="capacity">
          <Input :maxlength="20" v-model:value="searchMeetingRoom.capacity" />
        </FormItem>

        <FormItem label="设备" name="equipment">
          <Input :maxlength="20" v-model:value="searchMeetingRoom.equipment" />
        </FormItem>

        <FormItem label="位置" name="location">
          <Input :maxlength="20" v-model:value="searchMeetingRoom.location" />
        </FormItem>

        <FormItem>
          <Button
            class="btn1"
            type="default"
            @click="handelReset"
            :icon="h(RedoOutlined)"
          >
            重置
          </Button>
        </FormItem>

        <FormItem>
          <Button class="btn1" type="primary" html-type="submit"> 搜索 </Button>
        </FormItem>

        <FormItem>
          <Button class="btn2" type="primary" @click="isCreateOpen = true">
            创建
          </Button>
        </FormItem>
      </Form>
    </div>
    <div class="table">
      <Table
        :columns="columns"
        :data-source="searchResult"
        :pagination="{
          current: pageNo,
          pageSize: pageSize,
          total: totalCount,
          onChange: handleChange,
        }"
        :bordered="true"
      >
      </Table>
    </div>
  </div>
  <CreateMeeting
    :is-create-open="isCreateOpen"
    :handel-close="handelClose"
    v-if="isCreateOpen"
  />
  <UpdateMeeting
    v-if="isUpdateOpen"
    :id="updateId"
    :is-update-open="isUpdateOpen"
    :handel-close="handelClose"
  />
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import {
  Form,
  FormItem,
  Input,
  Button,
  type TableColumnsType,
  Table,
  message,
  Badge,
  Popconfirm,
  type FormInstance,
} from "ant-design-vue";
import { meetingSearch } from "@/service/room_manage/list";
import { deleteRoom } from "@/service/room_manage/delete";
import { QuestionCircleFilled, RedoOutlined } from "@ant-design/icons-vue";
import CreateMeeting from "@/views/admin/children/createModal/CreateMeeting.vue";
import UpdateMeeting from "@/views/admin/children/updateMeeting/UpdateMeeting.vue";
import { formatUTC } from "@/utils/format";

let isCreateOpen = ref(false);
let isUpdateOpen = ref(false);
let updateId = ref();
interface SearchMeetingRoom {
  location: string;
  name: string;
  equipment: string;
  capacity: number | undefined;
}

const searchMeetingRoom = ref<SearchMeetingRoom>({
  location: "",
  name: "",
  equipment: "",
  capacity: undefined,
});

export interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: string;
  updateTime: string;
}

let searchResult = ref<MeetingRoomSearchResult[]>([]);

// table栏信息
const columns: TableColumnsType<MeetingRoomSearchResult> = [
  {
    title: "名称",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "容纳人数",
    dataIndex: "capacity",
    align: "center",
  },
  {
    title: "位置",
    dataIndex: "location",
    align: "center",
  },
  {
    title: "设备",
    dataIndex: "equipment",
    align: "center",
  },
  {
    title: "描述",
    dataIndex: "description",
    align: "center",
  },
  {
    title: "添加时间",
    dataIndex: "createTime",
    customRender: (value) => formatUTC(value.record.createTime),
    align: "center",
  },
  {
    title: "上次更新时间",
    dataIndex: "updateTime",
    customRender: (value) => formatUTC(value.record.updateTime),
    align: "center",
  },
  {
    title: "预定状态",
    dataIndex: "isBooked",
    align: "center",
    customRender: (value) => {
      if (value.record.isBooked) {
        return h(Badge, { status: "error", text: "已被预订" });
      } else {
        return h(Badge, { status: "success", text: "可预订" });
      }
    },
  },
  {
    title: "删除",
    align: "center",
    customRender: (value) =>
      h(
        Popconfirm,
        {
          okText: "确定",
          cancelText: "取消",
          title: "删除会议室",
          description: "确认删除该会议室?",
          onConfirm: () => handleDelete(value.record.id),
          icon: h(QuestionCircleFilled),
        },
        [h("a", { innerHTML: "删除" })]
      ),
  },
  {
    title: "更新",
    align: "center",
    customRender: (value) =>
      h("a", {
        innerHTML: "修改",
        onClick: () => {
          updateId.value = value.record.id;
          isUpdateOpen.value = true;
        },
      }),
  },
];

let pageNo = 1;
let pageSize = 9;

const setPage = (newPageNo: number, newPageSize: number) => {
  pageNo = newPageNo;
  pageSize = newPageSize;
};

let totalCount = ref(15);

function handleChange(pageNo: number, pageSize: number) {
  setPage(pageNo, pageSize);
  searchBtn(searchMeetingRoom.value);
}

// 搜索会议室
async function searchBtn(values: SearchMeetingRoom) {
  const res = await meetingSearch(
    values.name,
    values.location,
    values.equipment,
    values.capacity,
    pageNo,
    pageSize
  );

  const { data } = res.data;

  if (res.status === 200 || res.status === 201) {
    searchResult.value = data.meetingRooms;
    totalCount.value = data.totalCount;
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}
searchBtn(searchMeetingRoom.value);

// 删除
async function handleDelete(id: number) {
  try {
    await deleteRoom(id);
    message.success("删除成功");
    searchBtn(searchMeetingRoom.value);
  } catch (e) {
    message.error("删除失败");
  }
}

// 关闭模态框
function handelClose() {
  isCreateOpen.value = false;
  isUpdateOpen.value = false;
  searchBtn(searchMeetingRoom.value);
}

// 表单重置
const formRef = ref<FormInstance>();
function handelReset() {
  formRef.value?.resetFields();
  searchBtn(searchMeetingRoom.value);
}
</script>

<style scoped lang="less">
.room-container {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .search {
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .btn2 {
    background-color: green;
  }

  .ant-form-item {
    margin: 10px;
  }
}
</style>
