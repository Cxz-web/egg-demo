'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const {
		router,
		controller,
		io
	} = app;
	router.get('/', controller.home.index);
	router.get('/news', controller.news.list);
	router.get('/demo', controller.demo.index);

	router.post('/essay', controller.essay.sumbitEssay)
	router.get('/essay', controller.essay.getEssay)
	io.of('/io').route('serve', io.controller.nsp.exchange);
};
