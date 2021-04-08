<template>
	<view>
		
		<image src="../../static/images/thelogin-icon.png" mode="widthFix" class="p-fX bottom-0"></image>
		
		<view class="px-7 p-r">
			<view class="mTxt">欢迎来到芝麻开门</view>
			
			<input type="number" v-model="user_no"  placeholder="请输入邀请码" />
			<view class="btn80 Mgb colorf w-100 shadowM" @click="bind()">确定</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_no:'',
				Router:this.$Router,
			}
		},
		onLoad(options) {
			const self = this;
			/* var options = self.$Utils.getHashParameters();
			self.user_no = options[0].user_no; */
		},
		methods: {
			
			
			
			bind() {
				const self = this;
				const postData = {};
				if(self.user_no==''){
					self.$Utils.showToast('请填写邀请码', 'none');
					return
				};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					//child_no:uni.getStorageSync('user_info').user_no,
					parent_no:self.user_no
				};
				const callback = (data) => {
					if (data.solely_code == 100000) {
						self.$Utils.showToast('提交成功', 'none');
						setTimeout(function() {
							self.Router.redirectTo({route:{path:'/pages/shopIndex/shopIndex'}})
							return
						}, 800)
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}
				};
				self.$apis.userUpdate(postData, callback);
			},
		}
	}
</script>

<style scoped>
input{width: 100%;font-size: 26rpx;text-align: center;height: 80rpx;border: 1px solid #B1A4F4;border-radius: 10rpx;margin: 230rpx 0 70rpx;}
</style>
