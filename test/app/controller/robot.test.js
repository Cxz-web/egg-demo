'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    return app.httpRequest()
      .get('/')
      .set('User-Agent', 'Baiduspsdiderasd')
      .expect(200);
  });
});
