
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
          type: 'line',
          showBackground: true,
          color: ['#58afed'],
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
      this.chart.setOption(option)
    }
  }
}
</script>