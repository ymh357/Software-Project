const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use('/api',createProxyMiddleware({ target: 'http://52.68.78.115:5000',changeOrigin: true, }));
  // app.use(proxy('/test', { target: 'http://localhost:3000' }));
};