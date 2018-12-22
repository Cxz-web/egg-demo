module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    console.log(app.config.env)
	const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    console.log(match, 'match');
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  };
};

/* function (a) {
	let i = 0
	return requestNext(a[i]) {
		i++
		axios.get(a[i]).then(){
			if( ) return requestNext
		}
	}
}
 */
