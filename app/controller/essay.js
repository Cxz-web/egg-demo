'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
	
	
	async saveData() {
		let updateSuccess = false
		const ppt_id =  this.ctx.request.body.id
		const content = this.ctx.request.body.content
		const sRes = await this.app.mysql.get('ppt', { ppt_id: ppt_id })
		let responseRes = null
		if(sRes) {
			console.log(12313333333333333333333)
			const res = await this.app.mysql.update('ppt', {
				id: sRes.id,
				ppt_data: content
			}) 
			updateSuccess = res.affectedRows === 1;
		}else {
			const res = await this.app.mysql.insert('ppt', {
				ppt_data: this.ctx.request.body.content,
				ppt_id: this.ctx.request.body.id
			})
			updateSuccess = res.affectedRows === 1;
		}
		
		
		
		
		if (updateSuccess) {
			this.ctx.body = {
				msg: 'ok'
			}
		} else {
			this.ctx.status = 400
			this.ctx.body = {
				msg: 'error'
			}
		}
	}
	
	
	async getData() {
		console.log('get')
		const ctx = this.ctx
		const id = this.ctx.request.body.id
		const content = await this.app.mysql.get('ppt', { ppt_id: id });
		if(!content) {
			ctx.status = 200
			this.ctx.body = {
				response: '400',
				msg: '请求失败， 没有该文章'
			}
		}else {
			ctx.status = 200
			this.ctx.body = {
				msg: 'ok',
				content: content
			}
		}
		/* await this.app.mysql. */
	}
	
	
	
	async sumbitEssay() {
		/* this.ctx.rotateCsrfSecret(); */
		
		
		const res = await this.app.mysql.insert('essay', this.ctx.request.body)
		const updateSuccess = res.affectedRows === 1;
		
		if (updateSuccess) {
			this.ctx.body = res
		} else {
			this.ctx.status = 400
			this.ctx.body = {
				msg: 'error'
			}
		}
	}
	
	
	
	async getEssay() {
		const ctx = this.ctx
		let id = this.ctx.request.body.id
		if(!id) {
			ctx.status = 200
			this.ctx.body = {
				response: '400',
				msg: '请求失败， 没有id'
			}
			return
		}
		/* await this.app.mysql. */
	}
}

module.exports = EssayController;
