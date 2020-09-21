const axios = require('axios')
const md5 = require('md5')
const appid = '20200921000570318'
const secret = '8iaGzb7v0225xQ8SVxqq'

module.exports = {
  /**
   * 翻译方法
   * @param {string} q 查询字符串
   * @param {string} from 源语言
   * @param {string} to 目标语言
   * @returns {{data: {trans_result:[{src: string, dst: string}]}}} Promise翻译结果
   */
  translate(q, from, to) {
    var salt = Math.random()
    return axios({
      method: 'get',
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      params: {
        q,
        appid,
        from,
        to,
        salt,
        sign: md5(appid + q + salt + secret)
      }
    })
  }
}
