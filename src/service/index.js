import axios from 'axios'
import Qs from 'qs'
import { Message } from 'gs-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => Qs.stringify(data)

axios.interceptors.response.use(undefined, err => {
  if (err) {
    Message.error({
      content: err.message || '抱歉，网络错误'
    })
    return Promise.reject(err)
  }
})

axios.interceptors.response.use(res => {
  return res.data
})

export default axios
