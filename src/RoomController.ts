import { Router, Response, Request } from 'express';
import { Controller } from './interfaces/Controller'

export class RoomController implements Controller{
    private route : string = '/room';
    private router: Router = Router();

    public static create(req: Request, res: Response): void{
        const rooms = {};
        res.render('rooms', {});
    }

    public getRouter(): Router{
        return Router();
    }
}
