<template>
	<view class="pb-3">
		
		<view class="list">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">已发布</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">已接收</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">已完成</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mt-3 font-26" v-for="(item,index) in mainData" :key="index">
			<view class="p-3 b-DBe1 flex1">
				<view class="font-34">{{item.label?item.label.title:''}}</view>
				<view class="font-30 price">{{item.price?item.price:''}}</view>
			</view>
			<view class="b-DBe1 flex">
				<view class="p-3 b-DRe1 flex-1">
					<view class="flex mb-2">
						<image src="../../static/images/mytask-icon2.png" class="wh32 mr-2"></image>
						<view><text class="color8">上门时间：</text>{{item.time_type==1?day:night}}</view>
					</view>
					<view class="d-flex a-start">
						<image src="../../static/images/mytask-icon.png" class="wh32 mr-2"></image>
						<view>
							<view class="line-h pb-1"><text class="color8">地址：</text>{{item.name}}&nbsp;&nbsp;&nbsp; {{item.phone}}</view>
							<view>{{item.address}}</view>
						</view>
					</view>
				</view>
				<!-- 已发布 -->
				<view class="px-3 flex4 colorM" v-if="item.transport_status==0">
					<image src="../../static/images/mytask-icon4.png" class="wh44 mb-2"></image>
					<view>已发布</view>
				</view>
				<!-- 已完成 -->
				<view class="px-3 flex4 c1" v-if="item.transport_status==2">
					<image src="../../static/images/mytask-icon3.png" class="wh44 mb-2"></image>
					<view>已完成</view>
				</view>
				<!-- 已接收 -->
				<view class="px-3 flex4 c2" v-if="item.transport_status==1">
					<image src="../../static/images/mytask-icon1.png" class="wh44 mb-2"></image>
					<view>已接收</view>
				</view>
			</view>
			<!-- 已发布 -->
			<view class="p-3 color6 text-r" v-if="item.transport_status==0">发布时间：{{item.create_time}}</view>
			<!-- 已接收 -->
			<view class="p-3 color6 d-flex j-end a-center" v-if="item.transport_status==1">
				<view>接收时间：{{Utils.timeto(item.receive_time*1000,'ymd-hms')}}</view>
				<view class="btn60-c Mgb colorf ml-2" @click="goPay(index)">去支付</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0,
				mainData:[],
				searchItem:{
					level:1,
					type:2,
				},
				day:'',
				night:'',
				Utils:this.$Utils,
				distriData:{}
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.day = uni.getStorageSync('user_info').thirdApp.day;
			self.night = uni.getStorageSync('user_info').thirdApp.night;
			self.$Utils.loadAll(['getMainData','getDistriData'], self);
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
					self.$Utils.finishFunc('getDistriData');
				};
				self.$apis.distriGet(postData, callback);
			},
			
			goPay(index) {
				const self = this;	
				const postData = {
					wxPay:{
						price:parseFloat(self.mainData[index].price).toFixed(2)
					}
				};	
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.mainData[index].id
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
								count : parseFloat(self.mainData[index].product.ration).toFixed(2),
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
										self.getMainData(true)
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
								self.getMainData(true)
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
				postData.getAfter = {
					label:{
						tableName:'Label',
						middleKey:'task_id',
						key:'id',
						searchItem:{thirdapp_id:2},
						condition:'=',
						info:['title']
					},
					product:{
						tableName:'Product',
						middleKey:'product_id',
						key:'id',
						searchItem:{thirdapp_id:2},
						condition:'=',
						info:['ratio']
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},
			
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
