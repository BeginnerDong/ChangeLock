<template>
	<view>
		
		<view class="Mgb h400 colorf line-h px-3">
			<view class="font-26">可提现金额</view>
			<view class="font-60 py-4">4562.56</view>
		</view>
		
		<view class="card bg-white shadow radius20 px-3 py-4 mx-3 line-h">
			<view class="font-26 pb-3">提现金额</view>
			<view class="font-60 flex bB-f5 py-1">
				<view>￥</view>
				<input type="number" value="" />
			</view>
			<view class="flex pt-4 pb-5"
			@click="Router.navigateTo({route:{path:'/pages/bank/bank'}})">
				<view>提现至</view>
				<view class="font-26 flex-1 text-r">建设银行</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
			<view class="btn80-c Mgb colorf w-100 mt-5 shadowM">申请提现</view>
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
.h400{height: 400rpx;padding-top: 90rpx;}
.card{margin-top: -140rpx;}
input{font-size: 60rpx;}
</style>
