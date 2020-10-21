<template>
	<view>
		
		<view class="bg-white px-3 py-4 mb-2 flex">
			<image :src="mainData.headImgUrl?mainData.headImgUrl:'../../static/images/headImg.png'" class="wh110 radius-5"></image>
			<view class="font-32 pl-2 font-w">{{mainData.nickname?mainData.nickname:'用户'+mainData.user_no}}</view>
		</view>
		
		<view class="bg-white px-3 py-4 mb-2">
			<view class="flex"
			@click="Router.navigateTo({route:{path:'/pages/userOrder/userOrder?index=0'}})">
				<view class="font-32 font-w flex-1">我的订单</view>
				<view class="font-26 color8">全部订单</view>
				<image src="../../static/images/release-icon1.png" class="R-icon ml-1"></image>
			</view>
			<view class="d-flex j-sa a-end pt-4 font-26 line-h">
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/userOrder/userOrder?index=0'}})">
					<image src="../../static/images/my-icon3.png" class="icon1"></image>
					<view class="pt-2">全部</view>
				</view>
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/userOrder/userOrder?index=1'}})">
					<image src="../../static/images/my-icon.png" class="icon2"></image>
					<view class="pt-2">待发货</view>
				</view>
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/userOrder/userOrder?index=2'}})">
					<image src="../../static/images/my-icon1.png" class="icon3"></image>
					<view class="pt-2">待收货</view>
				</view>
				<view class="flex4"
				@click="Router.navigateTo({route:{path:'/pages/userTask/userTask?index=3'}})">
					<image src="../../static/images/my-icon2.png" class="icon4"></image>
					<view class="pt-2">已完成</view>
				</view>
			</view>
		</view>
		
		<view class="px-3 bg-white">
			<view class="flex1"
			@click="Router.navigateTo({route:{path:'/pages/userInfo/userInfo'}})">
				<image src="../../static/images/my-icon8.png" class="gr mr-2"></image>
				<view class="py-4 bB-f5 flex-1 flex1">
					<view>个人信息</view>
					<image src="../../static/images/release-icon1.png" class="R-icon"></image>
				</view>
			</view>
			<view class="flex1"
			@click="Router.navigateTo({route:{path:'/pages/userTask/userTask'}})">
				<image src="../../static/images/my-icon7.png" class="wh36 mr-2"></image>
				<view class="py-4  bB-f5 flex-1 flex1">
					<view>我的任务</view>
					<image src="../../static/images/release-icon1.png" class="R-icon"></image>
				</view>
			</view>
			<view class="flex1"
			@click="Router.navigateTo({route:{path:'/pages/address/address'}})">
				<image src="../../static/images/my-icon5.png" class="dz mr-2"></image>
				<view class="py-4  bB-f5 flex-1 flex1">
					<view>地址管理</view>
					<image src="../../static/images/release-icon1.png" class="R-icon"></image>
				</view>
			</view>
			<view class="flex1"
			@click="Router.navigateTo({route:{path:'/pages/couponList/couponList'}})">
				<image src="../../static/images/my-icon6.png" class="wh36 mr-2"></image>
				<view class="py-4  bB-f5 flex-1 flex1">
					<view>优惠券</view>
					<image src="../../static/images/release-icon1.png" class="R-icon"></image>
				</view>
			</view>
			<view class="flex1"
			@click="Router.navigateTo({route:{path:'/pages/extensionCode/extensionCode'}})">
				<image src="../../static/images/my-icon4.png" class="wh36 mr-2"></image>
				<view class="py-4 flex-1 flex1">
					<view>邀请好友</view>
					<image src="../../static/images/release-icon1.png" class="R-icon"></image>
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
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/public/public'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
				<view>发布任务</view>
			</view>
			<view class="item on">
				<image src="../../static/images/nabar3-a.png" mode=""></image>
				<view>我的</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				mainData:{}
			}
		},
		onLoad() {
			const self = this;
			
			self.$Utils.loadAll(['getUserData'], self);
		},
		methods: {
			
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.getAfter = {
					parent:{
						tableName:'Distribution',
						middleKey:'user_no',
						key:'child_no',
						searchItem:{status:1},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.mainData = res.info.data[0];
						if(uni.getStorageSync('shareUser')&&self.mainData.parent.length==0){
							self.Router.redirectTo({route:{path:'/pages/invitation/invitation?user_no='+uni.getStorageSync('shareUser')}})
							return
						};
						if(self.mainData.info.phone==''){
							self.Router.redirectTo({route:{path:'/pages/userInfo/userInfo'}})
							return
						}
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.userGet(postData, callback);
			},
			
		}
	}
</script>

<style>
page{background-color: #f5f5f5;}
</style>

<style scoped>
.icon1{width: 54rpx;height: 60rpx;}
.icon2{width: 54rpx;height: 54rpx;}
.icon3{width: 65rpx;height: 54rpx;}
.icon4{width: 55rpx;height: 52rpx;}

.gr{width: 38rpx;height: 34rpx;}
.dz{width: 32rpx;height: 40rpx;}
</style>