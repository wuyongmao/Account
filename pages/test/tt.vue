<template>
	<view class="container">
		<view class="parent">
			<view class="budget-info" @tap="showAmount(' budget.id', 'budget.source_amount ')">
				<view class="left">
					<image :src=" budget.icon_path "></image>
				</view>
				<view class="right">
					<view class="title">
						<text class="fs16 pull-left">{{ budget.name }}</text>
						<text class="balance pull-right fs14">可用余额 {{ budget.surplus }}</text>
					</view>
					<!-- 进度条 -->
					<view class="progress">
						<view class="orange" v-bind:style=" 'width:'+ budget.use_percent  +'% 100%;'"></view>
						<view class="gray" v-bind:style=" 'width:'+ budget.surplus_percent  +'% 100%;'"></view>
					</view>

					<view class="fs12 budget-amount">支出预算 {{ amount }}</view>
				</view>
			</view>
		</view>

		<view class="child">
			<view class="budget-info" :key='key' v-for="(item,key) in childs" @tap="showAmount( item.id , item.source_amount)">
				<view class="left">
					<image :src="  item.icon_path "></image>
				</view>
				<view class="right">
					<view class="title">
						<text class="fs16 pull-left">{{ item.name }}</text>
						<text class="balance pull-right fs14">可用余额 {{ item.surplus }}</text>
					</view>

					<!-- 进度条 -->
					<view class="progress">
						<view class="orange" v-bind:style=" 'width:'+ item.use_percent  +'% 100%;'"></view>
						<view class="gray" v-bind:style=" 'width:'+ item.surplus_percent  +'% 100%;'"></view>


					</view>

					<view class="fs12 budget-amount">支出预算 {{ item.amount }}</view>
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
				budget: {},
				childs: [{
					icon_path: '',
					id: 1,
					name: '生活',
					amount: 10,
					surplus: 9,
					use_percent: 10,
					surplus_percent: 80
				}, {
					icon_path: '',
					id: 2,
					name: '休闲娱乐',
					amount: 1,
					surplus: 1,
					use_percent: 70,
					surplus_percent: 80
				}],
				rootId: 0,
				curCategoryId: 0,
				amount: '0.00',
				source_amount: 0,

				header: {
					used: 100,
					surplus: 80
				},
				list: [],
			};
		}
	}
</script>

<style>

</style>
<style lang="scss" src="@/static/styles/budgets/child_budget.scss"></style>
