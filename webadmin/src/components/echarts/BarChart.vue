<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      var option = {
        xAxis: {
          type: 'category',
          data: ['一', '二', '三', '四', '五', '六', '日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 130, 180, 90, 60, 100, 220],
          type: 'bar',
          showBackground: true,
          barWidth: '30px',
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          
          itemStyle: {
            normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                    var colorList = ['#6dd8da', '#f67287', '#f29e3c', '#c05bdd', '#7a65f2']; //每根柱子的颜色
                    return colorList[0];
                }
            }
          }
        }]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
