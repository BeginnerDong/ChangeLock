<template>
	<view>
		<!-- 待发货 -->
		<!-- <view class="Mgb px-3 py-5 flex1 pb-5 colorf">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">等待发货</view>
				<view>卖家将尽快为您发货，请耐心等待！</view>
			</view>
			<image src="../../static/images/theorderdetails-icon.png" class="fhIcon"></image>
		</view> -->
		<!-- 待收货 -->
		<view class="Mgb px-3 py-5 flex1 pb-5 colorf">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">等待收货</view>
				<view>您的包裹已寄出，请注意查收~</view>
			</view>
			<image src="../../static/images/theorderdetails-icon1.png" class="shIcon"></image>
		</view>
		<!-- 已完成 -->
		<v<!-- iew class="Mgb px-3 py-5 flex1 pb-5 colorf">
			<view class=" line-h flex-1">
				<view class="font-42 pb-3 font-w">买家已收货</view>
				<view>合作愉快哦~</view>
			</view>
			<image src="../../static/images/theorderdetails-icon2.png" class="shIcon1"></image>
		</view> -->
		
		
		<view class="bg-white radius20-T p-3 line-h d-flex a-start dz">
			<image src="../../static/images/theorderdetails-icon3.png" class="wh28"></image>
			<view class="addressTxt flex-1 pl-2">
				<view class="font-26 font-w pb-3">张梦瑶 <text class="pl-4">18228926587</text></view>
				<view class="font-24 color9 avoidOverflow">地址：陕西省西安市雁塔区科技路高新大都荟A座2007</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3">
			<view class="py-3 bB-f5">
				<view class="flex1">
					<image src="../../static/images/theorder-img.png" class="wh160 radius10"></image>
					<view class="flex5 font-30 py-0 flex-1 pl-2 h160">
						<view class="avoidOverflow2 w510">爱的乐章</view>
						<view class="flex1">
							<view class="price1 font-32 font-w">6980.00</view>
							<view class="font-24 color8">数量：1</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3 font-26">
			<view class="flex">
				<view class="color9 pr-4">订单编号：</view>
				<view class="py-3 bB-f5 flex-1">135984568289264</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">下单时间：</view>
				<view class="py-3 bB-f5 flex-1">2020-07-31 14:09:09</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">商品数量：</view>
				<view class="py-3 bB-f5 flex-1">1</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">商品总额：</view>
				<view class="price py-3 bB-f5 flex-1">2562.26</view>
			</view>
			<view class="flex">
				<view class="color9 pr-4">优惠金额：</view>
				<view class="py-3 bB-f5 flex-1">-￥200</view>
			</view>
		</view>
		<view class="p-3 text-r pb-5">
			实付款： <text class="price1 colorR font-36 font-w">5689.00</text>
		</view>
		<view class="f5Bj-H20"></view>
		
		
		<view style="height: 120rpx;"></view>
		<view class="d-flex j-end px-3 py-2 p-fX bottom-0 bg-white">
			<view class="btn60-c Mgb colorf">确认收货</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
