<template>
	<view>
		
		<view class="h700">
			<map :latitude="mainData.latitude" v-if="markers[0].latitude"  :longitude="mainData.longitude" style="height: 700rpx;width: 100%;"
			:markers="markers"></map>
			<!-- <image src="../../static/images/contact-img.png" mode="widthFix"></image> -->
		</view>
		
		<view class="bg-white radius20-T p-3 p-r tt">
			<view class="flex p-2 b-e1 mb-3">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon1.png" class="icon1"></image>
				</view>
				<view class="pl-2" style="width: 68%;">
					<view class="font-24 color6 pb-1">联系电话</view>
					<view>{{mainData.phone?mainData.phone:''}}</view>
				</view>
				<view @click="phoneCall" class="btn50 Mgb colorf  shadowM font-26" style="font-size: 26rpx;padding: 0 10rpx;">一键拨号</view>
			</view>
			<view class="flex p-2 b-e1 mb-3">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon2.png" class="icon2"></image>
				</view>
				<view class="pl-2" style="width: 68%;">
					<view class="font-24 color6 pb-1">客服微信</view>
					<view>{{mainData.wechat?mainData.wechat:''}}</view>
				</view>
				<view @click="copy" class="btn50 Mgb colorf  shadowM font-26" style="font-size: 26rpx;padding: 0 10rpx;">一键复制</view>
			</view>
			<view class="flex p-2 b-e1">
				<view class="w100 flex0">
					<image src="../../static/images/contact-icon.png" class="icon1"></image>
				</view>
				<view class="pl-2" style="width: 68%;">
					<view class="font-24 color6 pb-1">联系地址</view>
					<view>{{mainData.address?mainData.address:''}}</view>
				</view>
				<view @click="map" class="btn50 Mgb colorf  shadowM font-26" style="font-size: 26rpx;padding: 0 10rpx;">一键导航</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import icanH5Api from "../../js_sdk/ican-H5Api/ican-H5Api.js"
	export default {
		data() {
			return {
				mainData:{},
				markers:[
					{
						iconPath:'../../static/images/dingwei.png'
					},
				]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			phoneCall(){
				const self = this;
				uni.makePhoneCall({
					phoneNumber:self.mainData.phone
				})
			},
			
			map(){
				const self = this;
				 uni.openLocation({
					latitude: self.mainData.latitude ,
					longitude: self.mainData.longitude ,
					success: function () {
						console.log('success');
					}
				});
			},
			
			copy(){
				const self = this;
				uni.setClipboardData({
					data:self.mainData.wechat,
					success(res) {
						console.log(res.data)
						if(res.data){
							self.$Utils.showToast('复制成功','none')
						}
					}
				})
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					menu_id:2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
						const regex = new RegExp('<img', 'gi');
						self.mainData.content = self.mainData.content.replace(regex, `<img style="max-width: 100%;"`);
						self.mainData.latitude = parseFloat(self.mainData.latitude);
						self.mainData.longitude = parseFloat(self.mainData.longitude);
						self.markers[0].latitude = self.mainData.latitude;
						self.markers[0].longitude = self.mainData.longitude;
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style scoped>
.tt{margin-top: -40rpx;}

.w100{width: 80rpx;}
.icon1{width: 42rpx;height: 52rpx;}
.icon2{width: 58rpx;height: 48rpx;}
</style>
