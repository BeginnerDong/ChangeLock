<template>
	<view>
		
		<image src="../../static/images/thelogin-icon.png" mode="widthFix" class="p-fX bottom-0"></image>
		
		<view class="px-7 p-r">
			<view class="mTxt">欢迎来到芝麻开门</view>
			
			
			<view>
				<view class="font-32 font-w">账号</view>
				<input type="text" value="" placeholder="请输入" placeholder-style="color:#999" />
			</view>
			<view>
				<view class="font-32 font-w">密码</view>
				<input type="text" value="" placeholder="请输入" placeholder-style="color:#999" />
			</view>
			
			<view class="btn80 Mgb colorf w-100 shadowM"
			@click="Router.navigateTo({route:{path:'/pages/extension/extension'}})">登录</view>
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
.mTxt{padding-bottom: 80rpx;}
input{width: 100%;font-size: 26rpx;height: 95rpx;margin-bottom: 60rpx;border-bottom: 1px solid #f5f5f5;padding: 0;}
.btn80{margin-top: 160rpx};
</style>
