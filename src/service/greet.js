import http from './index.js'

export function getGreetList () {
  return http.get('/api/greet/list')
}
