<template>
	<view class="test_area"> 
		<view class="test_ans"> <view class="test_desc"> 11111</view> </view>
		<view class="test_ans">
			<view class="test_desc"> <my_icon :type="'tubiaozhizuomoban'" :wh="'3'" /> 
			<view class="">aaa</view>
			
			</view>
		
		
		</view> 
		 
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},

	methods: {},
	onLoad(options) {}
};
</script>

<style scoped>
.test_area {
	font-size: 1upx;
	width: 100%;
	background-color: #ffffff;
	min-height: 120upx;
	overflow: auto;
}
.test_ans {
	background-color: #ebebeb;
	float: left;
	margin-left: 10upx;
	margin-right: 10upx;
	margin-top: 5upx;
	margin-bottom: 5upx;
	min-height: 100upx;
	width: 100upx;
	border: 1upx solid #808080;
	border-radius: 10upx;
	text-align: left;
	cursor: hand;
	position: relative;
	vertical-align: top;
	display: inline-block;
}

.test_ans:active {
	background-color: #8ac007;
}

.test_desc {
	width: 80upx;
	margin-left: 10upx;
	margin-top: 10upx;
	float: left;
	word-break: break-all;
	line-height: 1.5;
}
</style>
