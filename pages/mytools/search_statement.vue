<template>
	<view class="content">
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<input
						type="text"
						class="weui-search-bar__input"
						placeholder="输入关键字:地址 备注 金额"
						v-model="inputVal"
						:focus="inputShowed"
						@input="inputTyping"
					/>
					<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
					</view>
				</view>
			</view>
			<view class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput"
				>取消</view
			>
		</view>
		<view class="weui-cells searchbar-result" v-if="inputVal.length > 0">
			<view class="uni-list">
				<view
					class="uni-list-cell"
					hover-class="uni-list-cell-hover"
					v-for="(value, key) in todayconsum"
					:key="key"
				>
					<statement :statement="value" />
				</view>
			</view>
		</view>
		<view v-if="inputVal.length == 0" class="orders">
			<my_signboard :title="'暂未查询相关数据'"></my_signboard>
		</view>
	</view>
</template>

<script>
import uniIcon from '../../components/uni-icon.vue';
export default {
	data() {
		return {
			todayconsum: [
				{
					id: 1,
					date: '2019-01-15',
					amout: 10,
					type: 'income',
					descp: '早餐',
					category_icon: 'tubiaozhizuomoban'
				},
				{
					id: 2,
					date: '2019-01-15',
					amout: 12,
					type: 'expend',
					descp: '中餐',
					category_icon: 'tubiaozhizuomoban'
				}
			],
			inputShowed: false,
			inputVal: ''
		};
	},
	components: {
		uniIcon
	},
	methods: {
		showInput() {
			this.inputShowed = true;
		},
		hideInput() {
			this.inputVal = '';
			this.inputShowed = false;
		},
		clearInput() {
			this.inputVal = '';
		},
		inputTyping(e) {
			console.log('inputTyping');
			console.info(e.detail.value);

			console.log(e);
			this.inputVal = e.mp.detail.value;
		}
	}
};
</script>

<style scoped>
.content {
	height: 100%;
	background: radial-gradient(circle at center 100%, white, sandybrown);
}

.weui-search-bar__form {
	position: relative;
	flex: auto;
	border-radius: 5px;
	background: #fff;
	border: 1rpx solid #e6e6ea;
	margin-bottom: 5upx;
}
</style>
