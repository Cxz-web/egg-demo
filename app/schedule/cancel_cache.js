const Subscription = require('egg').Subscription;
class CancleCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 0 * * *',
      type: 'worker' // 指定所有的 worker 都需要执行
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    let res = await this.app.mysql.delete('ip', {
			add: 'false'
		})
  }
}

module.exports = CancleCache;