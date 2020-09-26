<template>
	<view>
		
		<view>
			<view class="flex1 py-3 mx-3 bB-e1">
				<view class="d-flex">
					<view class="font-30 pr-5">
						<view>张世杰</view>
						<view class="signM mt-1">默认</view>
					</view>
					<view class="flex-1">
						<text class="font-28 mb-2">158****2235</text>
						<view class="avoidOverflow2 color8 w475">陕西省西安市雁塔区科技路噶新大都荟A座2007</view>
					</view>
				</view>
				<image src="../../static/images/address-icon.png" class="wh36"
				@click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress?type=1'}})"></image>
			</view>
		</view>
		
		
		
		
		<view style="height: 100rpx;"></view>
		<view class="flex0 py-3 bT-e1 p-fX bottom-0"
		@click="Router.navigateTo({route:{path:'/pages/addAddress/addAddress?type=0'}})">
			<image src="../../static/images/address-icon1.png" class="wh26 mr-1"></image>
			<view>新增地址</view>
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
.signM{width: 50rpx;line-height: 30rpx;font-size: 20rpx;color: #B1A4F4;border: 1px solid #B1A4F4;border-radius: 5rpx;text-align: center;}
.w475{width: 475rpx;}
</style>
