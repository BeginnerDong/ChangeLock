<template>
	<view>
		
		<view class="list bB-f5">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">待发货</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">待收货</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">已完成</view>
		</view>
		
		<view class="bg-white px-3"  v-for="(item,index) in mainData" :key="index">
			<view class="flex1 line-h pt-3 pb-2 bB-e1">
				<view class="font-26">订单编号：{{item.order_no}}</view>
				<view class="font-24 colorR" v-if="item.transport_status==0&&item.pay_status==1">待发货</view>
				<view class="font-24 colorR" v-if="item.transport_status==1&&item.pay_status==1">待收货</view>
				<view class="font-24 colorR" v-if="item.transport_status==2&&item.pay_status==1">已完成</view>
			</view>
			<view class="flex py-2 bB-e1" :data-id = "item.id" v-for="(c_item,c_index) in item.child" :key="c_index"
				@click="Router.navigateTo({route:{path:'/pages/orderDetail/orderDetail?id='+$event.currentTarget.dataset.id}})">
				<image :src="c_item.orderItem&&c_item.orderItem[0]&&c_item.orderItem[0].snap_product&&
						c_item.orderItem[0].snap_product.mainImg&&c_item.orderItem[0].snap_product.mainImg[0]?c_item.orderItem[0].snap_product.mainImg[0].url:''" class="wh160 radius10"></image>
				<view class="py-1 pl-2 h160 flex5">
					<view>{{c_item.orderItem&&c_item.orderItem[0]&&c_item.orderItem[0].snap_product?c_item.orderItem[0].snap_product.title:''}}</view>
					<view class="flex1">
						<view class="font-30">￥{{c_item.price?c_item.price:''}}</view>
						<view class="font-26 color9">x{{c_item.count?c_item.count:''}}</view>
					</view>
				</view>
			</view>
			<view class="py-3 line-h text-r">
				<text class="color6 pr-2">{{item.create_time}}</text>
				<text>实付款 <text class="price font-30">{{item.price}}</text></text>
			</view>
			<!-- 待收货展示 -->
			<view class="pb-3 text-r" @click="orderUpdate(index)" v-if="item.transport_status==1">
				<view class="btn60-c Mgb colorf">确认收货</view>
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
					level:1,
					type:1,
				},
				Router:this.$Router,
				Utils:this.$Utils,
			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			if(options.index){
				self.index = options.index
			}
		},
		onShow() {
			const self = this;
			if(self.index){
				self.changeLi(self.index)
			}else{
				self.getMainData(true)
			}
		},
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		methods: {
			
			
			
			changeLi(i){
				const self = this;
				if(i!=self.liCurr){
					self.liCurr = i;
					if(self.liCurr==0){
						delete self.searchItem.transport_status
					}else if(self.liCurr==1){
						self.searchItem.transport_status=0
					}else if(self.liCurr==2){
						self.searchItem.transport_status=1
					}else if(self.liCurr==3){
						self.searchItem.transport_status=2
					};
					self.getMainData(true)
				}
			},
			
			getMainData(isNew) {
				const self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						is_page: true,
						pagesize: 10
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no;
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
			orderUpdate(index) {
				const self = this;
				uni.setStorageSync('canClick', false);
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					transport_status:2
				};
				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('操作成功','none');
						setTimeout(function() {
							self.getMainData(true)
						}, 1000);
					} else {
						self.$Utils.showToast(data.msg,'none')
					}
				};
				self.$apis.orderUpdate(postData, callback);
			 },
			
		}
	}
</script>
<style>page{background-color: #f5f5f5;}</style>
<style scoped>
.li{width: 25%;}
.h160{height: 160rpx;}
.btn60-c{width: 160rpx;display: inline-block;}
</style>
