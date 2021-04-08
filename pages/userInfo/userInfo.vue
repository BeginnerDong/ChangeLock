<template>
	<view class="px-3">

		<view class="flex1 py-4 bB-f5">
			<view>姓名</view>
			<input type="text" v-model="submitData.name" placeholder="填写姓名" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		<view class="flex1 py-4 bB-f5">
			<view>手机号</view>
			<input type="phone" v-model="submitData.phone" placeholder="填写手机号" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		<view class="flex1 py-4 bB-f5">
			<view>身份证号</view>
			<input type="idcard" v-model="submitData.idCard" placeholder="填写身份证号" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		
		<view @click="openAddres" class="flex1 py-4 bB-f5">
			<view>所在地区</view>
			<view class="color9  flex-1 text-r" :style="submitData.region!=''?'color:#222':''">{{submitData.region!=''?submitData.region:'请选择'}}</view>
			<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
		</view>
		
		<view class="flex1 py-4 bB-f5">
			<view>详细地址</view>
			<input type="text" v-model="submitData.address" placeholder="请填写" placeholder-style="color:#999;font-size:22rpx;" />
		</view>

		<view class="btn80 Mgb colorf w-100 shadowM mt-5"  @click="Utils.stopMultiClick(userInfoUpdate)">确定</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData: {
					name: '',
					phone: '',
					idCard: '',
					region: '',
					address: '',
				},
				cityPickerValueDefault: [0, 0, 1],
				Utils:this.$Utils
			}
		},
		components: {
			simpleAddress
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData = res.info.data[0];
						self.submitData.name = self.mainData.name;
						self.submitData.phone = self.mainData.phone;
						self.submitData.idCard = self.mainData.idCard;
						self.submitData.region = self.mainData.region;
						self.submitData.address = self.mainData.address;
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			userInfoUpdate() {
				const self = this;
				uni.setStorageSync('canClick', false);
				if(self.submitData.name == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写姓名', 'none')
					return
				};
				if(self.submitData.phone == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写电话号', 'none')
					return
				};
				if(self.submitData.idCard == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写身份证号', 'none')
					return
				};
				if (self.submitData.phone.trim().length != 11) {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请输入正确的手机号', 'none', 1000)
					return;
				};
				if(!/^\d{17}(\d|x)$/i.test(self.submitData.idCard)) {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('你输入的身份证长度或格式错误', 'none', 1000)
					return;
				};
				if(self.submitData.region == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择地区', 'none')
					return
				};
				if(self.submitData.address == ''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写详细地址', 'none')
					return
				};
				uni.showLoading({
					mask:true,
					title:'上传中...'
				});
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.noLoading = true;
				const callback = (data) => {	
					uni.setStorageSync('canClick', true);
					if (data.solely_code == 100000) {
						self.Router.redirectTo({route:{path:'/pages/shopIndex/shopIndex'}})
					} else {
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},

			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			
			onConfirm(e) {
				const self = this;
				console.log(e);
				self.submitData.region = e.label;
			}

		}
	}
</script>

<style scoped>
	input {
		flex: 1;
		text-align: right;
		font-size: 28rpx;
	}
</style>
