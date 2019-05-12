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
	router.get('/home', controller.home.index);
	router.get('/news', controller.news.list);
	
	router.get('/ppt/:name', controller.demo.index);
	router.post('/upload', controller.demo.upload);
	
	router.post('/uploadPPT', controller.demo.uploadPPT);
	
	router.get('/getPPT', controller.demo.getPPT)
	
	
	io.of('/io').route('serve', io.controller.nsp.exchange);
	
	/* User相关 */
	router.post('/register', controller.user.register)
	router.post('/login', controller.user.login)
	router.get('/getSession', controller.user.getSession)
	

	router.get('/getToken', controller.user.getToken)

	router.post('/saveData', controller.essay.saveData)
	router.post('/getData', controller.essay.getData)
	
	
	// SWA
	router.post('/addRank', controller.user.addRank)
	router.get('/myRank', controller.user.myRank)
	router.get('/allRank', controller.user.allRank)
	
};

