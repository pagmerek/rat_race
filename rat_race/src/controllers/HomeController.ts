import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'



export class HomeController implements Controller{
    private router: Router = Router();

    constructor() {
        this.router.get('/', HomeController.get);
    }

    public static get(req: Request, res: Response): void{
        try {
            res.render('home', {});
        } catch (e) {
            console.error(e.message)
            res.render('error', {});
        }

    }

    public getRouter(): Router{
        return this.router;
    }
}

export default HomeController;