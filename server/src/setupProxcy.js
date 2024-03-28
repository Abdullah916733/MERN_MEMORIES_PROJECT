// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Match any requests starting with /api
    createProxyMiddleware({
      target: "http://localhost:5000", // Your backend server address
      changeOrigin: true,
    })
  );
};
