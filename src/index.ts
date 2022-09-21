import connect, {
  ErrorHandleFunction,
  HandleFunction,
  IncomingMessage,
} from "connect";
import { ServerResponse } from "http";
import { createLogger } from "./logger";

const hello: HandleFunction = (
  _: IncomingMessage,
  res: ServerResponse<IncomingMessage>
): void => {
  throw "hoge";
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
};

const env = process.env.NODE_ENV || "development";

const myErrorHandler: ErrorHandleFunction = (
  err: any,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  next: any
): void => {
  res.statusCode = 500;
  switch (env) {
    case "development":
      console.error("Error:");
      console.error(err);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(err));
      break;
    default:
      res.end("Server error");
  }
};

const app = connect();
app
  .use(createLogger(":hoge :url :method"))
  .use(hello)
  .use(myErrorHandler)
  .listen(3000);
