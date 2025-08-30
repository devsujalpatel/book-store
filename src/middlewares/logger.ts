import { NextFunction, Request, Response } from "express";
import fs from "node:fs";


export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const log = `\n[${new Date().toISOString()}] ${req.method} ${req.path} ${
    res.statusCode
  }`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next();
};