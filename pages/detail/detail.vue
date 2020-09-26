<template>
	<view>
		
		<!-- banner -->
		<swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="3000" indicator-active-color="#FAAA30">
			<block v-for="(item,index) in 2" :key="index">
				<swiper-item class="swiper-item">
					<image src="../../static/images/details-img.png" class="slide-image" />
				</swiper-item>
			</block>
		</swiper>
		
		<view class="line-h px-3 py-4">
			<view class="font-34 pb-4">美利保C级锁芯</view>
			<view class="price font-w font-36">240</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3 pb-5">
			<view class="font-30 py-4 color9">详情描述</view>
			
			<view>
				<image src="../../static/images/details-img1.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		<view class="p-2 shadowT p-fX bottom-0 bg-white">
			<view class="btn80 Mgb colorf"
			@click="Router.redirectTo({route:{path:'/pages/submitOrder/submitOrder'}})">立即购买</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.swiper-box,swiper-item{width: 100%;height: 750rpx;}
</style>
