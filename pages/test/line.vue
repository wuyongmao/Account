<template>
<!-- 	虚线box阴影 -->
	
	
	<view class="container">
		<view>
			<view class="effect"> </view>

		</view>

		<view class="line_01">

		</view>
		<view class="line_02">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icons: ['tuan', 'tuan', 'tuan']
			};
		},
		computed: {},

		methods: {
			thisClick(e) {
				consviewe.info(e);
			}
		},
		onLoad(options) {}
	};
</script>

<style>
	.line_01 {
		height: 1px;
		border: none;
		position: absolute;
		width: 100%;
		top: 50upx;
		border-top: 1px dashed #1E90FF;
	}

	.line_02 {
		position: absolute;
		top: 310upx;
		width: 100%;
		border: 1px dashed #1E90FF;
	}

	.effect:after,
	.effect:before {
		content: "effect";
		align-content: center;
		text-align: center;
		position: absolute;
		width: 90%;
		height: 100upx;
		top: 10%;
		left: 20px;
		right: 20px;
		background: #fff;
		border-radius: 15%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

	}
</style>
