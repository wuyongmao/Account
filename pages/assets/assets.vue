<template>
	<!-- 资产 -->
	<view class="container">
		<view class="wallet-header">
			<view class="assets">
				<view>
					<view class="header-text">{{ netWorth }}</view>
					<view class="desc-text">净资产</view>
				</view>
				<view>
					<view class="header-text">{{ totalAssets }}</view>
					<view class="desc-text">总资产</view>
				</view>
			</view>
			<view class="yesterday-amount">
				<view>
					<text>总负债：</text> <text>{{ totalDebt }}</text>
				</view>
				<view>
					<text>昨日结余：</text> <text>{{ yesterdayAmount }}</text>
				</view>
				<view>
					<text>近七日日均消费：</text> <text>{{ seventAmount }}</text>
				</view>
				<view>
					<text>近一月日均消费：</text> <text>{{ monthAmount }}</text>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view
				class="uni-list-cell uni-collapse"
				v-for="(list, index) in lists"
				:key="index"
				:class="index === lists.length - 1 ? 'uni-list-cell-last' : ''"
			>
				<view
					class="uni-list-cell-navigate uni-navigate-bottom"
					hover-class="uni-list-cell-hover"
					:class="list.show ? 'uni-active' : ''"
					@click="trigerCollapse(index)"
				>
					<view class="uni-media-list-logo">
						<my_icon :type="'tubiaozhizuomoban'" />
					</view>
					<view class="uni-media-list-body"> {{ list.title }} </view>
					<view class="uni-media-list-right">
						<view class="uni-media-list-text-bottom uni-ellipsis">{{
							list.amount
						}}</view>
					</view>
				</view>

				<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						v-for="(item, key) in list.item"
						:key="key"
						:class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''"
					>
						<view class="uni-media-list-logo"> <view class="flex:1"></view> </view>
						<view class="uni-media-list-logo">
							<my_icon :type="'tubiaozhizuomoban'" />
						</view>
						<view class="uni-media-list-text-bottom " @click="clickItem(item)">
							{{ item }}
						</view>
						<view class="uni-media-list-right">
							<view class="uni-media-list-text-bottom uni-ellipsis">
								{{ lists[index].itemAmount[key] }}</view
							>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>



export default {
	data() {
		return {
			wallets: [],
			netWorth: '0.00',
			totalAssets: '0.00',
			totalDebt: '0.00',
			yesterdayAmount: '0.00',
			seventAmount: '0.00',
			monthAmount: '0.00',

			title: '资产',
			lists: [
				{
					title: '现金账户',
					show: false,
					item: ['现金', '银行卡'],
					itemAmount: [1, 0],
					amount: 80.0
				},
				{
					title: '虚拟账户',
					show: false,
					item: ['支付宝', '微信钱包'],
					itemAmount: [1, 0],
					amount: 100.0
				},
				{
					title: '负债账户',
					show: false,
					item: ['蚂蚁花呗', '信用卡'],
					itemAmount: [1, 0],
					amount: 50.0
				},
				{
					title: '投资账户',
					show: false,
					item: ['基金账户', '余额宝', '股票账户'],
					itemAmount: [1, 0, 2],
					amount: 10.0
				}
			]
		};
	},
	computed: {},
	components: { 
	},
	methods: {
		asynf(url) {
			return new Promise(res => {
				uni.request({
					url: url,
					success: result => {
						res(result);
					},
					fail: e => {
						res(e);
					}
				});
			});
		},
		async clickItem(e, index) {
			let err, res;
			 /* let orderInfo = await this.getOrderInfo(e.id);*/
			uni.navigateTo({
				url: '/pages/assets/assets_detail'
			});
		},
		getOrderInfo(e) {
			let url = controller.websiteUrl;
			return new Promise(res => {
				uni.request({
					url: url,
					success: result => {
						res(result);
					},
					fail: e => {
						res(e);
					}
				});
			});
		},

		trigerCollapse(e) {
			for (let i = 0, len = this.lists.length; i < len; ++i) {
				if (e === i) {
					this.lists[i].show = !this.lists[i].show;
				} else {
					this.lists[i].show = false;
				}
			}
		}
	}
};
</script>

<style lang="scss" src="../../static/styles/asset.scss"></style>
