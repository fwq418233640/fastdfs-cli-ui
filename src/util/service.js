import req from './request'

export const http = {
  post: (url, param) => req.post(url, param),
  get: (url) => req.get(url)
};
