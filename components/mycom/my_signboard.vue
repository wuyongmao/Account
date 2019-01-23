<template>
	<view class="my_signboard">
		<view class="signboard">
			<view class="sign">
				<view class="title">{{title}}</view>
			</view>
			<view class="strings"></view>
			<view class="pin top"></view>
			<view class="pin left"></view>
			<view class="pin right"></view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			title: String,
		},
		data() {
			return {}
		}
	}
</script>

<style>
	.my_signboard {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at center 60%, white, sandybrown);
	}

	.signboard {
		width: 400px;
		height: 300px;
		position: relative;
		animation: swinging 1.5s ease-in-out infinite alternate;
		transform-origin: 200px 13px;
	}

	.sign {
		width: 100%;
		height: 200px;
		background: burlywood;
		border-radius: 15px;
		position: absolute;
		bottom: 40upx;

		color: saddlebrown;
		font-family: serif;
		font-weight: bold;
		text-align: center;

		text-shadow: 0 2px 0 rgba(255, 255, 255, 0.3),
			0 -2px 0 rgba(0, 0, 0, 0.7);
		word-wrap: break-word;
		word-break: break-all;
	}

	.title {
		width: 100%;
		height: 100%;
		font-size: 40px;
		font-family: serif;
		font-weight: bold;
		text-align: center;
		line-height: 40px;
		position: absolute;
		top: 170upx;


	}

	.strings {
		width: 150px;
		height: 150px;

		border: 5px brown;
		position: absolute;
		border-style: solid none none solid;
		transform: rotate(45deg);
		top: 38px;
		left: 120px;
	}

	.pin {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		position: absolute;
	}

	.pin.top {
		background: gray;
		left: 187px;
	}

	.pin.left,
	.pin.right {
		background: brown;
		top: 110px;
		box-shadow: 0 2px 0 rgba(255, 255, 255, 0.3);
	}

	.pin.left {
		left: 80px;
	}

	.pin.right {
		right: 80px;
	}

	@keyframes swinging {
		from {
			transform: rotate(10deg);
		}

		to {
			transform: rotate(-10deg);
		}
	}
</style>
