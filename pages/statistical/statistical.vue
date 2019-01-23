<template>
	<view class="container">
		<view class="content">
			<calendar :selected="selected" :lunar="true" :disable-before="false" :start-date="'2016-1-13'" :end-date="'{{nowDate}}'"
			 @getdate="getdate" />
		</view>


		<view class="statement-list">
			<view class="action-row">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
				<!-- current ===1   -->
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="uni-flex uni-row">
						<view class="text" style="flex: 1;background:#00BFFF">1.查看期间单笔明细</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="flex: 1;background:#00BFFF;">2.查看期间分类明细</view>
					</view>

				</view>

				<view v-show="current === 1">
					<view class="left-amount">
						<text class="income income-border">收入: {{expend}} -</text>
						<text class="expend expend-border">-支出: {{income}}-</text>
						<text class="surplus surplus-border">-结余: {{surplus}} </text>
					</view>


					<view class="uni-list">

						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in todayconsum" :key="key">
							 <statement :statement='value'/>
						</view>
						
						
						
					</view>





				</view>
				<view v-show="current === 2">
					 <view class="uni-list">
					 	<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
					 		<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
					 		 @click="trigerCollapse(index)">
					 			<view class="uni-media-list-logo">
					 				 <my_icon :type='"tubiaozhizuomoban"'  />
					 			</view>
					 			<view class="uni-media-list-body">
					 				{{list.title}}
					 			</view>
					 			<view class="uni-media-list-right">
					 				<view class="uni-media-list-text-bottom uni-ellipsis">{{list.amount}}</view>
					 			</view>
					 		</view>
					 
					 		<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
					 			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key" :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
					 				<view class="uni-media-list-logo">
					 					  <view class="flex:1"></view>
					 				</view>
					 					<view class="uni-media-list-logo">
					 					 <my_icon :type='"tubiaozhizuomoban"'  />
					 				</view>
					 				<view class="uni-media-list-text-bottom " @click="clickItem(item)"> {{item}} </view>
					 				<view class="uni-media-list-right">
					 					<view class="uni-media-list-text-bottom uni-ellipsis"> {{lists[index].itemAmount[key]}}</view>
					 				</view>
					 
					 			</view>
					 		</view>
					 	</view>
					 </view>
					 
					 
					 
					 
					 
					 




				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import calendar from '../../components/mehaotian-calendar/mehaotian-calendar.vue';
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
	import helper from "../../common/helper.js";
	import controller from "../../common/controllers.js";
	import util from "../../common/util.js";

	import empty from "@/components/mycom/empty.vue"; 
	import my_icon from "@/components/mycom/my_icon.vue"; 
    import statement from '../statement/statement.vue';
	
	
	const nowDate = helper.now;
	const newDate = helper.now;


	export default {
		components: {
			calendar,statement,empty,
			uniSegmentedControl,my_icon
		},
		data() {
			return {
				"surplus": 980,
				"income": 1000,
				"expend": 20,
                 "lists":[{
						title: "现金账户",
						show: false,
						item: ["现金", "银行卡"],
						itemAmount: [1, 0],
						amount: 80.00
					},
					{
						title: "虚拟账户",
						show: false,
						item: ["支付宝", "微信钱包"],
						itemAmount: [1, 0],
						amount: 100.00
					},
					{
						title: "负债账户",
						show: false,
						item: ["蚂蚁花呗", "信用卡"],
						itemAmount: [1, 0],
						amount: 50.00
					},
					{
						title: "投资账户",
						show: false,
						item: ["基金账户", "余额宝", "股票账户"],
						itemAmount: [1, 0, 2],
						amount: 10.00
					}
				],

				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				nowDate: nowDate,
				newDate: newDate,

				items: ['11.01~01.01', '单笔明细', '分类明细'],
				current: 1,


				todayconsum: [{
					"id": 1,
					"date": "2019-01-15",
					"amout": 10,
					"type": "income",
					"descp": "早餐","category_icon":"tubiaozhizuomoban"

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"descp": "中餐","category_icon":"tubiaozhizuomoban"

				}],
				weekconsum: [{
					"id": 1,
					"date": "2019-01-15",
					"amout": 10,
					"type": "income",
					"descp": "早餐","category_icon":"tubiaozhizuomoban"

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"descp": "中餐","category_icon":"tubiaozhizuomoban"

				}],
				selected: [{
						date: '2018-12-26'
					},
					{
						date: '2019-02-27'
					}
				]
			};
		},
		onLoad: () => {
			console.info(helper.now);
			console.info(util.getDayByDate(nowDate.toString()));

		},
		methods: {
			asynf(url) {
				return new Promise((res) => {
					uni.request({
						url: url,
						success: (result) => {
							res(result);
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			},

			async clickItem(e, index) {
				console.info("-------------" + e);
				let err, res;
				uni.navigateTo({
					url: "/pages/assets/assets_detail"
				})

			},
			getOrderInfo(e) {
				let url = controller.websiteUrl;
				return new Promise((res) => {
					uni.request({
						url: url,
						success: (result) => {
							res(result);
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			}

			,
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].show = !this.lists[i].show;
					} else {
						this.lists[i].show = false;
					}
				}

			}
		,
			getdate(d) {
				console.log(d);

				var y = d.year;
				var m = d.month;
				var dd = d.date;
				var ms = '';
				if (m < 10) {
					ms = '0' + m;
				} else {
					ms = '' + m;
				}

				console.info(y + '-' + ms + '-' + dd);
				let newDate = y + '-' + ms + '-' + dd;
				console.info(newDate);
				console.info(nowDate);

				var m1 = util.getMonthByDate(newDate.toString());
				var m2 = util.getMonthByDate(nowDate.toString());
				var d1 = util.getDayByDate(newDate.toString());
				var d2 = util.getDayByDate(nowDate.toString());
				var ti = '';

				if (newDate.toString() > nowDate.toString()) {
					ti = m2 + '.' + d2 + '~' + m1 + '.' + d1;
				} else {
					ti = m1 + '.' + d1 + '~' + m2 + '.' + d2;
				}
				this.items[0] = ti;
				this.onClickItem(0);
				setTimeout(() => {
					this.onClickItem(1);
				}, 10);

			},
			onClickItem(index) {
				this.current = index;
				uni.setNavigationBarTitle({
					title: this.items[index]
				});

				if (this.current !== index) {
					this.current = index;
				}
			},
			upper: function(e) {
				console.log(e);
				console.info("upper----");
			},
			lower: function(e) {
				console.info("low----");
				console.log(e);

			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			}


		}
	};
</script>
<style>
	.action-row {
		background: #007AFF;
		opacity: 0.8;
		width: 100%;

	}

	.scroll-Y {
		height: 300upx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
</style>
<style src="../../static/styles/iconfont.wxss"></style>
<style lang="less" src="../../static/styles/common.less"></style>
