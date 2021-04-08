<template>
	<view class="px-3">
		
		<view class="flex py-4 bB-f5">
			<view class="w100">姓名</view>
			<input type="text" v-model="submitData.bank_name" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">电话</view>
			<input type="text" v-model="submitData.bank_phone" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">开户行</view>
			<input type="text" v-model="submitData.bank" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">账户</view>
			<input type="text" v-model="submitData.card_no" placeholder="请输入" />
		</view>
		
		<view class="btn80 Mgb colorf" @click="userInfoUpdate()">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitData:{
					bank:'',
					bank_name:'',
					bank_phone:'',
					card_no:''
				}
			}
		},
		methods: {
			
			userInfoUpdate() {
				const self = this;
				var pass = self.$Utils.checkComplete(self.submitData)
				if(!pass){
					self.$Utils.showToast('请补充完整信息', 'none', 1000);
					return
				};
				uni.showLoading({
					mask:true,
					title:'提交中'
				})
				const postData = {};
				postData.tokenFuncName = 'getStaffToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('staff_info').user_no
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.noLoading = true;
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						uni.navigateBack({
							delta:1
						})
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.w100{width: 100rpx;}
.btn80{margin-top: 100rpx;}
</style>
