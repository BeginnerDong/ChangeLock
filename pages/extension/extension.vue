<template>
	<view>
		<view class="p-r pt-3">
			
			<image src="../../static/images/topromote-img.png" mode="widthFix" class="p-aX top-0"></image>
			
			<view class="bg-white radius20 p-3 shadow mx-3 p-r">
				<view class="d-flex j-end a-center"
				@click="Router.navigateTo({route:{path:'/pages/extensionCode/extensionCode'}})">
					<view>推广码</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
				<view class="flex4 pt-3 pb-4 line-h">
					<view class="font-26 color8">总佣金</view>
					<view class="font-70 font-w py-4">8800.65</view>
					<view class="btn60-c bg-f5">推广总数： <text class="colorM">3</text></view>
				</view>
				<view class="flex line-h py-4">
					<view class="flex4 w-50">
						<view class="font-26 color9">已提现</view>
						<view class="font-36 pt-3">4877.57</view>
					</view>
					<view class="flex4 w-50">
						<view class="font-26 color9">可提现</view>
						<view class="font-36 pt-3">4877.57</view>
					</view>
				</view>
				<view class="btn80 Mgb colorf mt-4"
				@click="Router.navigateTo({route:{path:'/pages/withDrawal/withDrawal'}})">申请提现</view>
			</view>
			
		</view>
		
		<view class="font-32 p-3 mt-1 bB-e1 line-h">流水记录</view>
		<view class="px-3 line-h font-30">
			
			<view class="flex py-3 bB-e1" v-for="(item,index) in 10" :key="index">
				<image src="../../static/images/my-img.png" class="wh90 radius-5"></image>
				<view class="pl-2 flex-1">
					<view>竹蜻蜓</view>
					<view class="font-24 color6 pt-2">2020.7.23</view>
				</view>
				<view class="colorR">+23</view>
			</view>
			
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
.btn60-c{width: 260rpx;}
</style>