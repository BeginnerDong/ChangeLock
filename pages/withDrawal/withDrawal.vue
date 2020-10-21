<template>
	<view>
		
		<view class="Mgb h400 colorf line-h px-3">
			<view class="font-26">可提现金额</view>
			<view class="font-60 py-4">{{money}}</view>
		</view>
		
		<view class="card bg-white shadow radius20 px-3 py-4 mx-3 line-h">
			<view class="font-26 pb-3">提现金额</view>
			<view class="font-60 flex bB-f5 py-1">
				<view>￥</view>
				<input type="digit" v-model="submitData.count" />
			</view>
			<view class="flex pt-4 pb-5"
			@click="Router.navigateTo({route:{path:'/pages/bank/bank'}})">
				<view>提现至</view>
				<view class="font-26 flex-1 text-r">{{userInfoData.bank!=''?userInfoData.bank:'暂未绑定银行卡'}}</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
			<view class="btn80-c Mgb colorf w-100 mt-5 shadowM" @click="Utils.stopMultiClick(submit)">申请提现</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData: {
					count: ''
				},
				money:'',
				Utils:this.$Utils,
				userInfoData:{}
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			self.money = options[0].money
			self.$Utils.loadAll(['getUserInfoData'], self);
		},
		methods: {
			
			getUserInfoData() {
				const self = this;
				const postData = {
					searchItem: {}
				};
				postData.tokenFuncName = 'getStaffToken';
				postData.searchItem.user_no = uni.getStorageSync('staff_info').user_no;
				
				const callback = (res) => {
					if (res.solely_code == 100000 && res.info.data[0]) {
						self.userInfoData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if (self.userInfoData.bank=='') {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请先绑定银行卡', 'none');
					return
				};
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('self.submitData', self.submitData)
				if (pass) {
			
					if (parseFloat(self.submitData.count) > parseFloat(self.money)) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('余额不足', 'none');
						return
					};
					
					if (parseFloat(self.submitData.count) <= 0) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请输入正确的金额', 'none');
						return
					};
			
					self.flowLogAdd()
			
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入提现金额', 'none')
				};
			},
			
			flowLogAdd() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getStaffToken';
				postData.data = {
					count: -self.submitData.count,
					thirdapp_id: 2,
					status: 1,
					trade_info: '提现',
					type: 2,
					account: 1,
					withdraw: 1,
					withdraw_status: 0
				};
				const callback = (data) => {
					if (data.solely_code == 100000) {
						self.$Utils.showToast('提交成功', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}
				};
				self.$apis.flowLogAdd(postData, callback);
			},
			
			
		}
	}
</script>

<style scoped>
.h400{height: 400rpx;padding-top: 90rpx;}
.card{margin-top: -140rpx;}
input{font-size: 60rpx;}
</style>
