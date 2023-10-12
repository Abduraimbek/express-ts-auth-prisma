import crypto from 'crypto';

import config from '../config';

export const random = () => {
  return crypto.randomBytes(128).toString('base64');
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(config.AUTH_SECRET)
    .digest('hex');
};
