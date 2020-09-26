
		<!-- 顶部列表 -->
		<!-- <view class="list mb-2 shadowM">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">待支付</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">待发货</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">待收货</view>
			<view class="li" :class="liCurr==4?'on':''" @click="changeLi(4)">已完成</view>
		</view> -->
		
		<!-- 数量加减 -->
		<!-- <view class="count">
			<view class="countIcon"><image src="../../static/images/shopping-icon4.png" class="countIcon1"></image></view>
			<view class="countNum">1</view>
			<view class="countIcon"><image src="../../static/images/shopping-icon3.png" class="countIcon2"></image></view>
		</view> -->
		
		<!-- 系统轮播 -->
		<!-- <swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="3000" indicator-active-color="#FF6F48">
			<block v-for="(item,index) in 2" :key="index">
				<swiper-item class="swiper-item">
					<image src="../../static/images/home-banner.png" class="slide-image" />
				</swiper-item>
			</block>
		</swiper> -->
		
		<!-- 插件轮播、   sliderData数据格式数组套对象，对象属性含url为图片路径       需引入和导出-->
		<!-- <container>
			<ls-swiper :list="sliderData"  :loop="true" :dots='true' :autoplay='true' height='140' imgRadius='10' imgWidth='355'/>
		</container> -->
		
		<!-- 我的页面列表 -->
		<!-- <view class="font-30 line-h mx-25 flex"
		@click="Router.navigateTo({route:{path:'/pages/contactUs/contactUs'}})">
			<image src="../../static/images/my-icon1.png" class="wh36 mr-3"></image>
			<view class="flex1 flex-1 bB-f5 py-4">
				<view>联系我们</view>
				<image src="../../static/images/my-icon6.png" class="R-icon ml-1"></image>
			</view>
		</view> -->
		
		<!-- 信息填写、选择 -->
		<!-- <view class="py-4 bB-e1 flex1">
			<view>家庭住址</view>
			<input type="text" value="" placeholder="请输入" placeholder-style="color:#999" />
		</view>
		<picker mode="selector">
			<view class="py-4 bB-e1 flex1">
				<view>项目类别</view>
				<view class="font-24 color9 flex-1 text-r">请选择</view>
				<image src="../../static/images/my-icon6.png" class="R-icon ml-1"></image>
			</view>
		</picker> -->
		
	
<script>
	// 导入轮播插件
	// import container from '../../components/container/index.vue'
	// import LsSwiper from '../../components/ls-swiper/index.vue'
	import token from "./common/token.js"
	export default {
		onLaunch: function() {	
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 富文本样式 */
	@import "/assets/style/quill.css";
	
	
	/* 公共样式 */
	@import "/common/css/common.css";
	/* 公共样式 */
	@import "/common/css/main.css";
	
	uni-swiper .uni-swiper-dots-horizontal{line-height: 16rpx;bottom: 5px;}
	
	uni-tabbar .uni-tabbar__icon{width: 44rpx;height: 44rpx;}
	uni-page-head .uni-page-head__title{font-weight: normal;}
	/* uni-swiper .uni-swiper-dot{width: 12rpx;height: 6rpx;border-radius: 6rpx;background-color: #c5c5c5;}
	uni-swiper .uni-swiper-dot-active{width: 20rpx;} */
	.ql-editor img{max-width: 100%;margin: 0 auto;}
	.detailBanner .uni-swiper-dots{bottom: 30rpx;}
	
	.mTxt{font-size: 52rpx;padding-top: 120rpx;font-weight: bold;}
</style>
