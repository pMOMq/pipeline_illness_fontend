<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-card>
        <el-skeleton-item variant="h3" style="width: 50%" />
        <div class="margin-top">
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" class="margin-top" />
          <el-skeleton-item variant="text" class="margin-top" />
          <el-skeleton-item variant="text" class="margin-top" />
        </div>
      </el-card>
    </template>
    <template #default>
      <el-card
        class="chart-item-container"
        :body-style="{ padding: 0 }"
        shadow="never"
      >
        <!-- <template #header> -->
        <div class="text-bold">
           &nbsp;病害数量统计
        </div>
        <el-row :gutter="5">
          <!-- <el-col :xs="24" :sm="12" :md="6" class="item-wrapper"> -->
          <el-select
            v-model="value"
            class="m-2"
            placeholder="年度"
            size="large"
            @click="getYears"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="item-wrapper"> -->
          <el-select
            v-model="value"
            class="m-2"
            placeholder="所属分公司"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- </el-col>
        <el-col :xs="24" :sm="12" :md="6" class="item-wrapper"> -->
          <el-select
            v-model="value"
            class="m-2"
            placeholder="病害类型"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- </el-col> -->
        </el-row>
        <!-- </template> -->
        <div ref="fullYearSalesChart" class="chart-item"></div>
      </el-card>
    </template>
  </el-skeleton>
</template>
<script lang="ts">
import { useEcharts } from "@/hooks";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { dispose, graphic } from "echarts";
import { get, Response } from "@/api/http";
import { getYear } from "@/api/url";
import { ElMessage } from "element-plus";
import { random } from "lodash";
const getYears = () => {
  get({
    url: getYear,
    data: {},
  })
    .then(({ data }: Response) => {
      console.log(data);
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
};
const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
function getData() {
  var data: number[] = [];
  // while (data.length < months.length) {
  //   // data.push(random(100, 150));
  //   data.push(150);
  // }
  data = [90, 70, 50, 93, 88, 96, 83, 75, 90, 110, 98, 100];
  return data;
}
function getData1() {
  var data: number[] = [];
  // while (data.length < months.length) {
  //   // data.push(random(100, 150));
  //   data.push(150);
  // }
  data = [50, 70, 50, 93, 88, 96, 83, 75, 90, 100, 58, 100];
  return data;
}
export default defineComponent({
  name: "FullYearSalesChart",
  setup() {
    const loading = ref(true);
    const fullYearSalesChart = ref<HTMLDivElement | null>(null);
    let interval: any = null;
    const init = () => {
      const option = {
        color: ["rgba(64, 58, 255)"],
        grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          data: ["2020全年销售额", "2021全年销售额"],
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: months,
        },
        yAxis: {
          type: "value",
          // max: 200,
        },
        series: [
          {
            type: "line",
            name: "2020全年销售额",
            // stack: "总量",
            data: getData(),
            label: {
              show: true,
              formatter(val: any) {
                return val.data + "万";
              },
            },
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                // { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
          {
            type: "line",
            name: "2021全年销售额",
            // stack: "总量",
            data: getData1(),
            label: {
              show: true,
              formatter(val: any) {
                return val.data + "万";
              },
            },
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                // { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() =>
          useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(
            option
          )
        );
        // interval = setInterval(() => {
        //   const option = {
        //     series: [
        //       {
        //         data: getData(),
        //       },
        //     ],
        //   };
        //   useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(
        //     option
        //   );
        // }, 5000);
      }, 1000);
    };
    const updateChart = () => {
      useEcharts(fullYearSalesChart.value as HTMLDivElement).resize();
    };
    onMounted(init);
    onBeforeUnmount(() => {
      dispose(fullYearSalesChart.value as HTMLDivElement);
      clearInterval(interval);
    });
    return {
      loading,
      fullYearSalesChart,
      updateChart,
      getYears,
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-item-container {
  width: 100%;
  height: 445px;
  .chart-item {
    height: 345px;
  }
}
.text-bold {
  border-left: 4px solid #2381d8;
  font-weight: bold;
  margin-left:20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size:16px
}
</style>
