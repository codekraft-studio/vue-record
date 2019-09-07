module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-record/'
    : '/',
  css: {
    extract: false
  }
}
