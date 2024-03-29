const CONFIG = {
	
        //开发环境配置http://106.12.155.217/project/
        development: {
                loginTitleTxt: "欢迎使用选购商城", // 登录页标题
                copyrightTxt: "选购商城v1.0", // 版本信息
                assetsPath: "http://www.zhimakuaikai.com", // 静态资源路径
                baseUrl: "http://www.zhimakuaikai.com/api/public/index.php/api/v1/",
                tokenKey: "WECHAT_TRADE", // 登录标识
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
        },

        //生产环境配置
        production: {
                loginTitleTxt: "欢迎使用选购商城", // 登录页标题
                copyrightTxt: "选购商城v1.0", // 版本信息
                assetsPath: "http://www.zhimakuaikai.com", // 静态资源路径
                baseUrl: "http://www.zhimakuaikai.com/api/public/index.php/api/v1/",
                tokenKey: "WECHAT_TRADE", // 登录标识
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
        }

}
export default CONFIG[process.env.NODE_ENV];
