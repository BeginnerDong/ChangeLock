<template>
	<view class="px-3">
		
		<view class="flex py-4 bB-f5">
			<view class="w100">时间</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">电话</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">开户行</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="flex py-4 bB-f5">
			<view class="w100">账户</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		
		<view class="btn80 Mgb colorf">确定</view>
		
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
.w100{width: 100rpx;}
.btn80{margin-top: 100rpx;}
</style>
