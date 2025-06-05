// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Use 'false' if you want a temporary redirect
      },
    ];
  },
};
