<!-- <template>
  <view class="container">
    <view class="category-flex" v-for ="icon in icons">
      <view v-for ="{{item}}" @tap="choseIcon('{{ item }}')">
        <image src="{{ host }}{{ item }}"></image>
      </view>
    </view>
  </view>
</template>




<script>
	import helper from "../../common/helper.js";
	import controller from "../../common/controllers.js";
	import util from "../../common/util.js";


	export default {
		data() {icons: []},
		methods: {
			transfer() {
				uni.navigateTo({
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})

			},
			showHidden(idx) {
				let value = !this.list[idx].hidden
				this.list[idx]['hidden'] = value
			},
			showStatement(id) {
				uni.navigateTo({
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})
			},
			showAmountModal() {
				uni.navigateTo({
					url: "../statement/statement_add?index=2&amount=" + this.amount

				})
			},
			getList(year, month, index) {
				let value = !this.list[index].hidden
				this.list[index]['hidden'] = value
				this.statements(year, month, index)
			},
			async formSubmit(e) {
				let amount = e.detail.value.amount;
				console.log(JSON.stringify(e.detail.value));
			}


		}
	}
</script>

<style lang="scss" src="../../static/styles/statement/statement.scss"></style>
 -->