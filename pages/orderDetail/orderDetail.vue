<template>
	<view>
		<!-- 待发货 -->
		<view class="Mgb px-3 py-5 flex1 pb-5 colorf"  v-if="mainData.pay_status==1&&mainData.transport_status==0&&mainData.order_step==0">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">等待发货</view>
				<view>卖家将尽快为您发货，请耐心等待！</view>
			</view>
			<image src="../../static/images/theorderdetails-icon.png" class="fhIcon"></image>
		</view>
		<!-- 待收货 -->
		<view class="Mgb px-3 py-5 flex1 pb-5 colorf" v-if="mainData.pay_status==1&&mainData.transport_status==1&&mainData.order_step==0">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">等待收货</view>
				<view>您的包裹已寄出，请注意查收~</view>
			</view>
			<image src="../../static/images/theorderdetails-icon1.png" class="shIcon"></image>
		</view>
		<!-- 已完成 -->
		<view class="Mgb px-3 py-5 flex1 pb-5 colorf" v-if="mainData.pay_status==1&&mainData.transport_status==2&&mainData.order_step==0">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">买家已收货</view>
				<view>合作愉快哦~</view>
			</view>
			<image src="../../static/images/theorderdetails-icon2.png" class="shIcon1"></image>
		</view> 
		
		
		<view class="bg-white radius20-T p-3 line-h d-flex a-start dz">
			<image src="../../static/images/theorderdetails-icon3.png" class="wh28"></image>
			<view class="addressTxt flex-1 pl-2">
				<view class="font-26 font-w pb-3">{{mainData.snap_address.name}}  <text class="pl-4">{{mainData.snap_address.phone}}</text></view>
				<view class="font-24 color9 avoidOverflow">地址：{{mainData.snap_address.city+mainData.snap_address.detail}}</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3" v-for="(item,index) in mainData.child" 
			:key="index">
			<view class="py-3 bB-f5">
				<view class="flex1">
					<image :src="item.orderItem&&item.orderItem[0]&&item.orderItem[0].snap_product&&
						item.orderItem[0].snap_product.mainImg&&item.orderItem[0].snap_product.mainImg[0]?item.orderItem[0].snap_product.mainImg[0].url:''" 
						class="wh160 radius10"></image>
					<view class="flex5 font-30 py-0 flex-1 pl-2 h160">
						<view class="avoidOverflow2 w510">{{item.product_title}}</view>
						<view class="flex1">
							<view class="price1 font-32 font-w">{{item.price}}</view>
							<view class="font-24 color8">数量：{{item.count}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3 font-26">
			<view class="flex">
				<view class="color9 pr-4">订单编号：</view>
				<view class="py-3 bB-f5 flex-1">{{mainData.order_no?mainData.order_no:''}}</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">下单时间：</view>
				<view class="py-3 bB-f5 flex-1">{{mainData.create_time?mainData.create_time:''}}</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">商品数量：</view>
				<view class="py-3 bB-f5 flex-1">{{mainData.child.length?mainData.child.length:''}}</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">商品总额：</view>
				<view class="price py-3 bB-f5 flex-1">{{mainData.price?mainData.price:''}}</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">优惠金额：</view>
				<view class="py-3 bB-f5 flex-1">-￥200</view>
			</view>
		</view>
		<view class="p-3 text-r pb-5">
			实付款： <text class="price1 colorR font-36 font-w">{{mainData.price?mainData.price:''}}</text>
		</view>
		<view class="f5Bj-H20"></view>
		
		
		<view style="height: 120rpx;"></view>
		<view class="d-flex j-end px-3 py-2 p-fX bottom-0 bg-white" v-if="mainData.pay_status==1&&mainData.transport_status==1">
			<view class="btn60-c Mgb colorf" @click="orderUpdate()">确认收货</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:{},
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			orderUpdate() {
				const self = this;
				uni.setStorageSync('canClick', false);
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					transport_status:2
				};
				postData.searchItem = {
					id:self.mainData.id,
				};
				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('操作成功','none');
						setTimeout(function() {
							self.getMainData()
						}, 1000);
					} else {
						self.$Utils.showToast(data.msg,'none')
					}
				};
				self.$apis.orderUpdate(postData, callback);
			 },
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					id: self.id,
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.fhIcon{width: 74rpx;height: 72rpx;}
.shIcon{width: 88rpx;height: 73rpx;}
.shIcon1{width: 74rpx;height: 74rpx;}

.dz{margin-top: -20rpx;}
.price1,.price{color: #222;}
.h160{height: 160rpx;}
.w510{width: 510rpx;}

.btn60-c{width: 160rpx;}
</style>
