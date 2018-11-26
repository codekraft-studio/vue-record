module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-record/'
    : '/',
  css: {
    extract: false
  }
}
