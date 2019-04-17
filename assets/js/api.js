import {
  httpGet,
  httpPost
} from './http'

export const identityCheck = (data = {}) => {
  return httpPost({
    url: '/pic/identityCheck',
    data
  })
}

export const getOrderInfo = (params) => httpGet({
  url: '/getinfo',
  params
})
