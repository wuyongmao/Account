<template>
	<view class="container">
		<view class="time-filter">
			<view class="month-filter">
				<view class="iconfont jz-icon-arrow-left" @tap="setParams('prev')"></view>
				<view class="month" v-if=" type == 'month' ">{{ year }} - {{ month }}</view>
				<view class="month" v-if="type == 'year' ">{{ year }}</view>
				<view class="month" v-if="type == 'all' ">所有</view>
				<view class="iconfont jz-icon-arrow-right-copy" @tap="setParams('next')"></view>
			</view>

			<view class="chart-filter">
				<view @tap="setType('month')">按月</view>
				<view @tap="setType('year')">按年</view>
				<view @tap="setType('all')">全部</view>
			</view>
		</view>


		<div class="wrap">
			<mpvue-echarts :echarts="echarts" canvasId="bar" ref="barChart" :onInit="initChart" />
		</div>

	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	let chart = null
	let option = {
		color: ['#37a2da', '#32c5e9', '#67e0e3'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {  
				type: 'shadow' 
			}
		},
		legend: {
			data: ['热度']
		},
		grid: {
			left: 20,
			right: 20,
			bottom: 15,
			top: 40,
			containLabel: true
		},
		xAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#999'
				}
			},
			axisLabel: {
				color: '#666'
			}
		}],
		yAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			data: ['购物', '吃饭', '看电影', '打的', '车票', '请客', '红包'],
			axisLine: {
				lineStyle: {
					color: '#999'
				}
			},
			axisLabel: {
				color: '#666'
			}
		}],
		series: [{
			name: '热度',
			type: 'bar',
			label: {
				normal: {
					show: true,
					position: 'inside'
				}
			},
			data: [300, 270, 340, 344, 300, 320, 310],
			itemStyle: {
				emphasis: {
					color: '#37a2da'
				}
			}
		}]
	}

	function initChart(canvas, width, height) {
		chart = echarts.init(canvas, null, {
			width: width,
			height: height
		})
		canvas.setChart(chart)



		chart.setOption(option)
		return chart
	}

	export default {
		data() {
			return {  
				isActive: true,
				hasError: true,
				echarts,
				echartsDate: option,
				updateStatus: false,
				activeClass: {
					'active': false,
					'text-danger': true
				},
				errorClass: {
					'active': true,
					'text-danger': false
				},

				activeColor: true,
				fontSize: 30,


				todayconsum: [{
					"id": 1,
					"date": "2019-01-15",
					"amout": 10,
					"type": "income",
					"descp": "早餐",
					"category_icon": "tubiaozhizuomoban"

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"descp": "中餐",
					"category_icon": "tubiaozhizuomoban"

				}],

				chartData: [{
					'name': '购物',
					percent: "10",
					format_amount: 10
				}, {
					'name': '吃饭',
					percent: "30",
					format_amount: 30
				}, {
					'name': '看电影',
					percent: "60",
					format_amount: 60
				}],
				header: {
					expend_count: 100.00,
					income_count: 20.1,
					surplus: 120,
					expend_rise: 'income',
					'expend_percent': '10',
					'income_rise': 'income',
					'income_percent': '20',
					'surplus_rise': 'income',
					'surplus_percent': '23'

				},
				info: {},
				type: 'month',
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				emptyTitle: '找不到数据呢~试试其它'
			};
		},
		components: {
			mpvueEcharts
		},
		methods: {
			initChart(canvas, width, height) {
				chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chart)
				chart.setOption(option)
				return chart
			},
			setParams(type) {
				if (type == 'all') return false
				if (type == 'next') {
					if (this.type == 'month') this.nextMonth()
					if (this.type == 'year') this.year += 1
				} else {
					if (this.type == 'month') this.prevMonth()
					if (this.type == 'year') this.year -= 1
				}
				 /* this.getChartData() */
			},
			setType(type) {
				this.type = type
				this.getChartData();
				this.updateChart();

			},

			updateChart() {
				 
				if (this.updateStatus) {
					return;
				}
				this.echartsDate.series[0].data[0] = 800;

				this.$refs.barChart.init();
				this.updateStatus = true;


			},
			nextMonth() {
				if (this.month == 12) {
					this.year += 1
					this.month = 1
				} else {
					this.month += 1
				}
				this.echartsDate.series[0].data[0] = 800;
				this.$refs.barChart.init();
				this.updateStatus = true;
			},
			prevMonth() {
				if (this.month == 1) {
					this.year -= 1
					this.month = 12
				} else {
					this.month -= 1
				}
				updateChart();
			},
			async getChartData() {
				const datap = {
					type: this.type,
					year: this.year,
					month: this.month
				}
				let data = {
					header: '',
					charts: ''
				}


				this.header = data.header
				this.chartData = data.charts

			}


		}
	};
</script>


<style lang="scss" src="../../static/styles/super_chart.scss"></style>
<style src="../../static/styles/iconfont.wxss"></style>
<style lang="less" src="../../static/styles/common.less"></style>





<style scoped>
	.time-filter {
		padding: 5px 10px;
		margin: 0px;
		background: #0A98D5;
		color: #FFFFFF;
		font-size: 21px;
	}

	.month-filter .month,
	.chart-filter {
		background: #09BB07;

	}

	.expend-bars .item {
		margin: 5upx;
		height: 60upx;
		/* background-color:#BBBBBB ; */


	}

	.wrap {
		margin-top: 20upx;
		width: 100%;
		height: 300px;
	}
</style>
