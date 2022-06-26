import { App } from './src/app';
import { httpServer } from './src/http_server';
import 'dotenv/config';

const RESERVE_HTTP_PORT = 3000;

const HTTP_PORT = process.env.HTTP_PORT || RESERVE_HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const app = new App();
app.startConnection();
// wss.on("close", () => {});
