<template>
	<view>
		
		<view class="flex m-3">
			<image src="../../static/images/release-icon.png" class="dw-icon mr-1"></image>
			<view class="font-w">{{chooseCity.title?chooseCity.title:''}}</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="flex py-4 bB-f5">
				<view class="w150">任务类型</view>
				<picker mode="selector" class="flex-1" :range="labelData" range-key="title" @change="changeType">
					<view class="flex1 w-100">
						<view class="font-26 color9" :style="taskType!=''?'color:#222':''">{{taskType!=''?taskType:'请选择'}}</view>
						<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
					</view>
				</picker>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">时间段</view>
				<view class="flex">
					<view class="flex pr-5" @click="changeDay(1)">
						<!-- <image src="../../static/images/release-icon2.png" class="wh36 mr-1"></image> -->
						<image :src="submitData.time_type==1?'../../static/images/release-icon2.png':'../../static/images/release-icon3.png'" class="wh36 mr-1"></image>
						<view>白天</view>
					</view>
					<view class="flex"  @click="changeDay(2)">
						<image :src="submitData.time_type==2?'../../static/images/release-icon2.png':'../../static/images/release-icon3.png'" class="wh36 mr-1"></image>
						<!-- <image src="../../static/images/release-icon3.png" class="wh36 mr-1"></image> -->
						<view>夜间</view>
					</view>
					
				</view>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">时间</view>
				<view class="font-26">{{timeType}}</view>
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w150">价格</view>
				<view class="font-26">{{chooseCity.price?chooseCity.price:''}}元</view>
			</view>
		</view>
		
		<view class="bg-white radius20 mx-3 mb-2 px-3">
			<view class="font-26 color9 py-3">联系人信息</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">姓名</view>
				<input type="text" v-model="submitData.name" placeholder="请输入" />
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">电话</view>
				<input type="number" maxlength="11" v-model="submitData.phone" placeholder="请输入" />
			</view>
			<view class="flex py-4 bB-f5">
				<view class="w100">地址</view>
				<input type="text" v-model="submitData.address" placeholder="请输入" />
			</view>
		</view>
		
		<view class="btn80 Mgb colorf mt-4 mx-3 shadowM" @click="Show">提交订单</view>
		
		<!-- 确认弹框 -->
		<view class="bg-mask flex0" v-show="is_show">
			<view class="mask radius10 line-h">
				<view class="color6 py-4 bB-f5 text-c">订单确认</view>
				<view>
					<view class="px-3 pt-4 d-flex ">
						<view class="color6">任务类型：</view>
						<view class="">{{taskType}}</view>
					</view>
					<view class="px-3 py-4 d-flex ">
						<view class="color6">联系人信息：</view>
						<view class="flex-1 ">
							<view class="line-h-sm pb-2">{{submitData.name}} {{submitData.phone}}</view>
							<view>{{submitData.address}}</view>
						</view>
					</view>
				</view>
				<view class="flex text-c bT-f5">
					<view class="w-50 py-4 bR-f5" @click="Show">重新输入</view>
					<view class="w-50 py-4 colorM"
					@click="Utils.stopMultiClick(submit)">确认</view>
				</view>
			</view>
		</view>
		
		
		
		
		<view style="height: 120rpx;"></view>
		<!-- footer -->
		<view class="footer bT-f5">
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/shopIndex/shopIndex'}})">
				<image src="../../static/images/nabar1.png" mode=""></image>
				<view>首页</view>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar2-a.png" mode=""></image>
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
				Utils:this.$Utils,
				Router:this.$Router,
				is_show:false,
				mainData:[],
				chooseCity:{},
				labelData:[],
				submitData:{
					task_id:'',
					time_type:1,
					name:'',
					phone:'',
					address:'',
					type:2
				},
				taskType:'',
				timeType:''
			}
		},
		onLoad(options) {
			const self = this;
			self.timeType = uni.getStorageSync('user_info').thirdApp.day;
			self.$Utils.loadAll(['getMainData','getLabelData'], self);
		},
		methods: {
			
			submit(){
				const self = this;
				uni.setStorageSync('canClick', false);
				
				var orderList = []
				
				orderList.push({product_id:self.chooseCity.id,count:1})
				
				self.addOrder(orderList)
			},
			
			addOrder(orderList) {
				const self = this;
				uni.showLoading({
					mask:true,
					title:'提交订单中...'
				});
				const postData = {}; 
				//postData.orderList = self.$Utils.cloneForm(orderList);
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.data.price = self.chooseCity.price;
				postData.data.product_id = self.chooseCity.id;
				postData.type = 2;
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				console.log('addOrder',postData);
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.$Utils.showToast('提交成功','none');
						self.submitData = {
							task_id:'',
							time_type:1,
							name:'',
							phone:'',
							address:'',
							type:2
						};
						self.taskType = '';
						self.timeType = '';
					} else {		
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};		
				};
				self.$apis.addVirtualOrder(postData, callback);
			},
			
			changeDay(e){
				const self = this;
				self.submitData.time_type = e;
				if(e==1){
					self.timeType = uni.getStorageSync('user_info').thirdApp.day;
				}else{
					self.timeType = uni.getStorageSync('user_info').thirdApp.night;
				}
			},
			
			changeType(e){
				const self = this;
				self.submitData.task_id = self.labelData[e.detail.value].id;
				self.taskType = self.labelData[e.detail.value].title;
			},
			
			Show(){
				const self = this;
				if(!self.is_show){
					var pass = self.$Utils.checkComplete(self.submitData);
					if(!pass){
						self.is_show = false;
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请补充完整信息，以便我们提供更好的服务','none')
						return
					};
				};
				self.is_show = !self.is_show;
				
			},
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type:3
				};
				postData.getBefore = {
					parent:{
						tableName:'Label',
						middleKey:'parentid',
						key:'id',
						searchItem:{title:['in',['任务类别']]},
						condition:'in'
					}
				};
				postData.order = {
					listorder:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData = res.info.data
					}
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					type:2
				};
				postData.order = {
					listorder:'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data;
						self.chooseCity = self.mainData[0]
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
		}
	}
</script>

<style>
page{background-color: #f5f5f5;}
</style>
<style scoped>
.dw-icon{width: 26rpx;height: 30rpx;}
.w150{width: 150rpx;font-size: 30rpx;}
.w100{width: 100rpx;font-size: 30rpx;}
.mask{width: 690rpx;}
</style>