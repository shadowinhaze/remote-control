import { App } from './src/app';
import { ReservePort } from './src/constants/params';
import { httpServer } from './src/http_server';
import 'dotenv/config';

const HTTP_PORT = process.env.HTTP_PORT || ReservePort.httpPort;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const app = new App();
app.startConnection();
// wss.on("close", () => {});
