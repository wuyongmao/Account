<template>
	<!-- 	虚线box阴影 -->

	<view class="container">
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-flex uni-row">
					<view class="label-text" style="width: 200upx; "><label>金额</label> </view>
					<view class="label-text" style="flex: 1; "
						><input class="uni-input" placeholder="0.00" name="amount" type="digit"
					/></view>
				</view>

				<view class="uni-flex uni-row" v-if="current != 2">
					<view class="label-text" style="width: 200upx; "><label>分类</label> </view>
					<view class="label-text" style="flex: 1; "
						><input
							v-model="statement.category_id"
							class="uni-input"
							placeholder="请选择分类"
							@tap="redirectChoseCategory"
							name="categoryd"
							type="digit"
					/></view>
				</view>
				<view class="uni-flex uni-row" v-if="current != 2">
					<view class="label-text" style="width: 200upx; "><label>账户</label> </view>
					<view class="label-text" style="flex: 1; "
						><input class="uni-input" placeholder="请选择账户" name="assetId"
					/></view>
				</view>

				<view class="uni-flex uni-row" v-if="current == 2">
					<view class="label-text" style="width: 200upx; "
						><label>请选择账户</label>
					</view>
					<view class="label-text" style="flex: 1; "
						><input class="uni-input" name="from"
					/></view>
					<image class="uni-card-media-logo" src="../../static/transfer.png"></image>
					<view class="label-text" style="flex: 1; "
						><input class="uni-input" name="to"
					/></view>
				</view>

				<view class="uni-flex uni-row">
					<view class="label-text" style="width: 200upx; "><label>日期</label> </view>
					<view class="label-text" style="flex: 1; ">
						<picker mode="date" start="2017-01-01" @change="dateChange">
							<input class="uni-input" v-model="statement.date" name="date" />
						</picker>
					</view>
				</view>

				<view class="uni-flex uni-row" v-if="current != 2">
					<view class="label-text" style="width: 200upx; "><label>地理位置</label> </view>
					<view class="label-text" style="flex: 5; ">
						<input
							disabled=""
							class="uni-input"
							name="location"
							type="text"
							v-model="statement.address"
					/></view>
					<view style="flex: 1; "> 
					<switch name="switch" @change="getLocation" /> 
					</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="label-text" style="width: 200upx; "><label>备注</label> </view>
					<view class="label-text" style="flex: 1; "
						><input class="uni-input" placeholder="补充说明" name="description"
					/></view>
				</view>

				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;"
						><button type="primary" formType="submit">保存</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statement: {
				statement_id: 0,
				amount: 0.0,
				category_id: 0,
				category_name: '请选择分类',
				asset_id: 0,
				asset_name: '请选择账户',
				description: '',
				address: '中山三乡',
				// 转账信息
				asset_log_id: 0,
				source: '请选择账户',
				target: '请选择账户',
				from: 0,
				to: 0,
				nation: '',
				province: '',
				city: '',
				district: '',
				street: ''
			},
			asset: {
				asset_id: 0,
				amount: 0.0,
				category_id: 0,
				description: '',
				from: 0,
				to: 0
			},
			submiting: false,
			items: ['支出', '收入', '转账'],
			current: 0,
			icons: ['tuan', 'tuan', 'tuan']
		};
	},
	computed: {},

	methods: {
		thisClick(e) {
			consviewe.info(e);
		},
		onClickItem(index) {
			this.statement = {};
			uni.setNavigationBarTitle({
				title: this.items[index]
			});
			if (this.current !== index) {
				this.current = index;
			}
		},
		dateChange(e) {
			this.date = e.detail.value;
		},
		formSubmit: function(e) {
			console.log(JSON.stringify(e.detail.value));
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},
		getLocation: function() {
			uni.getLocation({
				success: res => {
					this.address = formatLocation(res.longitude, res.latitude);
					console.info(res);
				}
			});
		},
		redirectChoseAsset() {},
		redirectChoseCategory() {}
	},
	onLoad(options) {}
};
</script>

<style>
.line_01 {
	height: 1px;
	border: none;
	position: absolute;
	width: 100%;
	top: 50upx;
	border-top: 1px dashed #1e90ff;
}

.line_02 {
	position: absolute;
	top: 310upx;
	width: 100%;
	border: 1px dashed #1e90ff;
}

.effect:after,
.effect:before {
	content: 'effect';
	align-content: center;
	text-align: center;
	position: absolute;
	width: 90%;
	height: 100upx;
	top: 10%;
	left: 20px;
	right: 20px;
	background: #fff;
	border-radius: 15%;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
  .uni-row{
	text-align: right;
	 border: 1px solid rgba(0, 0, 0, 0.1); 
	 padding:  10upx ;
	
}
.label-text{
	
	padding: 1upx;
	line-height: 70upx;
	font-size: 32;
}

</style>
