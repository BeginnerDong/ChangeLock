<template>
	<view>
		
		<view class="px-3 pt-3 mb-2 p-r">
			<view class="bg-white radius20 px-2 py-3 font-24 flex"
			@click="Router.redirectTo({route:{path:'/pages/address/address'}})">
				<view class="flex-1" v-if="addressData.name">
					<view class="pb-1">
						<text class="font-30">{{addressData.name}}</text>
						<text class="color9 pl-2">{{addressData.phone}}</text>
					</view>
					<view class="color6 avoidOverflow2 w520">{{addressData.city+addressData.detail}}</view>
				</view>
				<view class="flex-1" v-else>
					<view class="pb-1">
						<text class="font-30">请添加或选择收货地址</text>
					</view>
				</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
				
			<image src="../../static/images/theorder-icon.png" mode="widthFix" class="p-aX bottom-0"></image>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="py-3 font-30 flex bB-f5">
				<image :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" class="wh160 radius10"></image>
				<view class="h160 py-1 flex-1 flex5 pl-2">
					<view class="flex-1 avoidOverflow2">{{mainData.title?mainData.title:''}}</view>
					<view class="price colorR">{{mainData.price?mainData.price:''}}</view>
				</view>
			</view>
			<view class="py-3 flex1">
				<view>购买数量</view>
				<view class="count">
					<view class="countIcon" @click="counter('-')"><image src="../../static/images/theorder-icon2.png" class="countIcon1"></image></view>
					<view class="countNum">{{count}}</view>
					<view class="countIcon" @click="counter('+')"><image src="../../static/images/theorder-icon1.png" class="countIcon2"></image></view>
				</view>
			</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3 py-4 flex"
		@click="Router.navigateTo({route:{path:'/pages/useCoupon/useCoupon'}})">
			<view class="flex-1">优惠券</view>
			<view class="font-26 colorR">{{couponData.id?'满'+couponData.condition+'减'+couponData.value:'选择优惠劵'}}</view>
			<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
		</view>
		
		<view class="bg-white shadowT p-aX bottom-0 flex1">
			<view class="pl-4">
				<text class="font-26">总计：</text>
				<text class="font-30 price">{{totalPrice}}</text>
			</view>
			<view class="btnCar Mgb colorf" @click="Show">立即支付</view>
		</view>
		
		<!-- 确认弹框 -->
		<view class="bg-mask flex0" v-show="is_show">
			<view class="mask radius10 line-h">
				<view class="color6 py-4 bB-f5 text-c">订单确认</view>
				<view class="px-3 py-4 d-flex ">
					<view class="color6">商品信息：</view>
					<view class="flex-1 ">
						<view class="line-h-sm pb-2">{{mainData.title?mainData.title:''}}</view>
						<view>￥{{mainData.price?mainData.price:''}}</view>
					</view>
				</view>
				<view class="flex text-c bT-f5">
					<view class="w-50 py-4 bR-f5" @click="Show">取消</view>
					<view class="w-50 py-4 colorM"
					@click="Utils.stopMultiClick(submit)">确认</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				is_show:false,
				mainData:{},
				count:1,
				totalPrice:0,
				addressData:{},
				pay:{
					coupon:[]
				},
				Utils:this.$Utils,
				distriData:{},
				couponData:{}
			}
		},
		onLoad(options) {
			const self = this;
			self.mainData = uni.getStorageSync('payPro');
			self.getDistriData();
			self.countTotalPrice()
		},
		onShow() {
			const self = this;
			if(uni.getStorageSync('choosedAddressData')){
				self.addressData = uni.getStorageSync('choosedAddressData')
			}else{
				self.getAddressData()
			};
			if(uni.getStorageSync('chooseCoupon')){
				
				self.getUserCouponData()
			}
		},
		methods: {
			
			getUserCouponData() {
				const self = this;
				var now = Date.parse(new Date());
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					id: uni.getStorageSync('chooseCoupon'),
					//pay_status:1,
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.couponData = res.info.data[0]
						self.useCoupon()
					}
				};
				self.$apis.userCouponGet(postData, callback);
			},
			
			useCoupon() {
				const self = this;	
				self.couponTotalPrice = self.$Utils.addItemInArray(self.pay.coupon, 'price');
			/* 	console.log(index)
				console.log(self.couponData);
				console.log(self.couponData[0]); */
				/* for (var i = 0; i < self.mainData.length; i++) {
					self.totalPrice += parseFloat(parseFloat(self.mainData[i].product.sku[self.mainData[i].skuIndex].price)*parseFloat(self.mainData[i].count)).toFixed(2)
				}; */
				console.log('self.totalPrice', self.totalPrice)
				if(self.couponData.id){
					var id = self.couponData.id;
				}else{
					self.pay.coupon = []
					self.countTotalPrice();
					console.log('self.pay',self.pay)
					return
				}
				
				var findCoupon = self.couponData;
				var findItem = self.$Utils.findItemInArray(self.pay.coupon, 'id', id);
				/* if (findCoupon) {
					findCoupon = findCoupon[1];
					var findSameCoupon =  self.$Utils.findItemsInArray(self.pay.coupon, 'product_id', id);
				} else {
					self.$Utils.showToast('优惠券错误', 'none');
					return;
				}; */
				if (findItem) {
					self.countTotalPrice();
					console.log('self.pay',self.pay)
					return
				} else {
					console.log('self.totalPrice', self.totalPrice)
					console.log('self.totalPrice', self.couponTotalPrice)
					console.log('self.totalPrice', findCoupon.condition)
					if ((self.totalPrice - self.couponTotalPrice) < findCoupon.condition) {
						self.$Utils.showToast('未达满减标准', 'none');	
						self.couponData = {};
						return;
					};			
					self.pay = {
						coupon:[]
					};
					//console.log('findSameCoupon.length', findSameCoupon.length)
					if (self.pay.coupon.length >= 1) {
						self.$Utils.showToast('叠加使用超限', 'none');
					
						return;
					};
					
					if (findCoupon.type == 1) {
						var couponPrice = findCoupon.value;
						console.log('findCoupon.discount', findCoupon.discount)
					} else if (findCoupon.type == 2) {
						
						var couponPrice = parseFloat(self.totalPrice).toFixed(2) - parseFloat(findCoupon.discount / 100 * self.totalPrice)
							.toFixed(2);
					};
					/* if (parseFloat(couponPrice) + parseFloat(self.couponTotalPrice) > parseFloat(self.totalPrice)) {
						couponPrice = parseFloat(self.totalPrice).toFixed(2) - parseFloat(self.couponTotalPrice).toFixed(2);
					}; */
					self.pay.coupon.push({
						id: id,
						price: couponPrice.toFixed(2),
					});
				};
				self.countTotalPrice();
			},
			
			getDistriData() {
				const self = this;		
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					child_no:uni.getStorageSync('user_info').user_no
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.distriData = res.info.data[0];
					}
				};
				self.$apis.distriGet(postData, callback);
			},
			
			getAddressData() {
				const self = this;		
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					isdefault:1
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data[0];
					}
				};
				self.$apis.addressGet(postData, callback);
			},
			
			countTotalPrice() {
				const self = this;
				self.totalPrice = 0;
				self.couponTotalPrice = self.$Utils.addItemInArray(self.pay.coupon, 'price');
				self.totalPrice = self.mainData.price*self.count;
				self.totalPrice = (parseFloat(self.totalPrice) - parseFloat(self.couponTotalPrice)).toFixed(2)
				if (self.totalPrice > 0) {
					self.pay.wxPay = {
						price: self.totalPrice,
					};
				} else {
					  delete self.pay.wxPay;	 
				};
				console.log(self.pay)
			},
			
			
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick', false);
				if(JSON.stringify(self.addressData) == '{}'){
					self.is_show = false;
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请添加或选择收货地址','none')
					return
				}
				var orderList = []
				
				orderList.push({product_id:self.mainData.id,count:self.count})
				
				self.addOrder(orderList)
			},
			
			addOrder(orderList) {
				const self = this;
				uni.showLoading({
					mask:true,
					title:'支付中'
				});
				const postData = {}; 
				postData.orderList = self.$Utils.cloneForm(orderList);
				postData.data = {
					type:1,
					level:1,
					snap_address:self.addressData,
				};
				postData.type = 1;
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				console.log('addOrder',postData);
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.is_show = false;
						self.goPay()
					} else {		
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};		
				};
				self.$apis.addOrder(postData, callback);
			},
			
			goPay() {
				const self = this;	
				const postData = self.$Utils.cloneForm(self.pay);	
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				postData.noLoading = true;
				postData.payAfter = [];
				if(JSON.stringify(self.distriData)!='{}'){
					postData.payAfter.push(
						{
							tableName: 'FlowLog',
							FuncName: 'add',
							data: {
								type:2,
								count : parseFloat(self.pay.wxPay.price*(self.mainData.ratio/100)).toFixed(2),
								trade_info:'购买商品返佣',
								account:1,
								withdraw:0,
								thirdapp_id:2,
								user_no:self.distriData.parent_no,
								relation_user:uni.getStorageSync('user_info').user_no
							},
						}
					)
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
					
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									self.$Utils.showToast('支付成功','none')
									setTimeout(function() {
										self.$Router.redirectTo({route:{path:'/pages/coupon/coupon'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									self.$Utils.showToast('支付失败','none')
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none')
							setTimeout(function() {
								self.$Router.redirectTo({route:{path:'/pages/coupon/coupon'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},
			
			counter(type) {
				const self = this;
				if (type == '+') {
					self.count++;
				} else {
					if (self.count > 1) {
						self.count--;
					}
				};
				self.countTotalPrice();
			},
			
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
.w520{width: 520rpx;}
.h160{height: 160rpx;}
.btnCar{width: 240rpx;}
.mask{width: 690rpx;}
</style>