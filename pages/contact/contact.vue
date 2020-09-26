<template>
	<view>
		
		<view class="h700">
			<image src="../../static/images/contact-img.png" mode="widthFix"></image>
		</view>
		
		<view class="bg-white radius20-T p-3 p-r tt">
			<view class="flex p-2 b-e1 mb-3">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon1.png" class="icon1"></image>
				</view>
				<view class="pl-2">
					<view class="font-24 color6 pb-1">联系电话</view>
					<view>029-2356-2356</view>
				</view>
			</view>
			<view class="flex p-2 b-e1 mb-3">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon2.png" class="icon2"></image>
				</view>
				<view class="pl-2">
					<view class="font-24 color6 pb-1">客服微信</view>
					<view>029-2356-2356</view>
				</view>
			</view>
			<view class="flex p-2 b-e1">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon.png" class="icon1"></image>
				</view>
				<view class="pl-2">
					<view class="font-24 color6 pb-1">联系地址</view>
					<view>陕西省西安市雁塔区高新大都荟A做2007</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.tt{margin-top: -40rpx;}

.w100{width: 80rpx;}
.icon1{width: 42rpx;height: 52rpx;}
.icon2{width: 58rpx;height: 48rpx;}
</style>
