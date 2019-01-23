<template>
	<view>
		<view class="container">
			<view class="title1">
				<view>
					<image class="icon" :src="'../../static/covers/default-10.jpeg'"></image>
					<text>{{ statement.title_category }}</text>
				</view>
				<text :class="statement.type">{{ statement.type == '0' ? '-' : '+' }} {{ statement.amount }}</text>
			</view>
			<view class="column">
				<view>
					<view class="iconfont jz-icon-fenlei"></view>
					<text>分类</text>
				</view>
				<text>{{ statement.category }}</text>
			</view>
			<view class="column">
				<view>
					<view class="iconfont jz-icon-qianbao"></view>
					<text>账户</text>
				</view>
				<text>{{ statement.asset }}</text>
			</view>

			<view class="column">
				<view>
					<view class="iconfont jz-icon-50"></view>
					<text>使用后账户余额</text>
				</view>
				<text>{{ statement.residue }}</text>
			</view>

			<view class="column">
				<view>
					<view class="iconfont jz-icon-shijian"></view>
					<text>时间</text>
				</view>
				<text>{{ statement.time }}</text>
			</view>
			<view class="column">
				<view>
					<view class="iconfont jz-icon-address"></view>
					<text>坐标</text>
				</view>
				<text>{{ statement.location }}</text>
			</view>

			<view class="column">
				<view>
					<view class="iconfont jz-icon-remark"></view>
					<text>描述</text>
				</view>
				<text>{{ statement.description }}</text>
			</view>


			<view class="button-groups">
				<view class="delete-button" @tap="del">
					<view class="iconfont jz-icon-delete"></view>
					<text>删除</text>
				</view>
				<view class="edit-button" @tap="edit">
					<view class="iconfont jz-icon-edit"></view>
					<text>编辑</text>
				</view>
			</view>


		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import helper from '../../common/helper.js';


	var a = 10;
	export default {

		components: {
			uniSegmentedControl
		},

		data() {
			return {

				statement: {
					id: 0,
					category_icon: "aa",
					title_category: "红包收入",

					/**
expend 
income
transfer
					 */
					type: "transfer",
					amount: "100",
					category: "1",
					asset: "11",
					residue: "1",
					time: "2019-01-05",
					location: "aaa",
					description: "ces"
				}
			}
		},
		computed: {
			startDate() {
				return this.date;
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			onClickItem(index) {

				uni.setNavigationBarTitle({
					title: this.items[index]
				});

				if (this.current !== index) {
					this.current = index;
				}
			},
			dateChange(e) {
				this.date = e.detail.value;

			},
			formSubmit: function(e) {
				console.log(JSON.stringify(e.detail.value))
			},
			formReset: function(e) {
				console.log("清空数据")
				this.chosen = ''
			},

			getLocation: function() {
				uni.getLocation({
					success: (res) => {

						this.address = formatLocation(res.longitude, res.latitude);
						console.info(res);
					}
				})
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			edit() {
				uni.navigateTo({
					url: "../statement/statement_add?index=" + this.statement.type + "&id=" + this.statement.id + '&amount=' + this.statement
						.amount + ''

				})
			},
			del() {
				console.info('del');
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}


		},
		onLoad(options) {
			console.info(options);
			if (options.index) {

				console.info();
			}


		}



	}
</script>
<style lang="scss" src="../../static/styles/statement/detail.scss"></style>
<style src="../../static/styles/iconfont.wxss"></style>
<style lang="less" src="../../static/styles/common.less"></style>
