<template>
	
	<view class="container">
		<view class="header">
			<view class="amount">
				<text @tap="showAmountModal">
					<text>{{ amount }}</text>
					<text class="iconfont jz-icon-edit"></text>
				</text>
				<label class="btn transfer-btn" @tap="transfer">
					转账
				</label>
			</view>
			<view class="subtitle">余额</view>
		</view>
		<view class="surplus">
			<view class="all-income income">收入： {{ header.income }}</view>
			<view class="all-expend expend">支出： {{ header.expend }}</view>
		</view>
         

		<view class="uni-list">
			<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
				<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
				 @click="trigerCollapse(index)">
  
					<view>

						<view class="time align-left">
							<text  >  {{'[   '+list.month  }}月 {{  ']-' }}</text> 
							<text class="income">流入{{ list.income_amount }}</text>
						</view>
						<view class="amount">

							<text  >   {{list.year}}年 {{  '-' }}</text>
							<text class="expend" >流出{{ list.expend_amount }}</text>
						</view>

					</view>
					<view class="uni-media-list-right">
						<view class="uni-media-list-text-top">结余</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{list.amout}} </view>
					</view>

				</view>


				<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key"
					 :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
       	               <statement :statement='item'/>
						   
 
					</view>
				</view>
			</view>
		</view>





	</view>


	</view>
</template>

<script>
	import helper from "../../common/helper.js";
	import controller from "../../common/controllers.js";
	import util from "../../common/util.js"; 

	import empty from "@/components/mycom/empty.vue"; 
    import statement from '../statement/statement.vue';
	export default {
		data() {
			return {
				asset_id: 0,
				header: {
					income: '0.00',
					expend: '0.00',
					surplus: '0.00'
				}, 
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
					"descp": "早餐","category_icon":"tubiaozhizuomoban"

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"descp": "中餐","category_icon":"tubiaozhizuomoban"

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
					"descp": "早餐","category_icon":"tubiaozhizuomoban"

				}, {
					"id": 2,
					"date": "2019-01-15",
					"amout": 12,
					"type": "expend",
					"descp": "中餐","category_icon":"tubiaozhizuomoban"

				}]

				}],
				amount: '1.00'
			};
		},

		components: { 
			empty,statement
		},computed: {
			showEmpty() {
				return true;
			}
		},
		methods: {
			transfer() {
				uni.navigateTo({
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})

			},
			showHidden(idx) {
				let value = !this.list[idx].hidden
				this.list[idx]['hidden'] = value
			},
			showStatement(id) {
				uni.navigateTo({
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})
			},
			showAmountModal() {
				uni.navigateTo({
					url: "assets_form?id=2&amount=" + this.amount

				})
			},
			getList(year, month, index) {
				let value = !this.list[index].hidden
				this.list[index]['hidden'] = value
				this.statements(year, month, index)
			},
			async statements(year, month, index) {
				let params = {
					year: year,
					month: month,
					asset_id: this.asset_id
				}
				const data = (await wxRequest.Get('super_statements/list', params)).data
				this.list[index].childs = data
				this.$apply()
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
 
	
</style>

<style lang="scss" src="../../static/styles/assets/asset_detail.scss"></style>
<style src="../../static/styles/iconfont.wxss"></style>
<style lang="less" src="../../static/styles/common.less"></style>
