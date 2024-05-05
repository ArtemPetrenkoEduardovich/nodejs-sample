// eslint-disable-next-line no-extra-boolean-cast
if (!Boolean(process.env.DEVEL)) {
  require('module-alias/register');
}
import app from './app';

(async () => {
  await app();
})();
