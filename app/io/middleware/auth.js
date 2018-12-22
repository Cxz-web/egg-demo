const PREFIX = 'room';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/io');
    const query = socket.handshake.query;

    // 用户信息
    const { room, userId } = query;
    const rooms = [ room ];
	/* app.redis.set('foo', 'bar'); */
	
/* 	let users = await app.redis.get('Users'); */
	/* 
	if(!users) {
		app.redis.set('Users', {
			userId: id
		});
	} else {
		users.userId = id
		app.redis.set('Users', users);
	} */
	
	
	/* app.userId = {
		userId: id
	} */
	
	logger.debug('#user_info', id, room, userId);

    const tick = (id, msg) => {
      logger.debug('#tick', id, msg);

      // 踢出用户前发送消息
      socket.emit(id, helper.parseMsg('deny', msg));

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      nsp.adapter.remoteDisconnect(id, true, err => {
        logger.error(err);
      });
    };

    // 检查房间是否存在，不存在则踢出用户
    // 备注：此处 app.redis 与插件无关，可用其他存储代替
    /* const hasRoom = await app.redis.get(`${PREFIX}:${room}`); */

    /* logger.debug('#has_exist', hasRoom); */

    if (!true) {
      tick(id, {
        type: 'deleted',
        message: 'deleted, room has been deleted.',
      });
      return;
    }

    // 用户加入
    logger.debug('#join', room);
    socket.join(room);

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.debug('#online_join', clients);
	  console.log('来一个新用户')
      // 更新在线用户列表
	  process.nextTick(()=>{
		  nsp.to(room).emit('online', {
		  clients,
		  action: 'join',
		  target: 'participator',
		  message: `User(${id}) joined.`,
		  });
	  })
	 /* setTimeout(()=>{
		  
	  },13) */
     
	  /* console.log(id)
	  nsp.emit(id, {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${id}) joined.`,
      }); */
    });

    await next();

          
    logger.debug('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.debug('#online_leave', clients);
 
      // 获取 client 信息
      // const clientsDetail = {};
      // clients.forEach(client => {
      //   const _client = app.io.sockets.sockets[client];
      //   const _query = _client.handshake.query;
      //   clientsDetail[client] = _query;
      // });

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `User(${id}) leaved.`,
      });
    });

  };
};