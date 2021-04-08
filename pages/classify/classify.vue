<template>
	<view>
		
		<view class="list shadowM">
			<view class="li" :class="!searchItem.category_id?'on':''" @click="changeLi(-1)">全部</view>
			<view class="li" v-for="(item,index) in labelData" :key="index"
			:class="searchItem.category_id&&searchItem.category_id==item.id?'on':''" @click="changeLi(index)">{{item.title}}</view>
		</view>
		
		<view class="font-26 line-h flex flex-wrap px-3">
			<view class="mt-3 gird" v-for="(item,index) in mainData" :key="index" :data-id = "item.id"
			@click="Router.redirectTo({route:{path:'/pages/detail/detail?id='+$event.currentTarget.dataset.id}})">
				<image :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" class="img"></image>
				<view class="py-2">
					<view class="avoidOverflow">{{item.title?item.title:''}}</view>
					<view class="price colorR pt-3">{{item.price?item.price:''}}</view>
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
				liCurr:0,
				searchItem:{type:1,thirdapp_id:2},
				mainData:[],
				labelData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate =  {
				count: 0,
				currentPage: 1,
				pagesize: 15,
				is_page: true,
			};
			var options = self.$Utils.getHashParameters();
			self.id = options[0].id;
			self.searchItem.category_id = self.id;
			self.$Utils.loadAll(['getMainData','getLabelData'], self);
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
			
			changeLi(index){
				const self = this;
				if(index>=0){
					self.searchItem.category_id = self.labelData[index].id;
				}else{
					delete self.searchItem.category_id
				};
				self.getMainData(true)
			},
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type:3
				};
				/* postData.getBefore = {
					parent:{
						tableName:'Label',
						middleKey:'parentid',
						key:'id',
						searchItem:{title:['in',['商品类别']]},
						condition:'in'
					}
				}; */
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
			
			getMainData(isNew) {
				var self = this;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 15,
						is_page: true,
					}
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
		}
	}
</script>

<style scoped>
.li{width: 25%;}
.img{width: 210rpx;height: 210rpx;border-radius: 10rpx;}
.gird{margin-right: 31rpx;}
.gird:nth-child(3n){margin-right: 0;}
</style>
