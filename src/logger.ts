import { match } from "assert";
import connect from "connect";
import { ServerResponse } from "http";

export type Logger = (
  req: connect.IncomingMessage,
  res: ServerResponse<connect.IncomingMessage>,
  next: connect.NextFunction
) => void;

export const createLogger = (format: string): Logger => {
  const regexp = /:(\w+)/g;

  const ret = (
    req: connect.IncomingMessage,
    res: ServerResponse<connect.IncomingMessage>,
    next: connect.NextFunction
  ) => {
    const msg = format.replace(regexp, (x: string, y: any): string => {
      const temp: any = req;
      const ret: string = temp[y];
      if (ret === undefined) {
        return "--no-value--";
      }
      return `${x}=${ret}`;
    });
    console.log(msg);
    next();
  };
  return ret;
};
