import type { Request, Response } from "express";
declare const resisterUser: (req: Request, res: Response) => Promise<void>;
declare const getUser: (req: Request, res: Response) => Promise<void>;
declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { resisterUser, getUser, updateUser };
//# sourceMappingURL=user.d.ts.map