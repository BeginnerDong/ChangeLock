<template>
	<view class="pb-3">
		
		<view class="list">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已发布</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已接收</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">已完成</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mt-3 font-26">
			<view class="p-3 b-DBe1 flex1">
				<view class="font-34">开锁</view>
				<view class="font-30 price">240</view>
			</view>
			<view class="b-DBe1 flex">
				<view class="p-3 b-DRe1 flex-1">
					<view class="flex mb-2">
						<image src="../../static/images/mytask-icon2.png" class="wh32 mr-2"></image>
						<view><text class="color8">上门时间：</text>夜间23:00-次日08:00</view>
					</view>
					<view class="d-flex a-start">
						<image src="../../static/images/mytask-icon.png" class="wh32 mr-2"></image>
						<view>
							<view class="line-h pb-1"><text class="color8">地址：</text>张三&nbsp;&nbsp;&nbsp; 13456895846</view>
							<view>陕西省西安市雁塔区高新大都荟A座2009</view>
						</view>
					</view>
				</view>
				<!-- 已发布 -->
				<!-- <view class="px-3 flex4 colorM">
					<image src="../../static/images/mytask-icon4.png" class="wh44 mb-2"></image>
					<view>已发布</view>
				</view> -->
				<!-- 已完成 -->
				<!-- <view class="px-3 flex4 c1">
					<image src="../../static/images/mytask-icon3.png" class="wh44 mb-2"></image>
					<view>已完成</view>
				</view> -->
				<!-- 已接收 -->
				<view class="px-3 flex4 c2">
					<image src="../../static/images/mytask-icon1.png" class="wh44 mb-2"></image>
					<view>已接收</view>
				</view>
			</view>
			<!-- 已发布 -->
			<!-- <view class="p-3 color6 text-r">发布时间：2020.08.23 12:00</view> -->
			<!-- 已接收 -->
			<view class="p-3 color6 d-flex j-end a-center">
				<view>接收时间：2020.08.23 12:00</view>
				<view class="btn60-c Mgb colorf ml-2">去支付</view>
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
.c1{color: #30C27F;}
.c2{color: #40AAF5;}

.btn60-c{width: 140rpx;}
</style>
