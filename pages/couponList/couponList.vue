<template>
	<view>
		
		<view class="list bB-e1">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">待使用</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已使用</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已过期</view>
		</view>
		
		<view class="p-r mt-3 mx-3 coupon" v-for="(item,index) in mainData" :key="index">
			<!-- 可用背景 -->
			<image src="../../static/images/coupons-img.png" v-if="item.use_step==1" mode="widthFix"></image>
			<!-- 已使用，已过期背景 -->
			<image src="../../static/images/coupons-img1.png" v-else mode="widthFix"></image>
			
			<view class="p-aXY px-3 py-2 colorf flex1 overflow-h">
				<view class="b-f5 flex4 line-h txt">
					<view class="font-34">满{{item.condition}}可用优惠券</view>
					<view class="font-24 pt-3">有效期至：{{Utils.timeto(item.invalid_time,'ymd')}}</view>
				</view>
				<view class="font-70"><text class="font-30">￥</text>{{item.value}}</view>
				
				<!-- <view class="no">已使用</view> -->
				<!-- <view class="no">已过期</view> -->
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liCurr:0,
				mainData:[],
				searchItem:{
					use_step:1
				},
				Utils:this.$Utils
			}
		},
		onLoad() {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {
			
		
			
			changeLi(i){
				const self = this;
				if(self.liCurr!=i){
					self.liCurr = i
					if(self.liCurr==0){
						self.searchItem.use_step=1
					}else if(self.liCurr==1){
						self.searchItem.use_step=2
					}else if(self.liCurr==2){
						self.searchItem.use_step=-1
					}
					self.mainData = [];
					self.getMainData()
				}
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userCouponGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.li{width: 33.33%;}
</style>
