<template>
	<view>
		<button>点击我</button>


	</view>
</template>


<script>
	var self;
	export default {
		components: {},
		data() {
			return {};
		},
		onLoad: function(e) {},
		computed: {},
		methods: {},

	}
</script>

<style>
	button {

		min-height: 0.5em;
		display: inline-block;
		padding: 1px 8px;
		margin: 2px 5px 5px 0px;
		cursor: pointer;
		opacity: 0.9;

		color: #FFF;
		font-size: 1em;
		letter-spacing: 1px;
		text-shadow: rgba(0, 0, 0, 0.9) 0px 1px 2px;

		background: #434343;
		border: 1px solid #242424;

		border-radius: 4px;
		box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 0px, inset rgba(255, 255, 255, 0.25) 0px 1px 0px, inset rgba(0, 0, 0, 0.25) 0px 0px 0px, inset rgba(255, 255, 255, 0.03) 0px 20px 0px, inset rgba(0, 0, 0, 0.15) 0px -20px 20px, inset rgba(255, 255, 255, 0.05) 0px 20px 20px;

		transition: all 0.1s linear;
		background: #3a617e;
	}

	.button:active {
		box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 0px, inset rgba(255, 255, 255, 0) 0px 1px 0px, inset rgba(0, 0, 0, 0.5) 0px 0px 5px, inset rgba(255, 255, 255, 0.03) 0px 20px 0px, inset rgba(0, 0, 0, 0.15) 0px -20px 20px, inset rgba(255, 255, 255, 0.05) 0px 20px 20px;

	}
</style>
