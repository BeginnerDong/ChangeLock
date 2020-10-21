<template>
	<view class="px-3">
		
		<view class="px-3 pt-3 color8" @click="addScore">可领优惠券（{{mainData.length?mainData.length:0}}张）</view>
		
		<view class="p-r mt-3 coupon" v-for="(item,index) in mainData" :key="index">
			<!-- 优惠券可领可用背景 -->
			<image src="../../static/images/coupons-img.png" mode="widthFix"></image>
			<!-- 不可用背景 -->
			<!-- <image src="../../static/images/coupons-img1.png" mode="widthFix"></image> -->
			
			<view class="p-aXY px-3 py-2 colorf flex1 overflow-h">
				<view class="b-f5 flex4 line-h txt">
					<view class="font-34">满{{item.condition}}可用优惠券</view>
					<view class="font-24 pt-3">{{Utils.timeto(now,'ymd')}}-{{Utils.timeto(now+item.valid_time*1000,'ymd')}}</view>
				</view>
				<view class="font-70"><text class="font-30">￥</text>{{item.value}}</view>
				
				<!-- 优惠券可领可用展示 -->
				<view class="p-1 p-a top-0 right-0" @click="choose(index)">
					<image :src="chooseIndex==index?'../../static/images/coupons-icon.png':'../../static/images/coupons-icon1.png'" class="wh48"></image>
					<!-- <image src="../../static/images/coupons-icon1.png" class="wh48"></image> -->
				</view>
				<!-- 不可用展示 -->
				<!-- <view class="no">不可用</view> -->
			</view>
		</view>
		
		<view class="btn80 Mgb colorf mt-5" @click="couponAdd(chooseIndex)">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:[],
				Utils:this.$Utils,
				now:Date.parse(new Date()),
				chooseIndex:-1
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			choose(index){
				const self = this;
				self.chooseIndex = index;
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = {
					count: 0,
					currentPage: 1,
					is_page: true,
					pagesize: 3
				};
				postData.searchItem = {
					is_free:0
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.couponGet(postData, callback);
			},
			
			couponAdd(index) {
				const self = this;
				if(self.chooseIndex<0){
					self.$Utils.showToast('请选择优惠券', 'none');
					return
				};
				self.orderList = [{
					coupon_id: self.mainData[index].id,
					count: 1,
					type: self.mainData[index].type,
				}];
				const postData = {
					tokenFuncName: 'getProjectToken',
				};
				postData.couponList = self.$Utils.cloneForm(self.orderList);
				postData.pay = {
					score: {
						price: 0
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.$Utils.showToast('领取成功', 'none')
						setTimeout(function() {
							self.$Router.redirectTo({route:{path:'/pages/userOrder/userOrder'}})
						}, 1000);
					} else {
						self.$Utils.showToast(res.msg, 'none')
					}
				};
				self.$apis.couponAdd(postData, callback);
			},
			
			addScore() {
				var self = this;
				var postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					count:10000,
					thirdapp_id:2,
					type:3,
					trade_info:'系统赠',
					account:1
				};
				var callback = function(res) {
					
				};
				self.$apis.flowLogAdd(postData, callback);
			},
		}
	}
</script>

<style>
</style>
