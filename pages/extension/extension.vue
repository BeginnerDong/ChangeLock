<template>
	<view>
		<view class="p-r pt-3">

			<image src="../../static/images/topromote-img.png" mode="widthFix" class="p-aX top-0"></image>

			<view class="bg-white radius20 p-3 shadow mx-3 p-r">
				<view class="d-flex j-end a-center" @click="Router.navigateTo({route:{path:'/pages/staffCode/staffCode'}})">
					<view>推广码</view>
					<image src="../../static/images/release-icon1.png" class="R-icon ml-2"></image>
				</view>
				<view class="flex4 pt-3 pb-4 line-h">
					<view class="font-26 color8">总佣金</view>
					<view class="font-70 font-w py-4">{{userInfoData.order?userInfoData.order.allPrice:'0.00'}}</view>
					<view class="btn60-c bg-f5">推广总数： <text class="colorM">{{userInfoData.child?userInfoData.child.count:'0'}}</text></view>
				</view>
				<view class="flex line-h py-4">
					<view class="flex4 w-50">
						<view class="font-26 color9">已提现</view>
						<view class="font-36 pt-3">{{userInfoData.order?userInfoData.order.has:'0.00'}}</view>
					</view>
					<view class="flex4 w-50">
						<view class="font-26 color9">可提现</view>
						<view class="font-36 pt-3">{{userInfoData.order?userInfoData.order.less:'0.00'}}</view>
					</view>
				</view>
				<view class="btn80 Mgb colorf mt-4" @click="Router.navigateTo({route:{path:'/pages/withDrawal/withDrawal?money='+userInfoData.order.less}})">申请提现</view>
			</view>

		</view>

		<view class="font-32 p-3 mt-1 bB-e1 line-h">流水记录</view>
		<view class="px-3 line-h font-30">

			<view class="flex py-3 bB-e1" v-for="(item,index) in mainData" :key="index">
				<image :src="item.user&&item.user[0]?item.user[0].headImgUrl:''" class="wh90 radius-5"></image>
				<view class="pl-2 flex-1">
					<view>{{item.user&&item.user[0]?item.user[0].nickname:''}}</view>
					<view class="font-24 color6 pt-2">{{item.create_time}}</view>
				</view>
				<view class="colorR">{{item.count}}</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router: this.$Router,
				userInfoData:{},
				mainData:[]
			}
		},
		onLoad() {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserInfoData','getMainData'], self);
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


			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getStaffToken';
				postData.getAfter = {
					order: {
						tableName: 'FlowLog',
						searchItem: {
							type: 2,
							count: ['>', 0]
						},
						middleKey: 'user_no',
						key: 'user_no',
						condition: 'in',
						compute: {
							allPrice: [
								'sum',
								'count',
								{
									type: 2,
									count: ['>', 0],
									user_no: uni.getStorageSync('staff_info').user_no
								}
							],
							has: [
								'sum',
								'count',
								{
									type: 2,
									count: ['<', 0],
									user_no: uni.getStorageSync('staff_info').user_no
								}
							],
							less: [
								'sum',
								'count',
								{
									type: 2,
									user_no: uni.getStorageSync('staff_info').user_no
								}
							]
						},
					},
					child: {
						tableName: 'Distribution',
						searchItem: {
							status:1
						},
						middleKey: 'user_no',
						key: 'parent_no',
						condition: 'in',
						compute: {
							count: [
								'count',
								'count',
								{
									status:1
								}
							],
						},
					},
				};
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userInfoData = res.info.data[0];
						self.userInfoData.order.allPrice = parseFloat(self.userInfoData.order.allPrice).toFixed(2)
						self.userInfoData.order.has = parseFloat(self.userInfoData.order.has).toFixed(2)
						self.userInfoData.order.less = parseFloat(self.userInfoData.order.less).toFixed(2)
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
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
				postData.tokenFuncName = 'getStaffToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					count:['>',0],
					type:2
				};
				postData.getAfter = {
					user:{
						tableName:'User',
						middleKey:'relation_user',
						key:'user_no',
						searchItem:{status:1},
						condition:'=',
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.flowLogGet(postData, callback);
			},

		}
	}
</script>

<style scoped>
	.btn60-c {
		width: 260rpx;
	}
</style>
