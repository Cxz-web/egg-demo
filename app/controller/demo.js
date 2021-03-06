'use strict';
const fs = require('fs')
const path = require('path')

const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

const myFs = (path) => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			resolve(files)
		})
	})
}



class DemoController extends Controller {
	async index() {
		const myPath = path.resolve(__dirname, `../public/ppt/${this.ctx.params.name}`);

		var rs = fs.createReadStream(myPath);
		/* rs.pipe(this.ctx.body) */

		this.ctx.body = rs
	}

	async getPPT() {

		const firPath = path.resolve(__dirname, '../public')
		const secPath = path.join(firPath, '/ppt_data/')
		const res = await myFs(secPath)
		this.ctx.body = res
	}

	async uploadPPT() {
		const path = require('path');
		const ctx = this.ctx;
		const stream = await ctx.getFileStream();
		if (!stream) {
			ctx.body = {
				msg: '请先选择文件'
			}
			return
		}
		console.log(stream)
		const firPath = path.resolve(__dirname, '../public')
		const secPath = path.join(firPath, '/ppt/')
		const name = stream.filename
		const finalPath = secPath + name
		let write;
		try {
			write = fs.createWriteStream(finalPath)
			stream.pipe(write)
		} catch (err) {
			// 必须将上传的文件流消费掉，要不然浏览器响应会卡死
			throw err;
		}

		ctx.body = {
			msg: '上传成功',
			path: `/public/avatar/${name}`,
		}

	}

	async upload() {

		const path = require('path');
		const ctx = this.ctx;

		const stream = await ctx.getFileStream();


		if (!stream) {
			ctx.body = {
				msg: '请先选择文件'
			}
		}
		const extend = stream.mime.substr(stream.mime.indexOf('/') + 1, stream.mime.length)
		const firPath = path.resolve(__dirname, '../public')
		const secPath = path.join(firPath, '/ppt_data/')
		const name = ctx.helper.randomNum(true, 20, 7) + '.' + extend
		const finalPath = secPath + name
		console.log(finalPath)
		let write;
		try {
			write = fs.createWriteStream(finalPath)
			stream.pipe(write)

		} catch (err) {
			// 必须将上传的文件流消费掉，要不然浏览器响应会卡死

			throw err;
		}

		ctx.body = {
			msg: '上传成功',
			path: name

		};
	}

}

module.exports = DemoController;
