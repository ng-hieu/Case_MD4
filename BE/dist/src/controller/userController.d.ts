import { Request, Response } from "express";
declare class UserController {
    private userService;
    constructor();
    getAlluser: (req: Request, res: Response) => Promise<void>;
    registerUser: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;