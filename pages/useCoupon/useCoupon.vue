<template>
	<view class="px-3">
		<view class="p-r mt-3 coupon" v-for="(item,index) in mainData" :key="index">
			<!-- 优惠券可领可用背景 -->
			<image src="../../static/images/coupons-img.png" mode="widthFix"></image>
			<!-- 不可用背景 -->
			<!-- <image src="../../static/images/coupons-img1.png" mode="widthFix"></image> -->
			
			<view class="p-aXY px-3 py-2 colorf flex1 overflow-h">
				<view class="b-f5 flex4 line-h txt">
					<view class="font-34">满{{item.condition}}可用优惠券</view>
					<view class="font-24 pt-3">有效期至：{{Utils.timeto(item.invalid_time,'ymd')}}</view>
				</view>
				<view class="font-70"><text class="font-30">￥</text>{{item.value}}</view>
				
				<!-- 优惠券可领可用展示 -->
				<view class="p-1 p-a top-0 right-0">
					<image :src="item.id==id?'../../static/images/coupons-icon.png':'../../static/images/coupons-icon1.png'" class="wh48"></image>
					<!-- <image src="../../static/images/coupons-icon1.png" class="wh48"></image> -->
				</view>
				<!-- 不可用展示 -->
				<!-- <view class="no">不可用</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:[],
				searchItem:{
					use_step:1
				},
				Utils:this.$Utils
			}
		},
		onLoad() {
			const self = this;
			self.id = uni.getStorageSync('chooseCoupon');
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			choose(index){
				const self = this;
				uni.setStorageSync('chooseCoupon',self.userCoponData[index].id);
				uni.navigateBack({
					delta:1
				})
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userCouponGet(postData, callback);
			},
			
		}
	}
</script>

<style>
</style>
