<template>
	<!-- 
      单选框
	  <view>
	  	 <my_boxt :texts="texts" @getClickItem="thisClick"></my_boxt>
	  </view>
	  
	  data() {
	  	return {
	  		icons: [ '吃饭', '红包', '请客']
	  	};
	  },
	  
	  
	  thisClick(e){
	  	console.info(e );
	  	
	  }
	
	-->

	<view>
		<view class="test_area">
			<view class="test_ans" v-for="(item, key) in texts" :key="key" @tap="clickIcon(item)">
				<view class="box_text" style="font-size: 8px;">  
				 {{ item }}  
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		texts: {
			type: Array
		}
	},
	data() {
		return {
			cicon: ''
		};
	},
	computed: {},

	methods: {
		clickIcon(id) {
			this.cicon = id;
			this.$emit('getClickItem', { id });
		}
	},
	mounted: function() {},
	onLoad(options) {}
};
</script>

<style scoped>
.test_area {
	font-size: 1upx;
	width: 100%;
	background-color: #ffffff;
	min-height: 80upx;
	overflow: auto;
}
.box_text{
	text-align: center;
	padding:3px 0;
}
.test_ans {
	background-color: #ebebeb;
	float: left;
	margin-left: 10upx;
	margin-right: 10upx;
	margin-top: 5upx;
	margin-bottom: 5upx;
	min-height: 40upx;
	width: 150upx;
	border: 1upx solid #808080;
	border-radius: 10upx;
	text-align: left; 
	position: relative;
	vertical-align: top;
	display: inline-block;
}

.test_ans:active {
	background-color: #8ac007;
}

.icon_text {
	text-align: center;
	
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
