<template>
	<view class="px-3">
		
		<view class="py-4 bB-f5 flex1 line-h">
			<view class="color8">姓名</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="py-4 bB-f5 flex1 line-h">
			<view class="color8">手机号</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="py-4 bB-f5 flex1 line-h">
			<view class="color8">所在地区</view>
			<picker mode="region">
				<view  class="flex-1 flex">
					<view class="color6 flex-1 text-right">请选择所在地区</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
				</view>
			</picker>
		</view>
		<view class="py-4 bB-f5 flex1 line-h">
			<view class="color8">详细地址</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="py-4 bB-f5 flex1 line-h">
			<view class="color8">设为默认地址</view>
			<image src="../../static/images/address-icon2.png" class="mr-icon"></image>
			<!-- <image src="../../static/images/address-icon3.png" class="mr-icon"></image> -->
		</view>
		
		<view class="btn80 Mgb mt-4 colorf">确定</view>
		<view class="btn80 bg-f5 mt-2" v-show="type==1">删除地址</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0
			}
		},
		onLoad(options){
			const self = this;
			self.type = options.type;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
input{flex: 1;text-align: right;line-height: 1;}
.mr-icon{width: 67rpx;height: 34rpx;}
</style>
