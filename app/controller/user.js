'use strict';
const fs = require('fs')
const Controller = require('egg').Controller;

class UserController extends Controller {
	
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

