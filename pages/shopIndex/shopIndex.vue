<template>
	<view>
		
		<!-- banner -->
		<swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="3000" indicator-active-color="#FAAA30">
			<block v-for="(item,index) in 2" :key="index">
				<swiper-item class="swiper-item">
					<image src="../../static/images/mall-banner.png" class="slide-image" />
				</swiper-item>
			</block>
		</swiper>
		
		<!-- 金刚区 -->
		<view class="font-26 line-h flex py-4">
			<view class="flex4 w-33"
			@click="Router.redirectTo({route:{path:'/pages/classify/classify?type=1'}})">
				<image src="../../static/images/mall-icon1.png" class="wh100 mb-2"></image>
				<view>机械锁</view>
			</view>
			<view class="flex4 w-33"
			@click="Router.redirectTo({route:{path:'/pages/classify/classify?type=2'}})">
				<image src="../../static/images/mall-icon.png" class="wh100 mb-2"></image>
				<view>指纹锁</view>
			</view>
			<view class="flex4 w-33"
			@click="Router.redirectTo({route:{path:'/pages/classify/classify?type=3'}})">
				<image src="../../static/images/mall-icon2.png" class="wh100 mb-2"></image>
				<view>门把手</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<!-- 热门推荐 -->
		<view class="px-3">
			<view class="tit p-r pt-4">
				<view class="font-32 pl-1 font-w p-r line-h">热门推荐</view>
			</view>
			
			<view class="font-26 line-h flex flex-wrap">
				<view class="mt-3 gird" v-for="(item,index) in 4" :key="index"
				@click="Router.redirectTo({route:{path:'/pages/detail/detail'}})">
					<image src="../../static/images/mall-img.png" class="img"></image>
					<view class="py-2">
						<view class="avoidOverflow">美利保C级锁芯</view>
						<view class="price colorR pt-3">240</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		<view style="height: 120rpx;"></view>
		<!-- footer -->
		<view class="footer bT-f5">
			<view class="item on">
				<image src="../../static/images/nabar1-a.png" mode=""></image>
				<view>首页</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/public/public'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
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
				is_show: false,
			}
		},
		onLoad() {
			const self = this;
			// self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			getMainData() {
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				self.$apis.orderGet(postData, callback);
			}
		}
	};
</script>

<style scoped>
.swiper-box,swiper-item{width: 100%;height: 300rpx;}
.tit::before{content: '';width: 36rpx;height: 10rpx;background-image: linear-gradient(to right,#B1A4F4,#fff);position: absolute;left: 0;bottom: 0;}
.img{width: 210rpx;height: 210rpx;border-radius: 10rpx;}
.gird{margin-right: 31rpx;}
.gird:nth-child(3n){margin-right: 0;}
</style>