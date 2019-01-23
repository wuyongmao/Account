<template>
<view class="container">
	<form @submit="formSubmit">
		<view class="container">
			<view class="column money">
				<text>余额</text>
				<input class="pull-right money-input expend" placeholder="0.00" v-model="amount " name="amount" type="digit" />
			</view>
			<view class="zan-btns">
				<button class="zan-btn ljt-btn" formType="submit">保存</button>
			</view>
		</view>
	</form></view>
</template>




<script>
	import helper from "../../common/helper.js";
	import controller from "../../common/controllers.js";
	import util from "../../common/util.js";


	export default {
		data() {
			return {
				amount: 0,
				asset_id: 0
			};
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
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})
			},
			getList(year, month, index) {
				let value = !this.list[index].hidden
				this.list[index]['hidden'] = value
				this.statements(year, month, index)
			},
			async formSubmit(e) {
				let amount = e.detail.value.amount;
				console.log(JSON.stringify(e.detail.value));
			}


		}
	}
</script>

<style lang="scss" src="../../static/styles/statement/statement.scss"></style>
