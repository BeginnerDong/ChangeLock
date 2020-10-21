<template>
	<view>
		
		<!-- banner -->
		<swiper class="swiper-box" indicator-dots="indicatorDots" autoplay="autoplay" interval="3000" indicator-active-color="#FAAA30">
			<block v-for="(item,index) in mainData.bannerImg" :key="index">
				<swiper-item class="swiper-item">
					<image :src="item.url" class="slide-image" />
				</swiper-item>
			</block>
		</swiper>
		
		<view class="line-h px-3 py-4">
			<view class="font-34 pb-4">{{mainData.title?mainData.title:''}}</view>
			<view class="price font-w font-36">{{mainData.price?mainData.price:''}}</view>
		</view>
		<view class="f5Bj-H20"></view>
		
		<view class="px-3 pb-5">
			<view class="font-30 py-4 color9">详情描述</view>
			
			<div class="content ql-editor"   @click="getImg($event)" style="padding:0" v-html="mainData.content" >
				
				
			</div>
		</view>
		
		<view style="height: 120rpx;"></view>
		<view class="p-2 shadowT p-fX bottom-0 bg-white">
			<view class="btn80 Mgb colorf"
			@click="goBuy">立即购买</view>
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
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			self.id = options[0].id;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			goBuy(){
				const self = this;
				uni.setStorageSync('payPro',self.mainData);
				self.Router.navigateTo({route:{path:'/pages/submitOrder/submitOrder'}})
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id:self.id
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.swiper-box,swiper-item{width: 100%;height: 750rpx;}
</style>
