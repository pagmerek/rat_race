import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'
import Spreadsheet from '../models/Spreadsheet';
import { PORT } from '..';
import Room from '../models/Room';

export class SpreadsheetController implements Controller {
    private router: Router = Router();

    constructor() {
        this.router.get('/:roomId', SpreadsheetController.list);
        this.router.post('/:roomId/spreadsheet', SpreadsheetController.create);
        this.router.get('/:roomId/spreadsheet/:spreadsheetId', SpreadsheetController.get)

    }
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { roomId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom == null) throw new Error('Room with given roomId does not exist');
            await Spreadsheet.create({ roomId: Number(roomId), name: req.body.name });
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            res.render('room', { path: [roomId], roomName: currentRoom.name, spreadsheetList: spreadsheetList })
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public static async get(req: Request, res: Response): Promise<void> {
        try {
            const { roomId, spreadsheetId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom == null) throw new Error('Room with given roomId does not exist');
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            res.render('room', { path: [roomId, spreadsheetId], roomName: currentRoom.name, spreadsheetList: spreadsheetList })
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }

    public static async list(req: Request, res: Response): Promise<void> {
        try {
            const { roomId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom == null) throw new Error('Room with given roomId does not exist');
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            res.render('room', { path: [roomId], roomName: currentRoom.name, spreadsheetList: spreadsheetList })
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public getRouter(): Router {
        return this.router;
    }
}
