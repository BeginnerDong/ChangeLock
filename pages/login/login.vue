<template>
	<view>
		
		<image src="../../static/images/thelogin-icon.png" mode="widthFix" class="p-fX bottom-0"></image>
		
		<view class="px-7 p-r">
			<view class="mTxt">欢迎来到芝麻开门</view>
			
			
			<view>
				<view class="font-32 font-w">账号</view>
				<input type="text" v-model="submitData.login_name" placeholder="请输入" placeholder-style="color:#999" />
			</view>
			<view>
				<view class="font-32 font-w">密码</view>
				<input type="password" v-model="submitData.password" placeholder="请输入" placeholder-style="color:#999" />
			</view>
			
			<view class="btn80 Mgb colorf w-100 shadowM"
			@click="submit">登录</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Router:this.$Router,
				submitData:{
					login_name:'',
					password:''
				}
			}
		},
		methods: {
			
			submit() {
				const self = this;
				uni.showLoading({
					mask:true,
					title:'登陆中...'
				});
				const postData = {
					login_name: self.submitData.login_name,
					password:self.submitData.password
				};
				postData.noLoading = true;
				if (self.$Utils.checkComplete(self.submitData)) {
					const callback = (res) => {
						if (res.solely_code == 100000) {
							uni.setStorageSync('staff_token', res.token);
							uni.setStorageSync('staff_info', res.info);
							setTimeout(function() {
								self.Router.redirectTo({route:{path:'/pages/extension/extension'}})
							}, 1000);
						} else {
							self.$Utils.showToast(res.msg,'none')
						}
					}
					self.$apis.loginByStaff(postData, callback);
				} else {
					self.$Utils.showToast('请补全登录信息', 'none')
				};
			},
			
		}
	}
</script>

<style scoped>
.mTxt{padding-bottom: 80rpx;}
input{width: 100%;font-size: 26rpx;height: 95rpx;margin-bottom: 60rpx;border-bottom: 1px solid #f5f5f5;padding: 0;}
.btn80{margin-top: 160rpx};
</style>
