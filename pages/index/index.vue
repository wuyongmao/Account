<template>
	<view class="content">
		<my_heart />
		<view class="statement-list">
			<view class="header">
				<view class="today"> <text class="site__title mega">今天支出:<text class="dexpend">1000.00</text></text></view>
				<view class="month"><text class="site__title mega">当月支出:<text class="mexpend">100.00</text></text></view>
			</view>
			<view class="action-row">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 2">
					<view class="my_signboard1">
						<my_signboard :title="'今天还没有预购'" @getMessage="showMsg"></my_signboard>
					</view>

				</view>
				<view v-show="current === 0">
					<my_signboard :title="'今天还没有记账哦~~'" v-if="todayList.length == 0"></my_signboard>

					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in todayList" :key="key">
							<statement :statement='value' />
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					<my_signboard :title="'单月还没有记账哦~~'" v-if="monthList.length == 0"></my_signboard>
					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in monthList" :key="key">
							<statement :statement='value' />
						</view>
					</view>
				</view>
			</view>
		</view>
<image src="../../static/settings/add.png" class="adds" @tap="goAdd"></image>

	 
		



	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"

	var a = 10;
	export default {
		computed: {
			...mapState([
				'forcedLogin', 'hasLogin',
				'userName'
			])
		},
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				todatySum: 2.0,
				monthSum: 10.2,
				yusuanSum: 10.0,
				todayList: [{
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

				}, {
					"id": 3,
					"date": "2019-02-15",
					"amout": 112,
					"type": "transfer",
					"descp": "转账",
					"category_icon": "tubiaozhizuomoban"

				}],
				monthList: [{
					"id": 1,
					"date": "2019-01-15",
					"amout": 10,
					"type": "income",
					"descp": "早餐",
					"category_icon": "tubiaozhizuomoban"

				}, {
					"id": 21,
					"date": "2019-02-15",
					"amout": 1112,
					"type": "income",
					"descp": "购物",
					"category_icon": "tubiaozhizuomoban"

				}],
				items: ['当天账单', '当月账单', '预购清单'],
				current: 0
			}
		},
		onShow: function() {},
		methods: {
			showMsg(d) {},
			goAdd() {
				uni.navigateTo({
					url: '../statement/statement_add'
				})
			},
			async onClickItem(e) {
				if (this.current !== e) {
					this.current = e;
				}
				/* let todayList = await this.gettodayListList(e.id); */
			},
			async clickItem(e) {
				let err, res;
				/* let todayList = await this.gettodayListList(e.id); */
			},
			showStatementDetail(id) {
				uni.navigateTo({
					url: '/pages/statement/detail?id=' + id
				})
			}
		},
		async onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400);
			/* let aaa = await conttroller.gettodayListList(1231321312); */
			var pp = {
				'openid': '1111'
			};
			/* let aaa = await conttroller.getData('gettodayListList', pp); */
			this.todatySum = 0;
			for (let i = 0; i < this.todayList.length; i++) {
				this.todatySum = this.todatySum + this.todayList[i].amout;
			}
			if (!this.hasLogin == false) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
</script>
<style scoped>
	.header {
		width: 95%;
		height: 100upx;
		box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
		margin-right: 18upx;
		align: center;
		position: relative;
		/* 	top: 480upx;
		left: 20upx; */
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1),
			0 6px 6px rgba(0, 0, 0, 0.1),
			0 8px 8px rgba(0, 0, 0, 0.1),
			0 12px 12px rgba(0, 0, 0, 0.1);
	}

	.header .today {
		position: absolute;
		margin: 10upx;
		padding: 10upx;
		width: 50%;
		bottom: 1upx;
		left: 10upx;
		background: deepskyblue;
		text-align: left;
		border-radius: 10%;
		opacity: 0.7;

	}


	.header .month {
		position: absolute;
		margin: 10upx;
		padding: 10upx;
		width: 50%;
		bottom: 1upx;
		right: 10upx;
		text-align: right;
		background: deepskyblue;
		border-radius: 10%;
		opacity: 0.7;
	}


	.action-row {
		background: #007AFF;
		opacity: 0.8;
		width: 100%;


	}

	.adds {
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 70upx;
		right: 20upx;
		background: #00BFFF;
		border-radius: 100%;
		opacity: 0.7;
	}

	/* 动态字体 */
	 
</style>
