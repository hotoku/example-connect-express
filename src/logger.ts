import { IncomingMessage, NextFunction, NextHandleFunction } from "connect";
import { ServerResponse } from "http";

export const createLogger = (format: string): NextHandleFunction => {
  const regexp = /:(\w+)/g;

  const ret = (
    req: IncomingMessage,
    _: ServerResponse<IncomingMessage>,
    next: NextFunction
  ) => {
    const msg = format.replace(regexp, (x: string, y: any): string => {
      const temp: any = req;
      const ret: string = temp[y];
      if (ret === undefined) {
        return `${x}=undefined`;
      }
      return `${x}=${ret}`;
    });
    console.log(msg);
    next();
  };
  return ret;
};
