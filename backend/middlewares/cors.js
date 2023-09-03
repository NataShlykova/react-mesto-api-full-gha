const cors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://158.160.108.91',
  'http://158.160.108.91',
  'https://domainname.students.nomoredomainsicu.ru',
  'http://domainname.students.nomoredomainsicu.ru',
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
