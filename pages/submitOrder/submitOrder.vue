<template>
	<view>
		
		<view class="px-3 pt-3 mb-2 p-r">
			<view class="bg-white radius20 px-2 py-3 font-24 flex"
			@click="Router.redirectTo({route:{path:'/pages/address/address'}})">
				<view class="flex-1">
					<view class="pb-1">
						<text class="font-30">张萌</text>
						<text class="color9 pl-2">158****2356</text>
					</view>
					<view class="color6 avoidOverflow2 w520">陕西省西安市雁塔区科技路高新四路高新大都荟A座2007</view>
				</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
				
			<image src="../../static/images/theorder-icon.png" mode="widthFix" class="p-aX bottom-0"></image>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="py-3 font-30 flex bB-f5">
				<image src="../../static/images/theorder-img.png" class="wh160 radius10"></image>
				<view class="h160 py-1 flex-1 flex5 pl-2">
					<view class="flex-1 avoidOverflow2">美利保C级锁芯</view>
					<view class="price colorR">240</view>
				</view>
			</view>
			<view class="py-3 flex1">
				<view>购买数量</view>
				<view class="count">
					<view class="countIcon"><image src="../../static/images/theorder-icon2.png" class="countIcon1"></image></view>
					<view class="countNum">1</view>
					<view class="countIcon"><image src="../../static/images/theorder-icon1.png" class="countIcon2"></image></view>
				</view>
			</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3 py-4 flex"
		@click="Router.redirectTo({route:{path:'/pages/coupon/coupon?type=0'}})">
			<view class="flex-1">优惠券</view>
			<view class="font-26 colorR">-100</view>
			<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
		</view>
		
		<view class="bg-white shadowT p-aX bottom-0 flex1">
			<view class="pl-4">
				<text class="font-26">总计：</text>
				<text class="font-30 price">29.9</text>
			</view>
			<view class="btnCar Mgb colorf" @click="Show">立即支付</view>
		</view>
		
		<!-- 确认弹框 -->
		<view class="bg-mask flex0" v-show="is_show">
			<view class="mask radius10 line-h">
				<view class="color6 py-4 bB-f5 text-c">订单确认</view>
				<view class="px-3 py-4 d-flex ">
					<view class="color6">商品信息：</view>
					<view class="flex-1 ">
						<view class="line-h-sm pb-2">美利保C级锁芯</view>
						<view>￥240</view>
					</view>
				</view>
				<view class="flex text-c bT-f5">
					<view class="w-50 py-4 bR-f5" @click="Show">重新输入</view>
					<view class="w-50 py-4 colorM"
					@click="Router.redirectTo({route:{path:'/pages/coupon/coupon?type=1'}})">确认</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show:false
			}
		},
		methods: {
			
			Show(){
				const self = this;
				self.is_show = !self.is_show;
			}
			
		}
	}
</script>

<style>
page{background-color: #f5f5f5;}
</style>
<style scoped>
.w520{width: 520rpx;}
.h160{height: 160rpx;}
.btnCar{width: 240rpx;}
.mask{width: 690rpx;}
</style>