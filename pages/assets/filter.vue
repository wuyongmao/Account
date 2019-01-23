<template>
	<view class="content">

		<!--过滤查询   超级账单 -->
		<view class="filter-container">
			<view class="filter">
				<view @tap="showContent('time')">
					<text>{{ timeName }}</text>
					<view class="down-icon">
						<image src="../../static/assert/蚂蚁花呗.png"></image>
					</view>
				</view>
				<view @tap="showContent('category')">
					<text>{{ categoryName }}</text>
					<view class="down-icon">
						<image src="../../static/assert/余额宝.png"></image>
					</view>
				</view>
				<view @tap="showContent('asset')">
					<text>{{ assetName }}</text>
					<view class="down-icon">
						<image src="../../static/assert/基金账户.png"></image>
					</view>
				</view>
			</view>

			<view class="content">
				<view class="time-filter" v-show="filterType == 'time' ">
					<text>年份</text>
					<view class="label-list">
						<view v-for="(item,key) in filter.time.years" :key="key" class="item" v-bind:class="params.year === item ? 'active' : ''"
						 @tap="paramsConcat('year', item)">
							{{ item }}年
						</view>
					</view>

					<text>月份</text>
					<view class="label-list">
						<view v-for="(item,key) in filter.time.months" :key="key" class="item" :class="  params.month === item ? 'active' : '' "
						 @tap="paramsConcat('month', item )">
							{{ item }}月
						</view>
					</view>



				</view>



				<view class="time-filter" v-show="filterType == 'category'">
					<view class="label-list">
						<view class="item" :class="  params.category.id === '' ? 'active' : ''" @tap="paramsConcat('category',  allCategory )">
							所有分类
						</view>

						<view v-for="(item,key) in   filter.categories" :key="key" class="item" :class=" item.id === params.category.id ? 'active' : '' "
						 @tap="paramsConcat('category',item  )">
							{{item.name}}

						</view>
					</view>
				</view>


				<view class="time-filter" v-show="filterType == 'asset'">
					<view class="label-list">
						<view class="item" :class="  params.asset.id === '' ? 'active' : ''" @tap="paramsConcat('asset',  allAsset )">
							所有账户
						</view>

						<view v-for="(item,key) in   filter.assets" :key="key" class="item" :class=" item.id === params.asset.id ? 'active' : '' "
						 @tap="paramsConcat('asset',item  )">
							{{item.name}}

						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
		},
		data() {
			return {
				list: [],
				v: "hidden", //"visible"
				filterType: '',
				timeName: '时间筛选',
				categoryName: '账单分类',
				assetName: '资产账户',
				allAsset: {
					id: '',
					name: '所有账户'
				},
				allCategory: {
					id: '',
					name: '所有分类'
				},
				filter: {
					"time": {
						"years": ['2018', "2019"],
						"months": ['01', "02"],

					},
					"categories": [{
						id: '1',
						name: '一日三餐'
					}, {
						id: '2',
						name: '购物'
					}],
					"assets": [{
							id: "1",
							"name": "现金"
						}, {
							id: "2",
							"name": "支付宝"
						}

					]


				},

				params: {

					"category": {
						"id": "1",
						"name": "一日三餐"
					},
					"year": "2018",
					"month": "01",
					"asset": {
						id: "1",
						"name": "现金"
					}


				}


			}
		},
		methods: {

			showContent(filterType) {

				if (this.filterType == filterType) {
					this.filterType = ''
					this.v = "visible";
					this.$emit('paramsFilter', this.params)
				} else {
					this.filterType = filterType
					this.v = "hidden";
				}

				this.$emit('showV', this.v);


			},
			paramsConcat(key, item) {
				let value = ''
				if (key == 'year') {
					this.timeName = `${item}年`
					value = item
				} else if (key == 'month') {
					this.timeName = `${item}月`
					value = item
				} else if (key == 'category') {
					this.categoryName = item.name
					value = item.name

				} else if (key == 'asset') {
					this.assetName = item.name
					value = item.id
				}
				console.info("------");
				console.info(value);
				console.info(item);

				if (this.params[key] === value) {
					this.params[key] = ''
				} else {
					this.params[key] = item
				}

				 /* this.params.category=item */

				console.info(this.params);
				this.filterType = ''
				this.v = "visible";
				this.$emit('showV', this.v);
				this.$emit('paramsFilter', this.params)
			}

		},
		mounted: function() {
			this.$emit('getMessage', '我是父组件！')
		}
	}
</script>

<style lang="less">
	@filterHeight: 70rpx;

	.filter-container {
		position: relative;
		float: center;

		.content {
			background: #f5f5f5;
			position: absolute;
			top: @filterHeight;
			width: 100%;

			.time-filter {
				padding: 12px 12px 0 12px;
				margin-bottom: 6px;

				text {
					font-size: 12px;
					color: #999;
				}

				.label-list {
					font-size: 14px;

					.active.item {
						color: #2196F3;
					}

					>.item {
						background: white;
						display: inline-block;
						padding: 4px 8px;
						margin-right: 12px;
						color: #212121;
						border-radius: 2px;
						margin-bottom: 8px;
						border: 1px solid #efefef;
					}
				}
			}
		}


		.filter {
			height: @filterHeight;
			line-height: @filterHeight;

			background: white;
			box-shadow: 0 0 6rpx #ccc;
			display: flex;

			>view {
				flex: 1;
				text-align: center;
				font-size: 36rpx;

				>text {
					font-size: 14px;
					margin-right: 8rpx;
				}
			}

			.down-icon {
				height: @filterHeight;
				line-height: @filterHeight;
				display: inline-block;

				image {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
				}
			}

		}
	}
</style>
