import { config as dotEnv } from 'dotenv';
import app from '@config/app';

dotEnv();

const port = process.env.PORT || 3000;
const serviceName = process.env.SERVICE_NAME || 'Micro';

app.listen(port, () => {
  const msg = `[HOST]: ${serviceName} service listening on: http://localhost:${port}`;
  // eslint-disable-next-line no-console
  console.log(`\x1b[42m\x1b[30m${msg}\x1b[0m`);
});
