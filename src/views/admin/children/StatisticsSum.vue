<template>
  <div class="statistics-container">
    <div class="statistics">
      <Form layout="inline" @finish="getStatisticData" :model="formSearch">
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
            :default-value="{ value: 'bar', label: '柱形图' }"
          >
          </Select>
        </FormItem>

        <FormItem>
          <Button html-type="submit" type="primary">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="chart" ref="chartRef">图表</div>
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
import { userBookingCount } from "@/service/statistic/statistic";

interface FormSearch {
  startTime: string;
  endTime: string;
  chartType: string;
}

const formSearch = ref<FormSearch>({
  startTime: "",
  endTime: "",
  chartType: "",
});

async function getStatisticData(values: {
  startTime: string;
  endTime: string;
}) {
  const startTime = dayjs(values.startTime).format("YYYY-MM-DD");
  const endTime = dayjs(values.endTime).format("YYYY-MM-DD");

  const res = await userBookingCount(startTime, endTime);

  const { data } = res.data;
  if (res.status === 201 || res.status === 200) {
    console.log(data);
  } else {
    message.error(data || "系统繁忙，请稍后再试");
  }
}

const chartRef = ref<HTMLElement>();
onMounted(() => {
  const myChart = echarts.init(chartRef.value!, "light", {
    renderer: "canvas",
  });
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
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
