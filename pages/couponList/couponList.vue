<template>
	<view>
		
		<view class="list bB-e1">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">待使用</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已使用</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已过期</view>
		</view>
		
		<view class="p-r mt-3 mx-3 coupon">
			<!-- 可用背景 -->
			<image src="../../static/images/coupons-img.png" mode="widthFix"></image>
			<!-- 已使用，已过期背景 -->
			<!-- <image src="../../static/images/coupons-img1.png" mode="widthFix"></image> -->
			
			<view class="p-aXY px-3 py-2 colorf flex1 overflow-h">
				<view class="b-f5 flex4 line-h txt">
					<view class="font-34">满1899可用优惠券</view>
					<view class="font-24 pt-3">2020.07.20-2020.08.20</view>
				</view>
				<view class="font-70"><text class="font-30">￥</text>100</view>
				
				<!-- <view class="no">已使用</view> -->
				<!-- <view class="no">已过期</view> -->
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liCurr:0
			}
		},
		methods: {
			
			changeLi(index){
				const self = this;
				self.liCurr= index;
			}
			
		}
	}
</script>

<style scoped>
.li{width: 33.33%;}
</style>
