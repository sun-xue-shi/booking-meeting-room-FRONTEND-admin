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
              { value: 'wordCloud', label: '主题词云' },
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
    <div class="chart">
      <div class="chart1" ref="chartRef1"></div>
      <div class="chart1" ref="chartRef2"></div>
    </div>

    <div
      class="cloud"
      ref="chartRef3"
      v-if="formSearch.chartType === 'wordCloud'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Form, FormItem, Button, DatePicker, Select } from "ant-design-vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
import dayjs from "dayjs";
import {
  bookingThemeCount,
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

type ThemeData = {
  themeCount: number;
  bookingId: string;
  bookingTheme: string;
};

const formSearch = ref<FormSearch>({
  chartType: "bar",
  endTime: "",
  startTime: "",
});

const bookData = ref<BookingData[]>([]);
const roomUsedData = ref<RoomUsedData[]>([]);
const themeData = ref<ThemeData[]>([]);
async function getStatisticData(values: {
  startTime: string;
  endTime: string;
}) {
  const startTime = dayjs(values.startTime).format("YYYY-MM-DD");
  const endTime = dayjs(values.endTime).format("YYYY-MM-DD");

  const res1 = await userBookingCount(startTime, endTime);
  const { data } = res1.data;
  bookData.value = data;

  const res2 = await meetingRoomUsedCount(startTime, endTime);
  const { data: data2 } = res2.data;
  roomUsedData.value = data2;

  const res3 = await bookingThemeCount(startTime, endTime);
  const { data: data3 } = res3.data;
  themeData.value = data3;
  console.log(themeData.value);
}

const chartRef1 = ref<HTMLElement>();
const chartRef2 = ref<HTMLElement>();
const chartRef3 = ref<HTMLElement>();
const onSubmit = () => {
  if (formSearch.value.startTime) {
    getStatisticData({
      startTime: formSearch.value?.startTime,
      endTime: formSearch.value?.endTime,
    });
  }

  if (formSearch.value.chartType !== "wordCloud") {
    renderChart1();
    renderChart2();
  } else {
    renderChart3();
  }
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

const renderChart3 = () => {
  const myChart = echarts.init(chartRef3.value!, "light", {
    renderer: "canvas",
  });

  myChart.setOption({
    title: {
      text: "会议主题词云",
    },
    series: [
      {
        type: "wordCloud",
        shape: "circle",

        keepAspect: false,

        // maskImage: maskImage,

        left: "center",
        top: "center",
        width: "100%",
        height: "100%",
        right: null,
        bottom: null,

        rotationRange: [-45, 45],
        rotationStep: 45,
        gridSize: 20,

        drawOutOfBound: false,

        shrinkToFit: false,
        layoutAnimation: true,

        textStyle: {
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: function () {
            // Random color
            return (
              "rgb(" +
              [
                Math.round(Math.random() * 220),
                Math.round(Math.random() * 220),
                Math.round(Math.random() * 220),
              ].join(",") +
              ")"
            );
          },
        },
        emphasis: {
          focus: "self",
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: "#333",
          },
        },

        data: themeData.value.map((item) => {
          return {
            name: item.bookingTheme,
            value: item.themeCount,
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

  .cloud {
    margin: 0 auto;
    width: 800px;
    height: 600px;
  }
  .chart {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 1200px;
    height: 600px;
    .chart1 {
      padding-left: 20px;
      margin: 0 auto;
      width: 500px;
    }
  }

  .ant-form-item {
    margin: 10px;
  }
}
</style>
