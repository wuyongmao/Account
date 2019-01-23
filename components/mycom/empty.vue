<template>
	<view class="content">
		<view class="empty">
			<view class="iconfont jz-icon-nomoredata empty-no-more"></view>
			<view class="title fs14">{{ title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String
	},
	data() {
		return {};
	},
	methods: {},
	mounted: function() {
		this.$emit('getMessage', '我是父组件！');
	}
};
</script>

<style lang="less">
.empty {
	text-align: center;

	.empty-no-more {
		font-size: 240rpx;
		color: #1976d2;
	}

	image {
		width: 250rpx;
		height: 250rpx;
	}

	.title {
		color: #999;
	}
}
</style>
<style src="../../static/styles/iconfont.wxss"></style>
