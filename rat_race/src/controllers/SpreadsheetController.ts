import { Router, Response, Request } from 'express';
import { Controller } from '../interfaces/Controller'
import Spreadsheet from '../models/Spreadsheet';
import Room from '../models/Room';
import { PORT } from '../consts';

export class SpreadsheetController implements Controller {
    private router: Router = Router({mergeParams: true});

    constructor() {
        this.router.get('/', SpreadsheetController.list);
        this.router.post('/spreadsheet/create', SpreadsheetController.create);
    }
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { roomId } = req.params;
            const newSpreadsheet = await Spreadsheet.create({ roomId: parseInt(roomId), name: req.body.name });
            res.redirect(`/room/${roomId}/spreadsheet/${newSpreadsheet.id}`)
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public static async list(req: Request, res: Response): Promise<void> {
        try {
            console.log('xDDDD');
            const { roomId } = req.params;
            const currentRoom = await Room.findByPk(roomId);
            if (currentRoom === null) throw new Error('Room with given roomId does not exist');
            const spreadsheetList = await currentRoom.getSpreadsheets()
            res.render('room', 
            { 
                url: `http://localhost:${PORT}/room/${currentRoom.id}`,
                room: currentRoom,
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
