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

		<view class="chart-amount">
			<view>
				<view class="amount">{{ header.expend_count }}</view>
				<view class="small-text">总支出</view>
				<view :class="header.expend_rise" class="percent-rise ">同期{{ header.expend_rise == 'income' ? '增长' : '下降' }} {{ header.expend_percent }}%</view>
			</view>

			<view>
				<view class="amount">{{ header.income_count }}</view>
				<view class="small-text">总收入</view>
				<view :class="header.income_rise" class="percent-rise ">同期{{ header.income_rise == 'income' ? '增长' : '下降' }} {{ header.income_percent }}%</view>
			</view>

			<view>
				<view class="amount">{{ header.surplus }}</view>
				<view class="small-text">结余</view>
				<view :class="header.surplus_rise" class="percent-rise ">同期{{ header.surplus_rise == 'income' ? '增长' : '下降' }} {{ header.surplus_percent }}%</view>
			</view>
		</view>

		<div class="wrap">
			<mpvue-echarts :echarts="echarts" canvasId="bar" ref="barChart" :onInit="onInit" />
		</div>
		<view class="expend-bars" v-if=" chartData.length > 0 ">
			<view class="item" :key='key' v-for="(item,key) in  chartData " v-bind:style=" 'background-size:'+ item.percent  +'% 100%;'">
				<view>
					<view class="atitle">{{ item.name }}<text class="percent">{{ item.percent }}%</text></view>
					<view class="amount">{{ item.format_amount }}</view>
				</view>
				<view class="zan-icon zan-icon-arrow"></view>
			</view>
		</view>
		<my_signboard v-if="chartData.length == 0 " :title="emptyTitle"></my_signboard>

	</view>
</template>

<script>
	import * as echarts from '../../components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	import uniIcon from '../../components/uni-icon.vue';
	var option = {
		backgroundColor: '#ffffff',
		color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F', 'red'],
		series: [{
			label: {
				normal: {
					fontSize: 16
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: [0, '60%'],
			data: [{
				value: 55,
				name: '购物'
			}, {
				value: 20,
				name: '吃饭'
			}, {
				value: 10,
				name: '看电影'
			}, {
				value: 20,
				name: '发红包'
			}, {
				value: 38,
				name: '交通'
			}],
			itemStyle: {}
		}]
	}

	function initChart(canvas, width, height) {
		const chart = echarts.init(canvas, null, {
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
				onInit: initChart,
				activeClass: {
					'active': false,
					'text-danger': true
				},
				errorClass: {
					'active': true,
					'text-danger': false
				},
				echartsDate: option,
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
			uniIcon,
			mpvueEcharts
		},
		methods: {
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
			initChart(canvas, width, height) {
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chart)
				chart.setOption(option)
				return chart
			},
			setType(type) {
				this.type = type
				this.getChartData()
				this.echartsDate.series[0].data[0].value = 800;
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
			},
			prevMonth() {
				if (this.month == 1) {
					this.year -= 1
					this.month = 12
				} else {
					this.month -= 1
				}
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
			},
			async initLineChart(data) {
				let dataa = {
					canvasId: 'lineCanvas',
					type: 'line',
					categories: data.months,
					series: [{
							name: '收入',
							data: data.incomes,
							color: '#FF0000'
						}, {
							name: '支出',
							data: data.expends,
							color: '#008000'
						},
						{
							name: '结余',
							data: data.surplus,
							color: '#cccccc'
						}
					],
					yAxis: {
						title: '金额',
						min: 0
					},
					width: '',
					height: 280
				};
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
