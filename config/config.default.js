'use strict';

module.exports = appInfo => {
	
	const config = exports = {};
	
	env: 'debug',

	config.keys = appInfo.name + '_1543541934316_8226';

	config.proxy = true;

	config.middleware = [];

	config.view = {

		defaultViewEngine: 'nunjucks',
		mapping: {
			'.tpl': 'nunjucks',
		},
	};
	
	config.maxProxyCount = 1;

	config.news = {
		pageSize: 5,
		serverUrl: 'https://hacker-news.firebaseio.com/v0',
	};

	config.middleware = [
		'robot',
	];

	config.robot = {
		ua: [
			/Baiduspider/i,
		],
	};

	config.onerror = {
		errorPageUrl: (err, ctx) => {
			console.log(err)
			return '/500'
		}
	};


	config.io = {
		init: {}, // passed to engine.io
		namespace: {
			'/io': {
				connectionMiddleware: ['auth'],
				packetMiddleware: []
			},
			'/example': {
				connectionMiddleware: [],
				packetMiddleware: []
			}
		}
	};

	config.security = {
            domainWhiteList: ['*'],
      		csrf: {
			enable:false
		}
	};
	
	config.cors = {
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
	};

	config.alinode = {
		server: 'wss://agentserver.node.aliyun.com:8080',
		appid: '77668',
		secret: '1b896f80150d7cf6217f71bd6d3e1e5325d6fae9',
		logdir: '/home/ubuntu/logs/alinode/'
	};
	
config.multipart = {
   fileExtensions: ['.pptx', '.ppt']
}
	

	config.mysql = {
		client: {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: '123456',
			database: 'test'
		},
		app: true,
		agent: false
	};	


return config;
};





/* config.redis = {
		client: {
			port: 6379, 
			host: '127.0.0.1',
			password: '8562871',
			db: 0,
		}
	}
 */
