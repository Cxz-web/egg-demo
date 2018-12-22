'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async index() {
	  
    this.ctx.body = 123;
  }
}

module.exports = DemoController;
