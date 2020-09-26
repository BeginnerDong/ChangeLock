<template>
	<view>
		
		<view class="list shadowM">
			<view class="li" :class="liCurr==0?'on':''" @click="changeLi(0)">全部</view>
			<view class="li" :class="liCurr==1?'on':''" @click="changeLi(1)">机械锁</view>
			<view class="li" :class="liCurr==2?'on':''" @click="changeLi(2)">指纹锁</view>
			<view class="li" :class="liCurr==3?'on':''" @click="changeLi(3)">门把手</view>
		</view>
		
		<view class="font-26 line-h flex flex-wrap px-3">
			<view class="mt-3 gird" v-for="(item,index) in 4" :key="index"
			@click="Router.redirectTo({route:{path:'/pages/detail/detail'}})">
				<image src="../../static/images/mall-img.png" class="img"></image>
				<view class="py-2">
					<view class="avoidOverflow">美利保C级锁芯</view>
					<view class="price colorR pt-3">240</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				liCurr:0
			}
		},
		onLoad(options) {
			const self = this;
			if(options.type){
				self.liCurr = options.type;
			}
		},
		methods: {
			
			changeLi(index){
				const self = this;
				self.liCurr = index;
			}
			
		}
	}
</script>

<style scoped>
.li{width: 25%;}
.img{width: 210rpx;height: 210rpx;border-radius: 10rpx;}
.gird{margin-right: 31rpx;}
.gird:nth-child(3n){margin-right: 0;}
</style>
