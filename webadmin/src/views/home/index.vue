<template>
  <div class="page">
    <el-form :inline="true" class="el-InputForm">
      <el-col :span="24">
        <!-- <el-form-item> -->
        <div class="ground">
          <div class="ground-one week-line">
            <div class="title week week-line">周</div>
            <div class="content">
              <div>
                申请办理事项：
                <span class="week">{{week.applyNum}}</span>
              </div>
              <div>
                完结办理事项：
                <span class="week">{{week.endNum}}</span>
              </div>
              <div>
                审批反馈证明：
                <span class="week">{{week.feedbackNum}}</span>
              </div>
            </div>
          </div>
          <div class="ground-one month-line">
            <div class="title month month-line">月</div>
            <div class="content">
              <div>
                申请办理事项：
                <span class="month">{{month.applyNum}}</span>
              </div>
              <div>
                完结办理事项：
                <span class="month">{{month.endNum}}</span>
              </div>
              <div>
                审批反馈证明：
                <span class="month">{{month.feedbackNum}}</span>
              </div>
            </div>
          </div>
          <div class="ground-one quarter-line">
            <div class="title quarter quarter-line">季</div>
            <div class="content">
              <div>
                申请办理事项：
                <span class="quarter">{{quarter.applyNum}}</span>
              </div>
              <div>
                完结办理事项：
                <span class="quarter">{{quarter.endNum}}</span>
              </div>
              <div>
                审批反馈证明：
                <span class="quarter">{{quarter.feedbackNum}}</span>
              </div>
            </div>
          </div>
          <div class="ground-one year-line">
            <div class="title year year-line">年</div>
            <div class="content">
              <div>
                申请办理事项：
                <span class="year">{{year.applyNum}}</span>
              </div>
              <div>
                完结办理事项：
                <span class="year">{{year.endNum}}</span>
              </div>
              <div>
                审批反馈证明：
                <span class="year">{{year.feedbackNum}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- </el-form-item> -->
      </el-col>
      <el-col :span="24" class="time-ground">
        <el-form-item label="查询时间" class="page-item">
          <el-date-picker
            v-model="valueTime"
            size="medium"
            type="daterange"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="page-item">
          <el-button type="primary" size="medium" @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="Statistics">
        <div class="line-ground">
          <div class="text2">各组织机构办事申请和反馈证明已完结数量统计分析</div>
          <div id="line" class="line"></div>
        </div>
        <div class="line-ground">
          <div class="text2">各组织机构反馈证明的办理时长统计分析(最短时间、最长时间、平均时间)</div>
          <div id="line2" class="line"></div>
        </div>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import {
  statisticalByEnd,
  statisticalByEndTime,
  statisticalByTimeQuantum,
} from "@/api/statistic.js";
export default {
  name: "Dashboard",
  mounted() {
    this.ByEnd();
    this.ByEndTime();
    this.ByTimeQuantum();
  },
  data() {
    return {
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectDate = minDate.getTime();
          if (maxDate) {
            this.selectDate = "";
          }
        },
        disabledDate: (time) => {
          if (this.selectDate !== "") {
            const one = 30 * 24 * 3600 * 1000 * 12;
            const minTime = this.selectDate - one;
            const maxTime = this.selectDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        },
      },
      valueTime: "",
      SearchItem: {
        startTime: "",
        endTime: "",
      },
      month: { applyNum: "0", endNum: "0", feedbackNum: "0" },
      quarter: { applyNum: "0", endNum: "0", feedbackNum: "0" },
      week: { applyNum: "0", endNum: "0", feedbackNum: "0" },
      year: { applyNum: "0", endNum: "0", feedbackNum: "0" },
    };
  },
  methods: {
    // 搜索按钮
    // 时间返回数组形式
    SearchNoteList() {
      if (this.valueTime) {
        this.SearchItem.startTime = this.valueTime[0];
        this.SearchItem.endTime = this.valueTime[1];
      } else {
        this.SearchItem.startTime = "";
        this.SearchItem.endTime = "";
      }
      this.ByEnd();
      this.ByEndTime();
      this.ByTimeQuantum();
    },

    async ByEnd() {
      const data = {
        startTime: this.SearchItem.startTime,
        endTime: this.SearchItem.endTime,
      };
      try {
        const res = await statisticalByEnd(data);
        let deptNameArr = [];
        res.data.data.forEach((item) => {
          let name = item.deptName;
          if (name.length > 8) {
            name = name.slice(0, 8) + "...";
          }
          deptNameArr.push(name);
        });
        let applyNumArr = [];
        res.data.data.forEach((item) => {
          applyNumArr.push(item.applyNum);
        });
        let feedbackNumArr = [];
        res.data.data.forEach((item) => {
          feedbackNumArr.push(item.feedbackNum);
        });
        let echart = echarts.init(document.getElementById("line"));
        let option = {
          backgroundColor: "#323A5E",
          title: {
            // text: "123",
            x: "center",
            y: "bottom",
            textStyle: {
              fontSize: "14",
            },
          },
          legend: {
            data: ["事项办理数量", "反馈证明办理数量"],
            right: 25,
            top: 12,
            textStyle: {
              color: "#fff",
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            top: "15%",
            left: "3%",
            right: "5%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: deptNameArr,
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              textStyle: {
                color: "white",
                fontSize: 12, //更改坐标轴文字大小
                fontFamily: "Microsoft YaHei",
              },
            },
          },
          yAxis: {
            name: "单位：数量",
            // type: "value",
            // minInterval: 1,

            // type: "value",
            // max: "1200",
            axisLine: {
              // show: false,
              lineStyle: {
                color: "white",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "white",
              },
            },
            axisLabel: {},
          },
          dataZoom: [
            {
              show: true,
              height: 12,
              xAxisIndex: [0],
              // bottom:'8%',
              bottom: "1%",
              // start: 10,
              end: 90,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5",
              },
              textStyle: {
                color: "#fff",
              },
              borderColor: "#90979c",
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35,
            },
          ],

          series: [
            {
              name: "事项办理数量",
              type: "bar",
              barWidth: "15%",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#8bd46e",
                    },
                    {
                      offset: 1,
                      color: "#09bcb7",
                    },
                  ]),
                  barBorderRadius: 11,
                },
              },
              data: applyNumArr,
            },
            {
              name: "反馈证明办理数量",
              type: "bar",
              barWidth: "15%",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#248ff7",
                    },
                    {
                      offset: 1,
                      color: "#6851f1",
                    },
                  ]),
                  barBorderRadius: 11,
                },
              },
              data: feedbackNumArr,
            },
          ],
        };
        echart.setOption(option);
      } catch (even) {
        console.log(even);
        this.$message.error(even.msg);
      }
    },
    async ByEndTime() {
      const data = {
        startTime: this.SearchItem.startTime,
        endTime: this.SearchItem.endTime,
      };
      try {
        const res = await statisticalByEndTime(data);
        let deptNameArr = [];
        let minNumArr = [];
        let maxNumArr = [];
        let avgNumArr = [];
        res.data.data.min.forEach((item) => {
          minNumArr.push(item.num);
        });
        res.data.data.max.forEach((item) => {
          maxNumArr.push(item.num);
        });
        res.data.data.avg.forEach((item) => {
          let name = item.deptName;
          if (name.length > 8) {
            name = name.slice(0, 8) + "...";
          }
          deptNameArr.push(name);
          avgNumArr.push(item.num);
        });

        let echart = echarts.init(document.getElementById("line2"));
        var charts = {
          names: ["办理最短时间", "办理最长时间", "办理平均时间"],
          value: [minNumArr, maxNumArr, avgNumArr],
        };
        var color = ["rgba(23, 255, 243", "rgba(119,61,190", "rgba(253,230,2"];
        var lineY = [];

        for (var i = 0; i < charts.names.length; i++) {
          var x = i;
          if (x > color.length - 1) {
            x = color.length - 1;
          }
          var infor = {
            name: charts.names[i],
            type: "line",
            color: color[x] + ")",
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: color[x] + ", 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: color[x] + ", 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            symbol: "circle",
            symbolSize: 5,
            data: charts.value[i],
          };
          lineY.push(infor);
        }

        var option = {
          backgroundColor: "#323A5E",
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: charts.names,
            right: 25,
            top: 12,
            textStyle: {
              color: "#fff",
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
          },
          grid: {
            top: "15%",
            left: "3%",
            right: "5%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: deptNameArr,
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              textStyle: {
                color: "white",
                fontSize: 12, //更改坐标轴文字大小
                fontFamily: "Microsoft YaHei",
              },
            },
          },
          yAxis: {
            name: "单位：h",
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "white",
              },
            },
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
          },
          series: lineY,

          dataZoom: [
            {
              show: true,
              height: 12,
              xAxisIndex: [0],
              bottom: "1%",
              // start: 10,
              end: 90,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5",
              },
              textStyle: {
                color: "#fff",
              },
              borderColor: "#90979c",
            },
            {
              type: "inside",
              show: true,
              height: 15,
              // start: 1,
              end: 35,
            },
          ],
        };
        echart.setOption(option);
      } catch (even) {
        this.$message.error(even.msg);
      }
    },
    async ByTimeQuantum() {
      const data = {
        startTime: this.SearchItem.startTime,
        endTime: this.SearchItem.endTime,
      };
      try {
        const res = await statisticalByTimeQuantum(data);
        this.week = res.data.data.week;
        this.quarter = res.data.data.quarter;
        this.month = res.data.data.month;
        this.year = res.data.data.year;
      } catch (even) {
        this.$message.error(even.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../components/styles/data-tabs.scss";
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.ground {
  // background-color: #999;
  margin: 10px 0;
  display: flex;
  font-size: 14px;
  // color: #fff;
  color: #333;
}
.ground-one {
  flex: 1;
  text-align: center;
  display: flex;
  // border: 1px solid #fff;
  box-sizing: border-box;
  margin: 10px;
  line-height: 20px;
  padding: 10px;
  box-shadow: 5px 5px 5px (rgba($color: #000000, $alpha: 0.1));
  border-radius: 5px;
  // background: linear-gradient(to right, #00b4db, #0083b0);
  // background: -moz-linear-gradient((to right, #00b4db, #0083b0)); /*Mozilla*/
  // background: -webkit-gradient(
  //   (to right, #00b4db, #0083b0)
  // ); /*Old gradient for webkit*/
  // background: -webkit-linear-gradient(
  //   (to right, #00b4db, #0083b0)
  // ); /*new gradient for Webkit*/
  // background: -o-linear-gradient((to right, #00b4db, #0083b0)); /*Opera11*/

  border: 2px solid #afe3fb;
}
.week {
  color: #afe3fb;
}
.week-line {
  border: 2px solid #afe3fb;
}
.month {
  color: #8080ff;
}
.month-line {
  border: 2px solid #8080ff;
}
.quarter {
  color: #17aef1;
}
.quarter-line {
  border: 2px solid #17aef1;
}
.year {
  color: #0000ff;
}
.year-line {
  border: 2px solid #0000ff;
}
.ground-one .title {
  width: 40px;
  height: 40px;
  margin: 10px;
  margin-right: 20px;
  line-height: 40px;
  // border: 1px solid #81d6fa;
  border-radius: 50%;
  font-size: 20px;
}
.page {
  padding: 10px;
  padding-top: 0;
}
.time-ground {
  padding: 10px;
  // margin: 10px 0;
  // background-color: yellowgreen;
}
.Statistics {
  display: flex;
}
.line-ground {
  // width: 40vw;
  width: 100%;
  // border: 1px solid #333;
  margin: 10px;
}
.line {
  height: 50vh;
  width: 100%;
}
.page-item {
  margin: 0;
  padding: 0;
  margin-right: 20px;
}
.text2 {
  font-size: 15px;
  color: #333;
  line-height: 50px;
  text-align: center;
}
.content {
  text-align: left;
}
</style>
