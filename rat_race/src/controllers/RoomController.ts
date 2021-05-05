import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'
import Room from '../models/Room'
export class RoomController implements Controller{
    private route : string = '/room';
    private router: Router = Router();

    public static create(req: Request, res: Response): void{
        Room.create();
        res.render('rooms', {});
    }

    public getRouter(): Router{
        return Router();
    }
}
