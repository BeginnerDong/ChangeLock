<template>
	<view class="px-3">
		
		<view class="px-3 pt-3 color8" v-show="type==1">可领优惠券（3张）</view>
		
		<view class="p-r mt-3 coupon">
			<!-- 优惠券可领可用背景 -->
			<image src="../../static/images/coupons-img.png" mode="widthFix"></image>
			<!-- 不可用背景 -->
			<!-- <image src="../../static/images/coupons-img1.png" mode="widthFix"></image> -->
			
			<view class="p-aXY px-3 py-2 colorf flex1 overflow-h">
				<view class="b-f5 flex4 line-h txt">
					<view class="font-34">满1899可用优惠券</view>
					<view class="font-24 pt-3">2020.07.20-2020.08.20</view>
				</view>
				<view class="font-70"><text class="font-30">￥</text>100</view>
				
				<!-- 优惠券可领可用展示 -->
				<view class="p-1 p-a top-0 right-0">
					<image src="../../static/images/coupons-icon.png" class="wh48"></image>
					<!-- <image src="../../static/images/coupons-icon1.png" class="wh48"></image> -->
				</view>
				<!-- 不可用展示 -->
				<!-- <view class="no">不可用</view> -->
			</view>
		</view>
		
		<view class="btn80 Mgb colorf mt-5"  v-show="type==1">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0
			}
		},
		onLoad(options) {
			const self = this;
			if(options.type){
				if(options.type==1){
					self.changeTit('领取优惠券')
				}else{
					self.changeTit('可用优惠券')
				}
			}
			self.type = options.type;
		},
		methods: {
			
			changeTit(title){
				uni.setNavigationBarTitle({
				    title: title
				});
			},
			
		}
	}
</script>

<style>
</style>
