const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use('/users',createProxyMiddleware({ target: 'http://localhost:3000',changeOrigin: true, }));
  // app.use(proxy('/test', { target: 'http://localhost:3000' }));
};