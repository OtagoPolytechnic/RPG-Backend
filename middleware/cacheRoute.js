import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300, checkperiod: 310 });

const cacheRoute = (req, res, next) => {
  const key = req.originalUrl + req.headers.authorization;

  const cachedRes = cache.get(key);

  if (req.method !== 'GET' && cachedRes) {
    cache.del(key);
    return next();
  } else if (cachedRes) {
    return res.json(cachedRes);
  } else {
    res.originalSend = res.json;
    res.json = (body) => {
      res.originalSend(body);
      cache.set(key, body);
    };
    return next();
  }
};

export default cacheRoute;
