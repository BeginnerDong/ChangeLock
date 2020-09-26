<template>
	<view>
		
		<view class="list bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">待发货</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">待收货</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">已完成</view>
		</view>
		
		<view class="bg-white px-3">
			<view class="flex1 line-h pt-3 pb-2 bB-e1">
				<view class="font-26">订单编号：1154895623518</view>
				<!-- <view class="font-24 colorR">待发货</view> -->
				<view class="font-24 colorR">待收获</view>
				<!-- <view class="font-24 colorR">已完成</view> -->
			</view>
			<view class="flex py-2 bB-e1"
			@click="Router.navigateTo({route:{path:'/pages/orderDetail/orderDetail'}})">
				<image src="../../static/images/mall-img.png" class="wh160 radius10"></image>
				<view class="py-1 pl-2 h160 flex5">
					<view>美利保C级锁芯</view>
					<view class="flex1">
						<view class="font-30">￥420.8</view>
						<view class="font-26 color9">x1</view>
					</view>
				</view>
			</view>
			<view class="py-3 line-h text-r">
				<text class="color6 pr-2">2020.08.02 12:00:27</text>
				<text>实付款 <text class="price font-30">420.8</text></text>
			</view>
			<!-- 待收货展示 -->
			<view class="pb-3 text-r">
				<view class="btn60-c Mgb colorf">确认收货</view>
			</view>
		</view>
		
		
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0
			}
		},
		onLoad(options) {
			const self = this;
			if(options.type){
				self.liCurr = options.type;
			}
		},
		methods: {
			
			changeLi(index){
				const self = this;
				self.liCurr= index;
			}
			
		}
	}
</script>
<style>page{background-color: #f5f5f5;}</style>
<style scoped>
.li{width: 25%;}
.h160{height: 160rpx;}
.btn60-c{width: 160rpx;display: inline-block;}
</style>
