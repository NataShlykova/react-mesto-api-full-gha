const cors = [
  'http://localhost:3000',
  'http://localhost:3001',
  // 'https://130.193.48.152',
  // 'http://130.193.48.152',
  // 'https://project-mesto.nomoredomains.monster',
  // 'http://project-mesto.nomoredomains.monster',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const methods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (cors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', methods);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
