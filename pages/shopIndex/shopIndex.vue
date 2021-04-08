<template>
	<view>
		<view class="bg-mask flex4 colorf" v-show="noFoucs">
			<image src="../../static/images/topromote-img2.jpg" class="wh300"></image>
			<view class="mt-2">推荐关注公众号，享更多福利</view>
			<view>长按二维码识别关注</view>
			<image @click="foucs"  src="../../static/images/close.png" class="wh70 mt-2"></image>
		</view>
		<!-- banner -->
		<swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="3000" indicator-active-color="#FAAA30">
			<block v-for="(item,index) in sliderData" :key="index">
				<swiper-item class="swiper-item">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="slide-image" />
				</swiper-item>
			</block>
		</swiper>
		
		<!-- 金刚区 -->
		<view class="font-26 line-h flexX py-4">
			<view class="flex4 w-33 flex-shrink" v-for = "(item,index) in labelData" :key="index"
			:data-id = "item.id"
			@click="Router.navigateTo({route:{path:'/pages/classify/classify?id='+$event.currentTarget.dataset.id}})">
				<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="wh100 mb-2"></image>
				<view>{{item.title?item.title:''}}</view>
			</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<!-- 热门推荐 -->
		<view class="px-3">
			<view class="tit p-r pt-4">
				<view class="font-32 pl-1 font-w p-r line-h">热门推荐</view>
			</view>
			
			<view class="font-26 line-h flex flex-wrap">
				<view class="mt-3 gird" v-for="(item,index) in mainData" :key="index" :data-id = "item.id"
				@click="Router.navigateTo({route:{path:'/pages/detail/detail?id='+$event.currentTarget.dataset.id}})">
					<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="img"></image>
					<view class="py-2">
						<view class="avoidOverflow">{{item.title?item.title:''}}</view>
						<view class="price colorR pt-3">{{item.price?item.price:''}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-mask" v-show="isNew">
			<view class="bg-white mx-1 radius10">
				<view class="text-c colorR font-40 font-w pt-2" style="margin-top: 200rpx;">
					新用户专享！
				</view>
				<view class="p-r px-4 mt-3 coupon pb-4" v-for="(item,index) in userCouponData" :key="index">
					<image src="../../static/images/coupons-img.png" mode="widthFix"></image>
					<view class="p-aXY px-8 pb-4 pt-0 colorf flex1 overflow-h">
						<view class="b-f5 flex4 line-h txt">
							<view class="font-34">满{{item.condition}}可用优惠券</view>
							<view class="font-24 pt-3">有效期至：{{Utils.timeto(item.invalid_time,'ymd')}}</view>
						</view>
						<view class="font-70"><text class="font-30">￥</text>{{item.value}}</view>
					</view>
				</view>
			</view>
			<view class="btn80  colorf mt-4 mx-3 shadowM" style="background-color: #DD524D;" @click="addCoupon">立即领取</view>
		</view>
		
		
		<view style="height: 120rpx;"></view>
		<!-- footer -->
		<view class="footer bT-f5">
			<view class="item on">
				<image src="../../static/images/nabar1-a.png" mode=""></image>
				<view>首页</view>
			</view>
			<view class="item" @click="Router.redirectTo({route:{path:'/pages/public/public'}})">
				<image src="../../static/images/nabar2.png" mode=""></image>
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
				Router:this.$Router,
				sliderData:[],
				labelData:[],
				mainData:[],
				searchItem:{type:1,thirdapp_id:2},
				userCouponData:[],
				isNew:false,
				Utils:this.$Utils,
				noFoucs:false
			}
		},
		onLoad() {
			const self = this;
			self.param = self.$Utils.getHashParameters()[0];
			
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getSliderData','getLabelData','getMainData','getUserInfoData'], self);
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
			
			foucs(){
				const self = this;
				self.noFoucs = !self.noFoucs
			},
			
			addCoupon(){
				const self = this;
				uni.showLoading();
				setTimeout(function() {
					self.Router.navigateTo({route:{path:'/pages/useCoupon/useCoupon'}})
				}, 1000);
			},
			
			tokenGet() {
				const self = this;
				const postData = {
					searchItem: {
						user_no: 'UA12340153639156'
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userData = res.info;
						uni.setStorageSync('user_token', res.token);
						uni.setStorageSync('user_no', res.info.user_no);
						uni.setStorageSync('user_info', res.info);
						var time = parseInt(new Date().getTime()) + 3500000;
						uni.setStorageSync('token_expire_time',time);
						var param = self.$Utils.getHashParameters()[0];
						self.getUserInfo()
					}
					console.log('res', res)
					//self.getUserCouponData()
					self.$Utils.finishFunc('tokenGet');
				};
				self.$apis.tokenGet(postData, callback);
			},
			
			getUserInfoData() {
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
				
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.userInfoData = res.info.data[0];
						if(self.param.type=='staff'&&self.userInfoData.parent.length==0){
							self.Router.redirectTo({route:{path:'/pages/invitation/invitation'}})
							return
						};
						if(self.userInfoData.phone==''){
							self.Router.redirectTo({route:{path:'/pages/userInfo/userInfo'}})
							return
						}
						//self.getUserCouponData()
						
						if(uni.getStorageSync('isNew')){
							self.getUserCouponData();
							uni.removeStorageSync('isNew')
						}
						self.getUserInfo()
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getUserInfo() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.openid = uni.getStorageSync('user_info').openid;
				const callback = (res) => {
					if(res.info.openid&&res.info.subscribe==0){
						self.noFoucs = true
					}
				};
				self.$apis.getUserInfo(postData, callback);
			},
			
			getUserCouponData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {use_step:1}
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userCouponData = res.info.data
						self.isNew = true
					}
				};
				self.$apis.userCouponGet(postData, callback);
			},
			
			getMainData(isNew) {
				var self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					}
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.order = {
					listorder:'desc'
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id:1
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.sliderData = res.info.data
					}
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type:3
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
		}
	};
</script>

<style scoped>
.swiper-box,swiper-item{width: 100%;height: 300rpx;}
.tit::before{content: '';width: 36rpx;height: 10rpx;background-image: linear-gradient(to right,#B1A4F4,#fff);position: absolute;left: 0;bottom: 0;}
.img{width: 210rpx;height: 210rpx;border-radius: 10rpx;}
.gird{margin-right: 31rpx;}
.gird:nth-child(3n){margin-right: 0;}
.px-8{padding-left: 80rpx;padding-right: 80rpx;}
</style>