'use strict';
const fs = require('fs')
const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
	/* if (!this.ctx.session.userId) {
		this.ctx.session.userId = 1
	}	 */
		
/* 	const fileStream = fs.createReadStream('./'); */
	
	this.ctx.cookies.set('coun1t', 1, {
		httpOnly: false,
		signed: false	
	});
	
		/* const res = await this.app.mysql.get('essay', { essay_type: 0 }); */
	/* 	let data = {
			
			essay_desc: 'node',
			essay_type: '0',
			essay_time: '2018-12-18',
			essay_id: '2',
			essay_author: 'cxz'
		} */
		 // 更新 posts 表中的记录

		/* => UPDATE `posts`
		SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE id = 123; */


	/* 	const res = await this.app.mysql.insert('essay', data); */
		this.ctx.body = 123
		
	}
}

module.exports = HomeController;
