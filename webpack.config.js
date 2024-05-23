module.exports = {
    target: 'webworker',
    externals: [
      '@cloudflare/kv-asset-handler',
      '@neondatabase/serverless'
    ],
  }