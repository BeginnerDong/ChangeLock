<template>
	<view>
		
		<image src="../../static/images/thelogin-icon.png" mode="widthFix" class="p-fX bottom-0"></image>
		
		<view class="px-7 p-r">
			<view class="mTxt">欢迎来到芝麻开门</view>
			
			<input type="text" value="" placeholder="请输入邀请码" />
			<view class="btn80 Mgb colorf w-100 shadowM">确定</view>
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
input{width: 100%;font-size: 26rpx;text-align: center;height: 80rpx;border: 1px solid #B1A4F4;border-radius: 10rpx;margin: 230rpx 0 70rpx;}
</style>
