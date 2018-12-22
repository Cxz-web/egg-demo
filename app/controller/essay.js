'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
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
		/* res = await this.app.mysql.insert('essay', this.ctx.request.body); */

		/* 	console.log(1231231231) */

		/* const updateSuccess = res.affectedRows === 1;
		console.log(updateSuccess,123131231231232)
		if(updateSuccess) {
			this.ctx.body = res
		} else {
			this.ctx.status = 400
			this.ctx.body = 1123
		} */




		/* await this.app.mysql.insert('essay',) */

		/* const result = await this.app.mysql.insert('essay', { title: 'Hello World' });	 */
		/* const result = await this.app.mysql.update('', row); 
	
			this.ctx.body = result;
		} */
	
	
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
