import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';

enum Code {
  success = 200,
  notFound = 404,
}

export const httpServer = http.createServer((req, res) => {
  const dirname = path.resolve(path.dirname(''));
  const filePath =
    dirname + (req.url === '/' ? '/front/index.html' : `/front${req.url}`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(Code.notFound);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(Code.success);
    res.end(data);
  });
});
