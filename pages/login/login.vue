<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-mgt-10">
			<view class="uni-header-logo">
				<image src="../../static/img/user_1-active.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" v-model="logint.phone" placeholder="请输入账号" class="is-input1 " @input="BindInput"
					 data-val="phone" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input v-model="logint.password" placeholder="请输入登录密码" class="is-input1" @input="BindInput" data-val="password" />
				</view>

				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="logint.loading" @tap="defaultHandlerLogin"> {{ logint.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	 
	export default {
		components: {
			 
		},
		data() {
			return {
				logint: {
					loading: false,
					phone: "",
					password: ""
				},


				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			};
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: res => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: err => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			defaultHandlerLogin: function() {
				this.logint.loading = true;
				setTimeout((e => {
					this.logint.loading = false;
				}), 1500);
				console.log(JSON.stringify(this.logint));
			},
			BindInput: function(e) {
				var dataval = e.currentTarget.dataset.val;
				this.login[dataval] = e.detail.value;
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确'
					});
				}
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: res => {
						uni.getUserInfo({
							provider: value,
							success: infoRes => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: err => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main'
					});
				} else {
					uni.navigateBack();
				}
			}
		},
		onLoad() {
			this.initPosition();
			this.initProvider();
		}
	};
</script>

<style>
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		width: 85%;
		margin: 0 auto;
	}

	.loginbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
</style>
