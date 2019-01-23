<template>


	<view class="container">
		<view class="header">
			<view class="amount">{{ header.left }}</view>
			<view class="subtitle">结余</view>
		</view>
		<view class="surplus">
			<view class="all-income income">总收入： {{ header.income }}</view>
			<view class="all-expend expend">总支出： {{ header.expend }}</view>
		</view>

		<view class="content">
			<view v-for="(item,key) in  list " :key="key">

				<view class="column" @tap="getList('item.year ', 'item.month ', 'index ')">
					<view class="two-column">
						<view class="time align-right">
							<text>{{ item.month }}月</text>
							<text>{{ item.year }}年</text>
						</view>
						<view class="amount">
							<text class="income">流入： {{ item.income_amount }}</text>
							<text class="expend">流出： {{ item.expend_amount }}</text>
						</view>
					</view>
					<view class="left-amount align-right">
						<view>
							<view>{{ item.surplus }}</view>
							<view>结余</view>
						</view>
						<text class="iconfont jz-icon-arrow-down-copy" v-if="item.hidden "></text>
					</view>
				</view>

			</view>
		</view>


		<my_filter @paramsFilter="setParams" @showV="setV"></my_filter>

		<view class="uni-list" v-if="listvisible=='visible'">
			<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
				<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
				 @click="trigerCollapse(index)">

					<view>

						<view class="time align-left">
							<text> {{'[ '+list.month  }}月 {{ ']-' }}</text>
							<text class="income">流入{{ list.income_amount }}</text>
						</view>
						<view class="amount">

							<text> {{list.year}}年 {{ '-' }}</text>
							<text class="expend">流出{{ list.expend_amount }}</text>
						</view>

					</view>
					<view class="uni-media-list-right">
						<view class="uni-media-list-text-top">结余</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{list.amout}} </view>
					</view>




				</view>


				<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key" :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
						<statement :statement='item' />


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
				listvisible: "visible",  

				lists: [{
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"income_amount": 110,
					"expend_amount": 12,
					"descp": "中餐",
					"surplus": 100,
					"month": "1",
					"year": "2019",
					"show": false,
					item: [{
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

					}]

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"income_amount": 110,
					"expend_amount": 12,
					"descp": "中餐",
					"surplus": 100,
					"month": "1",
					"year": "2019",
					"show": false,
					item: [{
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

					}]

				}],
				header: {
					income: 0,
					expend: 0,
					left: 0
				},
				list: [],
				params: {},
				statements: [],
				cacheStatement: {}
			};
		},
		methods: {
			setV(a) {
				console.info(a);
				this.listvisible = a;
			},
			setParams(params) {
				this.params = params
				console.info("zhe ");
				console.info(params);

			},
			getList(year, month, index) {
				let value = !this.list[index].hidden
				this.list[index]['hidden'] = value
				 /* this.statement(year, month, index) */
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
	}
</script>

<style>
	.uni-navigate-bottom {

		height: 50px;
		width: 100%;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 2px rgba(10, 16, 20, .24), 0 0 2px rgba(10, 16, 20, .12);
		box-sizing: border-box;
		position: relative;

	}

	.uni-list {
		visibility: visible;
		/*visible  hidden*/

	}
</style>
<style lang="scss" src="static/styles/super_statement.scss"></style>

<style src="../../static/styles/iconfont.wxss"></style>
<style lang="less" src="../../static/styles/common.less"></style>
