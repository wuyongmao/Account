<template>
	<view class="container">
		<view class="uni-flex my-row">
			<view
				class="statement_type"
				:class="key == current ? 'active' : ''"
				style="flex: 1;"
				v-for="(item, key) in items"
				@tap="onClickItem(key)"
				:key="key"
			>
				<text class="type">{{ item }}</text>
			</view>
		</view>
		<view class="content">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-flex uni-row">
					<view class="label-text" style="width: 200upx; "><label>金额</label> </view>
					<view class="label-text" style="flex: 1; "
						><input
							class="uni-input"
							placeholder="0.00"
							v-model="statement.amount"
							name="amount"
							type="digit"
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
					<view style="flex: 1; "> <switch name="switch" @change="getLocation" /> </view>
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
import { mapState } from 'vuex';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import helper from '../../common/helper.js';
var a = 10;
export default {
	components: {
		uniSegmentedControl
	},
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
			date: helper.now,
			items: ['支出', '收入', '转账'],
			current: 0
		};
	},
	computed: {
		startDate() {
			return this.date;
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
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
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
		},
		redirectChoseAsset() {
			uni.navigateTo({
				url: 'assets_form?id=2&amount=' + this.amount
			});
		},
		redirectChoseCategory() {
			console.info('选择分类....');
			uni.navigateTo({
				url: '/pages/form/chose_category'
			});
		}
	},
	onLoad(options) {
		console.info(options);
		if (options.id) {
			this.amount = options.amount;
			this.onClickItem(parseInt(options.id));
		}
		uni.setNavigationBarTitle({
			title: '支出'
		});
	}
};
</script>
<style>
.statement_type {
	opacity: 0.8;
	font-size: 38upx;
	width: 100%;
	/* border: 1upx solid #96c2f1;
	background: #00bfff; */
	 
}

.statement_type:active {
	/* 	border: thick double #1AAD19;
	border-radius: 10%; */

	color: #0062cc;
	border-bottom: 3px solid   #0062cc;
	
}

.active {
	/* border: thick double #1AAD19;border-radius: 10%; */
	color: #0062cc;
	border-bottom: 3px solid   #0062cc;
}

.uni-row {
	border: 1px solid #afdcf8;
	background: #eff7ff;
}

.label-text {
	line-height: 30px;
}

.uni-input {
	text-align: right;
	line-height: 1.5em;
}

button {
	/* display: block; */
	width: 90%;
	height: 32px;
	/* line-height: 32px; */
	font-size: 14px;
	background-color: #0062cc;
	text-align: center;

	border-radius: 3px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.uni-row {
	text-align: right;
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 10upx;
}
.label-text {
	padding: 1upx;
	line-height: 70upx;
	font-size: 32;
}
</style>
