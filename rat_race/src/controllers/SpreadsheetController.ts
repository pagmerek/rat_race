import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'
import Spreadsheet from '../models/Spreadsheet';
import { PORT } from '..';
import Room from '../models/Room';

export class SpreadsheetController implements Controller {
    private router: Router = Router({mergeParams: true});

    constructor() {
        this.router.get('/', SpreadsheetController.list);
        this.router.post('/spreadsheet', SpreadsheetController.create);
    }
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { roomId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom === null) throw new Error('Room with given roomId does not exist');
            await Spreadsheet.create({ roomId: parseInt(roomId), name: req.body.name });
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            res.render('room', 
            { 
                url:`http://localhost:${PORT}/room/${currentRoom.id}`,
                roomId: roomId,
                roomName: currentRoom.name,
                spreadsheetList: spreadsheetList
            });
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public static async list(req: Request, res: Response): Promise<void> {
        try {
            const { roomId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom === null) throw new Error('Room with given roomId does not exist');
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            res.render('room', 
            { 
                url: `http://localhost:${PORT}/room/${currentRoom.id}`,
                roomId: roomId,
                roomName: currentRoom.name,
                spreadsheetList: spreadsheetList
            });
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public getRouter(): Router {
        return this.router;
    }
}
