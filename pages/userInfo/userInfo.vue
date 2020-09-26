<template>
	<view class="px-3">
		
		<view class="flex1 py-4 bB-f5">
			<veiw>姓名</veiw>
			<input type="text" value="" placeholder="填写姓名" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		<view class="flex1 py-4 bB-f5">
			<veiw>手机号</veiw>
			<input type="text" value="" placeholder="填写手机号" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		<view class="flex1 py-4 bB-f5">
			<veiw>身份证号</veiw>
			<input type="text" value="" placeholder="填写身份证号" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		<picker mode="region">
			<view class="flex1 py-4 bB-f5">
				<veiw>所在地区</veiw>
				<view class="color9 font-22 flex-1 text-r">请选择</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
		</picker>
		<view class="flex1 py-4 bB-f5">
			<veiw>详细地址</veiw>
			<input type="text" value="" placeholder="请填写" placeholder-style="color:#999;font-size:22rpx;" />
		</view>
		
		<view class="btn80 Mgb colorf w-100 shadowM mt-5">确定</view>
		
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
input{flex: 1;text-align: right;font-size: 28rpx;}
</style>
