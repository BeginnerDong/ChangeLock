<template>
	<view>

		<view class="flex m-3">
			<image src="../../static/images/release-icon.png" class="dw-icon mr-1"></image>
			<view class="font-w" @click="openLevel">{{pickerText}}</view>
			<!-- <picker mode="selector" :range="mainData" range-key="title" @change="changeCity">
				<view class="font-w">{{mainData.title?mainData.title:''}}</view>
			</picker> -->
			<!-- <picker mode="multiSelector" :range="mainData">
				<view class="font-w">111</view>
			</picker> -->
			
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
					<view class="flex pr-5" v-if="type==1">
						<!-- <image src="../../static/images/release-icon2.png" class="wh36 mr-1"></image> -->
						<image :src="submitData.time_type==1?'../../static/images/release-icon2.png':'../../static/images/release-icon3.png'"
						 class="wh36 mr-1"></image>
						<view>白天 {{dayStart+'点-'+dayEnd+'点'}}</view>
					</view>
					<view class="flex" v-if="type==2">
						<image :src="submitData.time_type==2?'../../static/images/release-icon2.png':'../../static/images/release-icon3.png'"
						 class="wh36 mr-1"></image>
						<!-- <image src="../../static/images/release-icon3.png" class="wh36 mr-1"></image> -->
						<view>夜间</view>
						<view>白天 {{dayEnd+'点-次日'+dayStart+'点'}}</view>
					</view>

				</view>
			</view>
			<!-- <view class="flex py-4 bB-f5">
				<view class="w150">时间</view>
				<view class="font-26">{{timeType}}</view>
			</view> -->
			<view class="flex py-4 bB-f5">
				<view class="w150">价格</view>
				<view class="font-26">{{mainData.price?mainData.price:''}}元+<span>{{type==1?'白天加价'+timePrice+'元':'夜晚加价'+timePrice+'元'}}</span></view>
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
			<!-- <view class="flex py-4 bB-f5">
				<view class="w100">地址</view>
				<input type="text" v-model="submitData.address" placeholder="请输入" />
			</view> -->
			<view class="py-4 bB-f5 flex">
				<view class="w120">所在地区</view>
				<view style="padding-left: 20rpx;">
					<view  class="flex-1 flex" @click="openAddres">
						<view class="color6 flex-1 text-right font-24" :style="submitData.city!=''?'color:#222':'color:#666'">{{submitData.city==''?'请选择':submitData.city}}</view>
						<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
					</view>
				</view>
				
			</view>
			<view class="py-4 bB-f5 flex">
				<view class="w120">详细地址</view>
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
							<view>{{submitData.city}}{{submitData.address}}</view>
						</view>
					</view>
				</view>
				<view class="flex text-c bT-f5">
					<view class="w-50 py-4 bR-f5" @click="Show">重新输入</view>
					<view class="w-50 py-4 colorM" @click="Utils.stopMultiClick(submit)">确认</view>
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
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm1" themeColor="#007AFF"></simple-address>
		<level-linkage ref="levelLinkage"  v-if="treeData.length>0"
		:pickerValueDefault="pickerValueDefault" 
		:allData="treeData"
		@onConfirm="onConfirm" themeColor='#007AFF'></level-linkage>
	</view>
</template>

<script>
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		components: {
			levelLinkage,
			simpleAddress
		},
		data() {
			return {
				pickerValueDefault: [0, 0, 0],
				pickerText: '',
				treeData: [],
				Utils: this.$Utils,
				Router: this.$Router,
				is_show: false,
				mainData: [],
				chooseCity: {},
				labelData: [],
				submitData: {
					task_id: '',
					time_type: 1,
					name: '',
					phone: '',
					address: '',
					type: 2,
					city:''
				},
				taskType: '',
				timeType: '',
				timePrice: '',
				type: '',
				dayStart: '',
				dayEnd: '',
				cityPickerValueDefault: [0, 0, 1],
			}
		},
		onLoad(options) {
			const self = this;
			self.dayStart = uni.getStorageSync('user_info').thirdApp.day;
			self.dayEnd = uni.getStorageSync('user_info').thirdApp.night;
			var myDate = new Date();
			var now = myDate.getHours();
			if (self.dayStart < now && self.dayEnd > now) {
				self.type = 1 //白天
				self.timePrice = uni.getStorageSync('user_info').thirdApp.day_price;
				self.submitData.time_type = 1
			} else {
				self.type = 2
				self.timePrice = uni.getStorageSync('user_info').thirdApp.night_price
				self.submitData.time_type = 2
			};
			self.$Utils.loadAll(['getLabelData', 'getCityData'], self);
		},
		onShow() {
			const self = this;
			self.getAddressData()
		},
		methods: {
			
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			
			onConfirm1(e) {
				const self = this;
				console.log(e);
				//self.submitData.region = e.label;
				self.submitData.city = e.labelArr.join('')
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
						self.submitData.name = self.addressData.name;
						self.submitData.phone = self.addressData.phone;
						self.submitData.city = self.addressData.city;
						self.submitData.address = self.addressData.detail;
					}
				};
				self.$apis.addressGet(postData, callback);
			},

			openLevel() {
				this.$refs.levelLinkage.open();
			},
			onConfirm(e) {
				// e 确认后选中的数据
				const self = this;
				console.log(e)
				this.pickerText = e.name;
				self.chooseCity = e.secondPick
				self.getMainData()
			},
			
			changeCity(e) {
				const self = this;
				self.chooseCity = self.mainData[e.detail.value];
			},

			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);

				var orderList = []

				orderList.push({
					product_id: self.mainData.id,
					count: 1
				})

				self.addOrder(orderList)
			},

			addOrder(orderList) {
				const self = this;
				uni.showLoading({
					mask: true,
					title: '提交订单中...'
				});
				const postData = {};
				//postData.orderList = self.$Utils.cloneForm(orderList);
				postData.data = self.$Utils.cloneForm(self.submitData);
				postData.data.price = parseFloat(parseFloat(self.mainData.price) + parseFloat(self.timePrice)).toFixed(2);
				postData.data.product_id = self.mainData.id;
				postData.type = 2;
				postData.tokenFuncName = 'getProjectToken';
				postData.noLoading = true;
				console.log('addOrder', postData);
				const callback = (res) => {
					uni.setStorageSync('canClick', true);
					if (res && res.solely_code == 100000) {
						self.$Utils.showToast('提交成功', 'none');
						self.submitData = {
							task_id: '',
							time_type: 1,
							name: '',
							phone: '',
							address: '',
							type: 2,
							city:''
						};
						self.taskType = '';
						//self.timeType = '';
						self.is_show = !self.is_show;
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.addVirtualOrder(postData, callback);
			},

			changeDay(e) {
				const self = this;
				self.submitData.time_type = e;
				if (e == 1) {
					self.timeType = uni.getStorageSync('user_info').thirdApp.day;
				} else {
					self.timeType = uni.getStorageSync('user_info').thirdApp.night;
				}
			},

			changeType(e) {
				const self = this;
				self.submitData.task_id = self.labelData[e.detail.value].id;
				self.taskType = self.labelData[e.detail.value].title;
			},

			Show() {
				const self = this;
				if (!self.is_show) {
					var pass = self.$Utils.checkComplete(self.submitData);
					if (!pass) {
						self.is_show = false;
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('请补充完整信息，以便我们提供更好的服务', 'none')
						return
					};
				};
				self.is_show = !self.is_show;

			},

			getCityData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 2
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.cityData = res.info.data;
						if (self.cityData[0].children) {
							self.chooseCity = self.cityData[0].children[0];
							self.getMainData()
							self.pickerText = self.cityData[0].title + '-' +self.cityData[0].children[0].title
						}
						self.treeData = res.info.data
						console.log(self.treeData)
					}
					self.$Utils.finishFunc('getCityData');
				};
				self.$apis.labelGet(postData, callback);
			},

			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 4
				};
				
				postData.order = {
					listorder: 'desc'
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
					type: 2,
					category_id: self.chooseCity.id
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
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
	page {
		background-color: #f5f5f5;
	}
</style>
<style scoped>
	.dw-icon {
		width: 26rpx;
		height: 30rpx;
	}

	.w150 {
		width: 150rpx;
		font-size: 30rpx;
	}

	.w100 {
		width: 115rpx;
		font-size: 30rpx;
	}
	.w120{width: 150rpx;}
	.mask {
		width: 690rpx;
	}
</style>
