import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'
import Spreadsheet from '../../src/models/Spreadsheet';

export class SpreadsheetController implements Controller{
    private router: Router = Router();

    public static create(req: Request, res: Response): void{
        // Room.create();
        const rooms = {};
        res.render('rooms', rooms);
    }
    public static get(req: Request, res: Response): void{

    }

    public static list(req: Request, res: Response): void{

    }
    public getRouter(): Router{
        return Router();
    }
}
