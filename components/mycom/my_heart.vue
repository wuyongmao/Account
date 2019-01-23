<template>
	<view class="container">
		<view class="heart">
			<!-- line 1 -->
			<view></view>
			<text></text>
			<text></text>
			<view></view>
			<view></view>
			<view></view>
			<text></text>
			<text></text>
			<view></view>

			<!-- line 2 -->
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<view></view>
			<text></text>
			<text></text>
			<text></text>
			<text></text>

			<!-- line 3 -->
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>

			<!-- line 4 -->
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>

			<!-- line 5 -->
			<view></view>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<view></view>

			<!-- line 6 -->
			<view></view>
			<view></view>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<text></text>
			<view></view>
			<view></view>

			<!-- line 7 -->
			<view></view>
			<view></view>
			<view></view>
			<text></text>
			<text></text>
			<text></text>
			<view></view>
			<view></view>
			<view></view>

			<!-- line 8 -->
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<text></text>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped>
	.container {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(lightpink, white);
	}

	.heart {
		display: grid;
		grid-gap: 2px;
		grid-template-columns: repeat(9, 1fr);
	}

	.heart > view {
		width: 1em;
		height: 1em;
		font-size: 30px;
	}

	.heart text {
		background-color: red;
		animation: animate 5s infinite ease-out;
		filter: opacity(0);
		
		width: 1em;
		height: 1em;
		font-size: 30px;
		
	}

	.heart text:nth-of-type(2n) {
		animation-delay: 0.2s;
	}

	.heart text:nth-of-type(3n) {
		animation-delay: 0.3s;
	}

	.heart text:nth-of-type(4n) {
		animation-delay: 0.4s;
	}

	.heart text:nth-of-type(5n) {
		animation-delay: 0.5s;
	}

	.heart text:nth-of-type(6n) {
		animation-delay: 0.6s;
	}

	.heart text:nth-of-type(7n) {
		animation-delay: 0.7s;
	}

	.heart text:nth-of-type(8n) {
		animation-delay: 0.8s;
	}

	.heart text:nth-of-type(9n) {
		animation-delay: 0.9s;
	}

	.heart text:nth-of-type(10n) {
		animation-delay: 1.0s;
	}

	.heart text:nth-of-type(11n) {
		animation-delay: 1.1s;
	}

	@keyframes animate {
		0% {
			filter: opacity(0);
			transform: translateY(-10em);
		}
	15%,
		25%,
		75% {
			filter: opacity(1);
			transform: translateY(0);
		}

		100% {
			filter: opacity(0);
			transform: translateY(10em);
		}
	}
</style>
