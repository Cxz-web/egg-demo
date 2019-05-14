'use strict';
const fs = require('fs')
const Controller = require('egg').Controller;

const appid = 'wx422c9ac4e3e57691'
const secret = '9e014ab3610c8a685c9031bc7df67ac5'

let token = null
let toekn_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`

let ticket = null



class UserController extends Controller {
	
	async getToken() {
		let ctx = this.ctx
		const result = await ctx.curl(toekn_url, {
			dataType: 'json',
			timeout: 10000,
		});
		const access_token = result.data.access_token
		let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi' + `&access_token=${access_token}` 
		const result2 = await ctx.curl(url, {
			dataType: 'json',
			timeout: 10000
		});
		
		
		ctx.body = {
			package: result2.data.ticket
		}
	}
	
	// 后台查询全部数据
	async queryAll() {
		let ctx = this.ctx
		const res = await this.app.mysql.select('swa', {
			orders: [['num','desc']]
		})
		if(!res) {
			ctx.body = {
				list: null
			}
			return 
		}
		ctx.body = {
			list: res
		}
	}
	
	// 后台查询一个人数据
	async queryOne() {
		let ctx = this.ctx
		let phone = ctx.request.query.phone || '12345678910'
		const post = await this.app.mysql.get('swa', { phone: phone })
		if(!post) {
			ctx.body = {
				list: null
			}
			return
		}
		ctx.body = {
			list: post
		}
	}
	
	// 查询我当前的票数
	async myRank() {
		let ctx = this.ctx
		let phone = ctx.request.query.phone
		let list = ctx.app.cache
		let res = null
		let index = -1
		if(Array.isArray(list)) {
			index = list.findIndex((item) => {
					return item.phone === phone
				  })
		}
		if(index >=0 ) {
			ctx.body = {
				msg: 'suc',
				list: list[index] || null,
				rank: index + 1
			}
		}else {
			ctx.body = {
				msg: 'suc',
				list:  null
			}
		}
		
		
	}
	
	// 查询前10名 
	async allRank() {
		let ctx = this.ctx
		// const res = await this.app.mysql.select('swa', {
		// 	orders: [['num','desc']], 
		// 	limit: 10
		// })
		let list = ctx.app.cache.slice(0, 10)
		
		ctx.body ={
			msg:  'suc',
			list: list
		}
	}
	
	// 点赞
	async addRank() {
		let ctx = this.ctx
		let params = ctx.request.body
		const ip = ctx.ip
		const phone = params.phone 
		const ipRes = await this.app.mysql.get('ip', { ip:   ip})
		if(ipRes) {
			ctx.body = {
				msg: 'repeat',
				type: 1
			}
			return 
		}else {
			await this.app.mysql.insert('ip', { ip: ip, add: 'false'})
		}
		
		
		const res = await this.app.mysql.get('swa', { phone:   phone})
		if(!res) {
			const result = await this.app.mysql.insert('swa', { phone: phone, num: 1 })
		}else {
			let num = res.num
			let params = {
				num: ++ res.num,
				id: res.id
			}
			const result = await this.app.mysql.update('swa', params)
		}
		
		ctx.body = {
			msg: 'successful',
			type: 0
		}
		
	}
	
 
	
	
	
	
	async register() {
		/* this.ctx.set('Access-Control-Allow-Credentials', true); */
		/* this.ctx.cookies.set('coun1t', 1, {
			httpOnly: false,
			signed: false	
		}); */
                let ctx = this.ctx
		ctx.cookies.set('demo', 1, {
                        httpOnly: false,
                        signed: false,
                        maxAge: 24 * 3600 * 1000
                });

		

		let params = this.ctx.request.body

		const userId = await this.app.mysql.get('user', { userId: params.userId });
		const userName = await this.app.mysql.get('user', { userName: params.userName });
		if(!userId && !userName) {
			let result = await this.app.mysql.insert('user', params)
			this.ctx.body = {
				msg: 'suc',
				response: '200',
				code: 0
			}
			return
		} 
		
		this.ctx.body = {
			msg: 'fail',
			response: '已经注册了',
			code: 1
		}
		/*  */
		
	}
	
	async getSession() {
		let ctx = this.ctx
		console.log(ctx.request.headers)
		ctx.cookies.set('demo', 2, {
  			httpOnly: false,
  			signed: false,
			maxAge: 24 * 3600 * 1000,
			domain: 'www.cxzweb.club'
		});

		console.log(ctx.session.userId)
		if (ctx.session.userId) {
			ctx.body = {
				msg: '已登陆',
				response: '200'
			}
			return
		}

		ctx.session.userId = 'demo'
		ctx.body = {
		

			msg: '没登陆',
			response: '400'
		}
	}
	
	async login() {
		let ctx = this.ctx
		let params = this.ctx.request.body
		let userId = ctx.session.userId;
		
		
		if(!userId) {
			ctx.session.userId = params.name
		}
		const res = await this.app.mysql.get('user', params);
		if(!res) {
			this.ctx.body = {
				msg: 'fail',
				response: '400',
				code: 1
			}
			return
		} 
		this.ctx.body = {
			msg: res,
			response: '200',
			code: 0
		}
	}
	
	
	
		
}


module.exports = UserController;

