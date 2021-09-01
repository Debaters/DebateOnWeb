const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/graphql',
//         createProxyMiddleware({
//             target: 'http://debaters.world:8080',
//             changeOrigin: true,
//         })
//     );
// };

module.exports = {
    devServer: {
      proxy: {
        '/graphql': {
          target: 'http://debaters.world:8080',
          changeOrigin: true
        }
      }
    }
  };