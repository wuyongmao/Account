<template>
	<view class="category-component">
		 <text>分类选择</text>
     <button @tap="getCategory()">确定</button>
	</view>
</template>
<script>
	import helper from "../../common/helper.js";
	import controller from "../../common/controllers.js";
	import util from "../../common/util.js";


	export default {
		data() {
			return {
				frequent: [],
				last: 222,
				list: [],
				type: 'expend',
				already_load: false
			};
		},
		methods: { 
			getCategory(){
					
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
			    var page0 = pages[pages.length - 2];
				page0.category_id= page.last;
				
			  	uni.navigateBack({
					
				})  
				
				
				
			}
		
		}
	}
</script>

<style lang="scss" src="../../static/styles/chose_category.scss"></style>
<style lang="scss">
	.category-component {
		>view {
			overflow: hidden;
		}
	}

	.add-wallet {
		display: flex;
		justify-content: center;
		padding: 8rpx 0;
		color: #999;
		margin: 8rpx 0;
	}

	.add-wallet image {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		margin-right: 8rpx;
	}
</style>
