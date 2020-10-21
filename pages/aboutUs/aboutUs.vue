<template>
	<view>
		
		<image :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" mode="widthFix"></image>
		
		<view class="p-3">
			<view class="content ql-editor text-center" style="padding:0;" v-html="mainData.content">
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData:{}
			}
		},
		
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
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
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style>

</style>
