import { Request, Response, Router } from 'express';
import { Controller } from '../interfaces/Controller';

export default class ExerciseController implements Controller {
    public static create(req: Request, res: Response) {
        res.render('test', {data: 123});
    }

    public static get(req: Request, res: Response) {

    }

    public static list(req: Request, res: Response) {

    }

    public static assign(req: Request, res: Response) {

    }

    public getRouter(): Router {
        return Router();
    }

}