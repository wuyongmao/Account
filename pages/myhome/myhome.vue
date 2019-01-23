<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face" @tap="gotoLogin">

					<image :src="userinfo.face"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">记账天数:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<image src="../../static/myhome/setting.png"></image>
			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
					<view class="icon">
						<view class="badge" v-if="row.badge>0">{{row.badge}}</view>
						  <image :src="'../../static/myhome/'+row.icon"></image> 
					</view>
					{{row.name}}
				</view>
			</view>
		</view>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell-divider">

				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="setAssets()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />
					<view class="uni-list-cell-navigate uni-navigate-right">
						资产类型分类
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="setExpend()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />

					<view class="uni-list-cell-navigate uni-navigate-right">
						支出分类管理
					</view>
				</view>



				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="setIncome()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />
					<view class="uni-list-cell-navigate uni-navigate-right">
						收入分类管理
					</view>
				</view>


				<view class="uni-list-cell-divider">

				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="clearStorm()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />
					<view class="uni-list-cell-navigate">
						清除缓存
						<uni-badge type="danger"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="thisAbourt()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />
					<view class="uni-list-cell-navigate">
						关于记账
						<uni-badge type="success" text="1.0.0"></uni-badge>
					</view>
				</view>

				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="setIncome()">
					<my_icon :type='tubiaozhizuomoban' :wh="wh" />
					<view class="uni-list-cell-navigate uni-navigate-right">
						反馈与建议
					</view>
				</view>



			</view>
		</view>

	</view>
</template>
<script>
	import uniBadge from '../../components/uni-badge.vue';
	import my_icon from '@/components/mycom/my_icon.vue';
	export default {
		data() {
			return {
				isH5Plus: true,

				userinfo: {},
				tubiaozhizuomoban: 'tubiaozhizuomoban',
				wh: '3',
				orderTypeLise: [
					{
						name: '快捷查询',
						icon: 'search2.png',
						badge: 0,
						url: "/pages/mytools/search_statement"
					}, {
						name: '超级报表',
						icon: 'supur.png',
						badge: 0,
						url: "/pages/mytools/super_statement"
					},
					{
						name: '消费报表',
						icon: 'pie.png',
						badge: 0,
						url: "/pages/mytools/expend_chart"
					},
					{
						name: '类别报表',
						icon: 'zhu.png',
						badge: 0,
						url: "/pages/mytools/category_chart"
					},
					{
						name: '预购清单',
						icon: 'pre.png',
						badge: 0,
						url: "/pages/mytools/super_statement"
					}
				]
			};
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				this.userinfo = {
					face: '../../static/myhome/face.jpeg',
					username: '吴永茂',
					integral: '1435'
				};
			},
			toOrderType(index) {
				uni.navigateTo({
					url: this.orderTypeLise[index].url
				})

			},
			toPage(list_i, li_i) {
				uni.showToast({
					title: this.severList[list_i][li_i].name
				});
			},
			gotoLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},


			loginStatus() {},
			setAssets() {
				console.info('资产分类');
			},
			setExpend() {
				console.info('支出分类');
			},
			setIncome() {
				console.info('消费分类');
			},
			clearStorm() {
				console.info('清除缓存');
			},
			thisAbourt() {
				console.info('abourt');
			}
		},
		components: {
			uniBadge,
			my_icon
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.uni-media-list-logo image {
		height: 100%;
		width: 100%;
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color: #1976d2;

		width: 92%;
		height: 30vw;
		padding: 0 4%;
		display: flex;
		align-items: center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 15px;

				.username {
					width: 100%;
					color: #fff;
					font-size: 20px;
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 10px;
					height: 20px;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 10px;
					font-size: 12px;
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.hover {
		background-color: #eee;
	}

	.orders {
		background-color: #1976d2; //#ff6364
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 20px);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 12px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 13px;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 10px;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					image {
						width: 7vw;
						height: 7vw;
					}
				}
			}
		}
	}

	.list {
		width: 100%;
		border-bottom: solid 13px #f1f1f1;

		.li {
			width: 92%;
			height: 50px;
			padding: 0 4%;
			border-bottom: solid 1px #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0;
			}

			.icon {
				flex-shrink: 0;
				width: 25px;
				height: 25px;

				image {
					width: 25px;
					height: 25px;
				}
			}

			.text {
				padding-left: 10px;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 20px;
				height: 20px;
			}
		}
	}
</style>
