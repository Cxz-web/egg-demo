// {app_root}/app/io/controller/nsp.js
const Controller = require('egg').Controller;

class NspController extends Controller {
	async exchange() {
		const {
			ctx,
			app
		} = this;

		const nsp = app.io.of('/io');
		const message = ctx.args[0] || {};
		
		const socket = ctx.socket;
		const query = socket.handshake.query;
		const {
			room,
			
		} = query;
		console.log(message)
		const client = socket.id;
		console.log(query)

		try {
			/*  const { target, payload } = message;
			  if (!target) return; */
			/* const msg = ctx.helper.parseMsg('exchange', payload, { client, target }); */
			/* let res = await app.redis.get('Users') */
			/* console.log(res) */
			nsp.emit('chat', {
				message,
				userId: query
			});
				
			 /* const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      nsp.emit(target, msg);
 */



			/* console.log(message)
			socket.emit('#online', message); */
		} catch (error) {
			app.logger.error(error);
		}
	}
}

module.exports = NspController;
