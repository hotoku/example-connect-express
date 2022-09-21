import connect from "connect";
import { ServerResponse } from "http";

const logger = (
  req: connect.IncomingMessage,
  _: ServerResponse<connect.IncomingMessage>,
  next: connect.NextFunction
) => {
  console.log("%s, %s", req.method, req.url);
  next();
};

const hello = (
  _: connect.IncomingMessage,
  res: ServerResponse<connect.IncomingMessage>
) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
};

const app = connect();
app.use(logger).use(hello).listen(3000);
