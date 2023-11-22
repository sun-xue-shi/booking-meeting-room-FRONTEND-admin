<template>
  <div class="room-container">
    <div class="search">
      <Form :model="searchBooking" @finish="searchBtn" layout="inline">
        <FormItem label="预订人" name="username">
          <Input :maxlength="20" v-model:value="searchBooking.username" />
        </FormItem>

        <FormItem label="会议室名称" name="meetingRoomName">
          <Input
            :maxlength="20"
            v-model:value="searchBooking.meetingRoomName"
          />
        </FormItem>

        <FormItem label="会议室位置" name="meetingRoomPosition">
          <Input
            :maxlength="20"
            v-model:value="searchBooking.meetingRoomPosition"
          />
        </FormItem>

        <FormItem label="预定开始日期" name="rangeStartDate">
          <DatePicker v-model:value="searchBooking.rangeStartDate" />
        </FormItem>

        <FormItem label="预定开始时间" name="rangeStartTime">
          <TimePicker v-model:value="searchBooking.rangeStartTime" />
        </FormItem>

        <FormItem label="预定结束日期" name="rangeEndDate">
          <DatePicker v-model:value="searchBooking.rangeEndDate" />
        </FormItem>

        <FormItem label="预定结束时间" name="rangeEndTime">
          <TimePicker v-model:value="searchBooking.rangeEndTime" />
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
          <Button class="btn1" type="primary" html-type="submit">
            搜索 预定申请
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
  DatePicker,
  TimePicker,
  Popconfirm,
type FormInstance,
} from "ant-design-vue";
import {
  apply,
  bookingList,
  reject,
  unbind,
} from "@/service/booking_manage/booking";
import { formatUTC } from "@/utils/format";
import type { MeetingRoomSearchResult } from "./MeetingRoomManage.vue";
import type { SearchResult } from "./UserMessage.vue";
import { QuestionCircleFilled, RedoOutlined } from "@ant-design/icons-vue";

export interface SearchBooking {
  username: string;
  meetingRoomName: string;
  meetingRoomPosition: string;
  rangeStartDate: string;
  rangeStartTime: string;
  rangeEndDate: string;
  rangeEndTime: string;
}

const searchBooking = ref<SearchBooking>({
  username: "",
  meetingRoomName: "",
  meetingRoomPosition: "",
  rangeEndDate: "",
  rangeEndTime: "",
  rangeStartDate: "",
  rangeStartTime: "",
});

interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  createTime: string;
  updateTime: string;
  room: MeetingRoomSearchResult;
  user: SearchResult;
  status: string;
  note: string;
}

let searchResult = ref<BookingSearchResult[]>();

// table栏信息
const columns: TableColumnsType<BookingSearchResult> = [
  {
    title: "会议室名称",
    dataIndex: "name",
    align: "center",
    customRender: (value) => h("div", { innerHTML: value.record.room.name }),
  },

  {
    title: "会议室位置",
    dataIndex: "location",
    align: "center",
    customRender: (value) =>
      h("div", { innerHTML: value.record.room.location }),
  },

  {
    title: "预订人",
    dataIndex: "user",
    align: "center",
    customRender: (value) =>
      h("div", { innerHTML: value.record.user.username }),
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    customRender: (value) => formatUTC(value.record.startTime),
    align: "center",
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    customRender: (value) => formatUTC(value.record.endTime),
    align: "center",
  },
  {
    title: "审批状态",
    dataIndex: "status",
    onFilter: (value, record) => record.status.startsWith(value as string),
    filters: [
      { text: "审批通过", value: "审批通过" },
      {
        text: "审批驳回",
        value: "审批驳回",
      },
      {
        text: "申请中",
        value: "申请中",
      },
      {
        text: "已解除",
        value: "已解除",
      },
    ],
    align: "center",
  },
  {
    title: "备注",
    dataIndex: "note",
    align: "center",
  },

  {
    title: "操作",
    align: "center",
    customRender: (value) =>
      h("div", [
        h(
          Popconfirm,
          {
            okText: "确定",
            cancelText: "取消",
            title: "通过申请",
            description: "确认通过吗?",
            onConfirm: () => changeStatus(value.record.id, "apply"),
            icon: h(QuestionCircleFilled),
          },
          [h("a", { innerHTML: " 通过 " })]
        ),
        h(
          Popconfirm,
          {
            okText: "确定",
            cancelText: "取消",
            title: "驳回申请",
            description: "确认驳回吗?",
            onConfirm: () => changeStatus(value.record.id, "reject"),
            icon: h(QuestionCircleFilled),
          },
          [h("a", { innerHTML: " 驳回 " })]
        ),
        h(
          Popconfirm,
          {
            okText: "确定",
            cancelText: "取消",
            title: "解除申请",
            description: "确认解除吗?",
            onConfirm: () => changeStatus(value.record.id, "unbind"),
            icon: h(QuestionCircleFilled),
          },
          [h("a", { innerHTML: " 解除 " })]
        ),
      ]),
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
  searchBtn(searchBooking.value);
}

// 搜索
async function searchBtn(values: SearchBooking) {
  const res = await bookingList(values, pageNo, pageSize);

  const { data } = res.data;

  if (res.status === 200 || res.status === 201) {
    searchResult.value = data.bookings;

    totalCount.value = data.totalCount;
  } else {
    message.error(data || "系统繁忙,请稍后再试");
  }
}
searchBtn(searchBooking.value);

// 改变预定状态
async function changeStatus(id: number, status: "apply" | "reject" | "unbind") {
  const methods = {
    apply,
    reject,
    unbind,
  };
  const res = await methods[status](id);

  if (res.status === 201 || res.status === 200) {
    message.success("状态更新成功");
    searchBtn(searchBooking.value);
  } else {
    message.error(res.data.data);
  }
}

// 表单重置
const formRef = ref<FormInstance>();
function handelReset() {
  formRef.value?.resetFields();
  searchBtn(searchBooking.value);
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
  .ant-form-item {
    margin: 10px;
  }
}
</style>
