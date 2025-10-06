import type { NextFunction, Request, Response } from "express";
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}
export declare const userMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=middleware.d.ts.map