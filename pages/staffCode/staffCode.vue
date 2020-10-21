<template>
	<view class="pt-4">
		
		<view class="mx-3 mt-5 Mgb radius10 p-2 p-r card">
			<image src="../../static/images/topromote-img3.png" class="p-a cardBg"></image>
			<view class="font-50 colorf font-w pt-3 text-c">芝麻开门公众号</view>
			<view class="flex0 pt-5 mt-3">
				<image :src="QrData.url" class="ewm"></image>
			</view>
			<view style="height: 100rpx;"></view>
			<view style="position: fixed;width: 89%;">
				<view class="font-30 colorf text-c">邀请码</view>
				<view class="font-50 colorf text-c">{{user_no}}</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				QrData:{},
				user_no:''
			}
		},
		onLoad(options) {
			const self = this;
			self.user_no = uni.getStorageSync('staff_info').user_no;
			self.$Utils.loadAll(['getQrData'], self);
		},
		methods: {
			
			getQrData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getStaffToken';
				postData.param = 'https://test.solelyfinance.com/h5/?user_no=' + uni.getStorageSync('staff_user') +
					'#/pages/shopIndex/shopIndex';
				postData.ext = 'png';
				const callback = (res) => {
					self.QrData = res.info;
					self.$Utils.finishFunc('getQrData');
				};
				self.$apis.getQrCommonCode(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.card{height: 970rpx;}
.cardBg{width: 650rpx; height: 760rpx;bottom: 50rpx;}
.ewm{width: 430rpx;height: 420rpx;}
</style>
