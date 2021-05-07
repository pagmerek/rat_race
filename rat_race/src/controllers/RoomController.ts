import { Router, Response, Request } from 'express';
import { PORT } from '..';
import { Controller } from '../interfaces/Controller'
import Room from '../models/Room'
export class RoomController implements Controller{
    private router: Router = Router();

    constructor() {
        this.router.post('/', RoomController.create);
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const room = await Room.create(req.body);
            res.render('room_created', { name: room.name, roomUrl: `localhost:${PORT}/room/${room.id}` });
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }

    public getRouter(): Router{
        return this.router;
    }
}
