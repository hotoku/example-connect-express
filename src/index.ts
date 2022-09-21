import connect from "connect";
import { ServerResponse } from "http";
import { createLogger } from "./logger";

const hello = (
  _: connect.IncomingMessage,
  res: ServerResponse<connect.IncomingMessage>
) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
};

const app = connect();
app.use(createLogger(":hoge :url :method")).use(hello).listen(3000);
