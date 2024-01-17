<template>
  <div class="statistics-container">
    <div class="statistics">
      <Form layout="inline" :model="formSearch">
        <FormItem label="开始日期" name="startTime">
          <DatePicker v-model:value="formSearch.startTime" />
        </FormItem>

        <FormItem label="结束日期" name="endTime">
          <DatePicker v-model:value="formSearch.endTime" />
        </FormItem>

        <FormItem label="图表类型" name="chartType">
          <Select
            v-model:value="formSearch.chartType"
            :options="[
              { value: 'bar', label: '柱形图' },
              { value: 'pie', label: '饼图' },
            ]"
            style="width: 100px"
          >
          </Select>
        </FormItem>

        <FormItem>
          <Button html-type="submit" type="primary" @click="onSubmit"
            >查询</Button
          >
        </FormItem>
      </Form>
    </div>
    <div class="chart" ref="chartRef1">图表</div>
    <div class="chart" ref="chartRef2">图表</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Form,
  FormItem,
  Button,
  DatePicker,
  Select,
  message,
} from "ant-design-vue";
import * as echarts from "echarts";
import dayjs from "dayjs";
import {
  meetingRoomUsedCount,
  userBookingCount,
} from "@/service/statistic/statistic";

type FormSearch = {
  startTime: string;
  endTime: string;
  chartType: string;
};

type RoomUsedData = {
  meetingRoomName: string;
  meetingRoomId: number;
  usedCount: string;
};

type BookingData = {
  bookingCount: string;
  userId: string;
  username: string;
};

const formSearch = ref<FormSearch>({
  chartType: "bar",
  endTime: "",
  startTime: "",
});

const bookData = ref<BookingData[]>([]);
const roomUsedData = ref<RoomUsedData[]>([]);
async function getStatisticData(values: {
  startTime: string;
  endTime: string;
}) {
  const startTime = dayjs(values.startTime).format("YYYY-MM-DD");
  const endTime = dayjs(values.endTime).format("YYYY-MM-DD");

  const res1 = await userBookingCount(startTime, endTime);

  const { data } = res1.data;
  if (res1.status === 201 || res1.status === 200) {
    bookData.value = data;
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }

  const res2 = await meetingRoomUsedCount(startTime, endTime);

  const { data: data2 } = res2.data;
  if (res2.status === 201 || res2.status === 200) {
    roomUsedData.value = data2;
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }
}

const chartRef1 = ref<HTMLElement>();
const chartRef2 = ref<HTMLElement>();
const onSubmit = () => {
  if (formSearch.value.startTime) {
    getStatisticData({
      startTime: formSearch.value?.startTime,
      endTime: formSearch.value?.endTime,
    });
  }
  renderChart1();
  renderChart2();
};

const renderChart1 = () => {
  const myChart = echarts.init(chartRef1.value!, "light", {
    renderer: "canvas",
  });
  myChart.setOption({
    title: {
      text: "用户预定统计",
    },
    tooltip: {},
    xAxis: {
      data: bookData.value.map((item) => item.username),
    },
    yAxis: {},
    series: [
      {
        name: "预定次数",
        type: formSearch.value.chartType,
        data: bookData.value.map((item) => {
          return {
            name: item.username,
            value: item.bookingCount,
          };
        }),
      },
    ],
  });
};
const renderChart2 = () => {
  const myChart = echarts.init(chartRef2.value!, "light", {
    renderer: "canvas",
  });
  myChart.setOption({
    title: {
      text: "房间使用统计",
    },
    tooltip: {},
    xAxis: {
      data: roomUsedData.value.map((item) => item.meetingRoomName),
    },
    yAxis: {},
    series: [
      {
        name: "使用次数",
        type: formSearch.value.chartType,
        data: roomUsedData.value.map((item) => {
          return {
            name: item.meetingRoomName,
            value: item.usedCount,
          };
        }),
      },
    ],
  });
};

onMounted(() => {
  getStatisticData({ startTime: "2023-12-31", endTime: "2024-12-31" });
});
</script>

<style scoped lang="less">
.statistics-container {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .statistics {
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .chart {
    margin: 0 auto;
    width: 800px;
    height: 600px;
  }
  .ant-form-item {
    margin: 10px;
  }
}
</style>
