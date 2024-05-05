if (String(process.env.NODE_ENV).trim() !== 'dev') {
  require('module-alias/register');
}
import app from './app';

(async () => {
  await app();
})();
