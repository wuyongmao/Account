<template>
	<view>
		<text class="site__title mega">Animate.css </text>
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
				console.info(e);
			}
		},
		onLoad(options) {}
	};
</script>

<style>
	@media (min-width: 650upx) {
		.mega {
			font-size: 26rem;
			line-height: 12;
		}
	}
	@media (min-width: 650px) {
		view {
			height: 100%;
		}
	}
	.site__title {
		color: #f35626;
		font-size: 48px;
		background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-animation: hue 60s infinite linear;
	}
	@-webkit-keyframes hue {
		from {
			-webkit-filter: hue-rotate(0deg);
		}
		to {
			-webkit-filter: hue-rotate(-360deg);
		}
	}
</style>
<style href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css'></style>