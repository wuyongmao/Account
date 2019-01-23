<template>
	<view class="uni-media-list" @tap="showStatementDetail(statement.id)">
		<view class="uni-media-list-logo">
			<my_icon :type="statement.category_icon" :wh="'3'" />
		</view>
		<view class="uni-media-list-body">
			<view class="uni-media-list-text-top">{{ statement.descp }}</view>
			<view class="uni-media-list-text-bottom uni-ellipsis"> {{ statement.date }}</view>
		</view>
		<view class="uni-media-list-right">
			<view class="uni-media-list-text-top">
				<text :class="statement.type"> {{ statement.amout }} </text></view
			>
		</view>
	</view>
</template>
<script>

export default {
	props: {
		statement: {
			type: Object
		}
	},
	data() {
		return {};
	},
	methods: {
		showStatementDetail(id) {
			uni.navigateTo({
				url: '/pages/statement/detail?id=' + id
			});
		}
	},
	components: {
		 
	},
	mounted: function() {
		 /* 	this.$emit('getMessage', '我是父组件！') */
	}
};
</script>
<style lang="less" src="../../static/styles/common.less"></style>
