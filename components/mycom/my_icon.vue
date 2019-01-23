<template>
	<!--  <svg class="icon"  v-bind:style="'height:'+wh+'em;width:'+wh+'em;'"  >
    <use v-bind:xlink:href="'#icon-'+type"></use>
  </svg> -->
	<view>
		<uni-icon :type="'person'" :color="'red'" size="24"></uni-icon>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icon.vue'



	export default {
		props: {
			type: String,
			wh: {
				default: '2.5'

			}
		},
		data() {
			return {};
		},
		components: {
			uniIcon
		},
		methods: {},
		mounted: function() {
			//	this.$emit('getMessage', '我是父组件！')
		}
	};
</script>

<style lang="less">

</style>
<style src="../../static/styles/iconfont.wxss">
</style>
