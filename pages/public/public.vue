<template>
	<view>
		
		<view class="flex m-3">
			<image src="../../static/images/release-icon.png" class="dw-icon mr-1"></image>
			<view class="font-w">西安</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="flex py-4 bB-f5">
				<view class="w150">任务类型</view>
				<picker mode="selector" class="flex-1">
					<view class="flex1 w-100">
						<view class="font-26 color9">请选择</view>
						<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
					</view>
				</picker>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">时间段</view>
				<view class="flex">
					<view class="flex">
						<image src="../../static/images/release-icon2.png" class="wh36 mr-1"></image>
						<!-- <image src="../../static/images/release-icon3.png" class="wh36 mr-1"></image> -->
						<view>夜间</view>
					</view>
					<view class="flex pl-5">
						<!-- <image src="../../static/images/release-icon2.png" class="wh36 mr-1"></image> -->
						<image src="../../static/images/release-icon3.png" class="wh36 mr-1"></image>
						<view>白天</view>
					</view>
				</view>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">时间</view>
				<view class="font-26">23:00-次日08:00</view>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">价格</view>
				<view class="font-26">100</view>
			</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="font-26 color9 py-3">联系人信息</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">时间</view>
				<input type="text" value="" placeholder="请输入" />
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">电话</view>
				<input type="text" value="" placeholder="请输入" />
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">地址</view>
				<input type="text" value="" placeholder="请输入" />
			</view>
		</view>
		
		<view class="btn80 Mgb colorf mt-4 mx-3 shadowM" @click="Show">提交订单</view>
		
		<!-- 确认弹框 -->
		<view class="bg-mask flex0" v-show="is_show">
			<view class="mask radius10 line-h">
				<view class="color6 py-4 bB-f5 text-c">订单确认</view>
				<view>
					<view class="px-3 pt-4 d-flex ">
						<view class="color6">任务类型：</view>
						<view class="">开锁</view>
					</view>
					<view class="px-3 py-4 d-flex ">
						<view class="color6">联系人信息：</view>
						<view class="flex-1 ">
							<view class="line-h-sm pb-2">张三 13456895846</view>
							<view>陕西省西安市雁塔区高新大都荟A座2009</view>
						</view>
					</view>
				</view>
				<view class="flex text-c bT-f5">
					<view class="w-50 py-4 bR-f5" @click="Show">重新输入</view>
					<view class="w-50 py-4 colorM"
					@click="Router.redirectTo({route:{path:'/pages/coupon/coupon?type=1'}})">确认</view>
				</view>
			</view>
		</view>
		
		
		
		
		<view style="height: 120rpx;"></view>
		<!-- footer -->
		<view class="footer bT-f5">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/index/index'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
				<view>首页</view>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar2-a.png" mode=""></image>
				<view>发布任务</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/user/user'}})">
				<image src="../../static/images/nabar3.png" mode=""></image>
				<view>我的</view>
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
.dw-icon{width: 26rpx;height: 30rpx;}
.w150{width: 150rpx;font-size: 30rpx;}
.w100{width: 100rpx;font-size: 30rpx;}
.mask{width: 690rpx;}
</style>