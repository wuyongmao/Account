<template>
	<view>
		<view class="calendar-box">
			<view class="calendar-wrapper ">
				<view class="content">
					<view class="calendar-panel">
						<view class="date-befor" @tap="dataBefor('0','month')">
							<text class="iconfont icon-jiantou"></text>
						</view>
						<view class="calendar-panel-box">
							<view>{{canlender.year}}年</view>
							<view>{{canlender.month}}月</view>
						</view>
						<view class="date-after rollback" @tap="dataBefor('1','month')">
							<text class="iconfont icon-jiantou "></text>
						</view>
						<view class='backtoday' @tap='backtoday'>
							回到今天
						</view>
					</view>
					<view v-if="lunar" class="day-detail">
						<view>{{canlender.year+"年"+canlender.month+"月"+canlender.date+"日 （"+canlender.lunar.astro+")"}}</view>
						<view>{{canlender.lunar.gzYear+'年'+canlender.lunar.gzMonth+"月"+canlender.lunar.gzDay+"日 ("+canlender.lunar.Animal+'年)'}}
							{{canlender.lunar.IMonthCn+canlender.lunar.IDayCn}} {{canlender.lunar.isTerm?canlender.lunar.Term:''}}</view>
					</view>
					<view class="calendar-header">
						<view class="week">日</view>
						<view class="week">一</view>
						<view class="week">二</view>
						<view class="week">三</view>
						<view class="week">四</view>
						<view class="week">五</view>
						<view class="week">六</view>
					</view>
					<view class="calendar-body">
						<block v-for="(weeks , week) in canlender.weeks" :key="week">
							<view class="calender-body-date-week">
								<block v-for="(day , index) in weeks" :key="index">
									<view class="date" :class="{
										'disable':canlender.month !== day.month|| isDisableBefore(canlender.year , day.month , day.date),
										'date-current':(day.date==canlender.date||day.checked) && canlender.month == day.month &&!isDisableBefore(canlender.year , day.month , day.date),
										'lunar':lunar}"
									 @tap='selectDays(week,index,canlender.month === day.month ,isDisableBefore(canlender.year , day.month , day.date))'>
										{{day.date}}
										<view v-if="lunar" class="lunar">{{getlunar(canlender.year , day.month , day.date)}}</view>
										<view v-if="day.have" class="data-circle"></view>
									</view>
								</block>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CALENDAR from './calendar';
	export default {
		props: {
			date: {
				type: null,
				default: () => {
					return new Date();
				}
			},
			/**
			 * 打点日期
			 */
			selected: {
				type: Array,
				default: () => {
					return [];
				}
			},
			/**
			 * 是否开启阴历日期
			 */
			lunar: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否禁用今天之前的日期
			 */
			disableBefore: {
				type: Boolean,
				default: true
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				dateShow: false, // 日期是否选择
				selectDay: '', // 当前选择日期
				canlender: {
					weeks: []
				}
			};
		},
		created() {
			this.getWeek(this.date);
		},
		computed: {},
		methods: {
			/**
			 * 计算阴历日期显示
			 */
			getlunar(year, month, date) {
				return CALENDAR.solar2lunar(year, month, date).IDayCn;
			},

			/**
			 * 今天之前的日期是否可选
			 */
			isDisableBefore(year, month, date) {
				let time = year + '-' + month + '-' + date;

				let startDate = false;
				let endDate = false;
				if (this.startDate) {
					startDate = this.dateCompare(this.startDate, time);
				}
				if (this.endDate) {
					endDate = this.dateCompare(this.getDate(this.endDate, 1), time);
				}

				if (this.disableBefore) {
					if (!this.startDate) {
						if (!this.endDate) {
							return !this.dateCompare(this.getDate(new Date(), 0), time)
						} else {
							return (!this.dateCompare(this.getDate(new Date(), 0), time) ||
								endDate)
						}
					} else {
						return !this.dateCompare(this.getDate(new Date(), 0), time) || !startDate || endDate;
					}
				} else {
					if (!this.startDate) {
						if (!this.endDate) {
							return false;
						} else {
							return endDate;
						}
					} else {
						return !startDate || endDate;
					}

					// return false ;
				}


			},
			/**
			 * 返回今天
			 */
			backtoday() {
				this.getWeek(new Date());
			},

			/**
			 * 前一天|| 后一天
			 */
			dataBefor(id, types) {
				let num = 0;

				if (id === '0') {
					num = -1;
				} else {
					num = 1;
				}
				let year = this.canlender.year + '-' + this.canlender.month + '-' + this.canlender.date;
				let _date = this.getDate(year, num, types === 'month' ? 'month' : 'day');
				this.getWeek(_date);
			},
			/**
			 * 选择当前的日期
			 * week 当前的周
			 * index 点击的下标索引
			 * ischeck 是否选中
			 */
			selectDays(week, index, ischeck, isDay) {
				let canlender = this.canlender;
				if (!ischeck) return false;
				if (isDay) return false;
				//console.log(isDay);
				let month =
					canlender.weeks[week][index].month < 10 ?
					'0' + canlender.weeks[week][index].month :
					canlender.weeks[week][index].month;
				let date =
					canlender.weeks[week][index].date < 10 ?
					'0' + canlender.weeks[week][index].date :
					canlender.weeks[week][index].date;
				this.getWeek(canlender.year + '-' + month + '-' + date);
			},
			// 获取日历内容
			getWeek(dateData) {
				let selected = this.selected;
				let a = new Date();
				// console.log("im date ", a, typeof a === 'object')
				// 判断当前是 安卓还是ios ，传入不容的日期格式
				if (typeof dateData !== 'object') {
					dateData = dateData.replace(/-/g, '/');
				}
				let _date = new Date(dateData);
				let year = _date.getFullYear(); //年
				let month = _date.getMonth() + 1; //月
				let date = _date.getDate(); //日
				let day = _date.getDay(); // 天
				let canlender = [];
				// console.log(selected)
				let dates = {
					firstDay: new Date(year, month - 1, 1).getDay(),
					lastMonthDays: [], // 上个月末尾几天
					currentMonthDys: [], // 本月天数
					nextMonthDays: [], // 下个月开始几天
					endDay: new Date(year, month, 0).getDay(),
					weeks: []
				};
				// 循环上个月末尾几天添加到数组
				for (let i = dates.firstDay; i > 0; i--) {
					dates.lastMonthDays.push({
						date: new Date(year, month - 1, -i + 1).getDate() + '',
						month: month - 1
					});
				}
				// 循环本月天数添加到数组
				for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
					let have = false;
					for (let j = 0; j < selected.length; j++) {
						let selDate = selected[j].date.split('-');

						if (
							Number(year) === Number(selDate[0]) &&
							Number(month) === Number(selDate[1]) &&
							Number(i) === Number(selDate[2])
						) {
							have = true;
						}
					}
					dates.currentMonthDys.push({
						date: i + '',
						month: month,
						have
					});
				}
				// 循环下个月开始几天 添加到数组
				for (let i = 1; i < 7 - dates.endDay; i++) {
					dates.nextMonthDays.push({
						date: i + '',
						month: month + 1
					});
				}

				canlender = canlender.concat(
					dates.lastMonthDays,
					dates.currentMonthDys,
					dates.nextMonthDays
				);
				// 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
				for (let i = 0; i < canlender.length; i++) {
					if (i % 7 == 0) {
						dates.weeks[parseInt(i / 7)] = new Array(7);
					}
					dates.weeks[parseInt(i / 7)][i % 7] = canlender[i];
				}
				// 渲染数据
				this.selectDay = month + '月' + date + '日';
				this.canlender.weeks = dates.weeks;
				this.canlender.month = month;
				this.canlender.date = date;
				this.canlender.day = day;
				this.canlender.year = year;
				this.canlender.lunar = CALENDAR.solar2lunar(year, month, date);
				// console.log(this.canlender)
				this.$emit('getdate', {
					year,
					month,
					date,
					lunar: this.canlender.lunar
				});
			},
			/**
			 * 时间计算
			 */
			getDate(date, AddDayCount, str = 'day') {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/');
				}
				let dd = new Date(date);
				switch (str) {
					case 'day':
						dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
						break;
					case 'month':
						dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
						break;
					case 'year':
						dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
						break;
				}
				let y = dd.getFullYear();
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				return y + '-' + m + '-' + d;
			},
			/**
			 * 计算时间大小
			 */
			dateCompare(startDate, endDate) {
				//计划截止时间
				var startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
				//计划详细项的截止时间
				var endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
				if (startDate <= endDate) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import './mehaotian-calendar.css';

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100upx;
		background: #fff;
		z-index: 10000;
		// background: $uni-bg-color-grey;
		font-size: $uni-font-size-lg;
	}

	.calendar-box {
		width: 100%;
		box-sizing: border-box;
		transition: all 0.3s;
	}

	.calendar-wrapper {
		width: 100%;
		box-sizing: border-box;
		font-size: 26rpx;
		background: #fff;
		transition: all 0.3s;

		.content {
			.calendar-panel {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				height: 80rpx;

				.date-befor,
				.date-after {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 80rpx;
					width: 80rpx;
					text-align: center;
					line-height: 80rpx;

					&.rollback {
						transform: rotate(180deg);
					}
				}

				.calendar-panel-box {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 200upx;
				}

				.backtoday {
					position: absolute;
					right: 0;
					top: 15rpx;
					padding: 0 10rpx;
					padding-left: 20rpx;
					height: 50rpx;
					line-height: 50rpx;
					border: 1px #52b8f5 solid;
					border-right: none;
					font-size: 28rpx;
					border-top-left-radius: 50rpx;
					border-bottom-left-radius: 50rpx;
					color: #52b8f5;
					background: rgba(82, 184, 245, 0.1);
				}
			}

			.day-detail {
				padding: 20upx;
				padding-left: 30upx;
				border-top: 1px #f5f5f5 solid;
			}

			.calendar-header {
				display: flex;
				font-size: $uni-font-size-base;
				border-top: 1px #f5f5f5 solid;

				.week {
					width: 100%;
					text-align: center;
					line-height: 80rpx;
					color: #52b8f5;
				}
			}

			.calendar-body {
				display: flex;
				flex-wrap: wrap;
				font-size: $uni-font-size-base;

				.calender-body-date-week {
					display: flex;
					width: 100%;
					border-bottom: 1px #f5f5f5 solid;

					&:last-child {
						border: none;
					}

					// 日期的样式
					.date {
						position: relative;
						width: 100%;
						text-align: center;
						color: $uni-text-color;
						background: #fff;
						line-height: 100upx;
						transition: all 0.2s;

						&.lunar {
							padding: 20upx 0;
							line-height: 1.5;
						}

						// 本月可选的样式
						&.active {
							background: red;
						}

						// 本月禁止的样式
						&.disable {
							color: $uni-text-color-disable;

							.lunar {
								color: $uni-text-color-disable;
							}
						}

						// 当前选中
						&.date-current {
							background: #52b8f5;
							color: #fff;

							.lunar {
								color: #fff;
							}
						}

						.lunar {
							font-size: 20upx;
							color: #666;
						}

						.data-circle {
							position: absolute;
							// bottom: 10rpx;
							top: 10upx;
							right: 10upx;
							// margin: auto;
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							background: #ff5a5f;
							z-index: 2;
						}
					}
				}
			}
		}
	}
</style>
