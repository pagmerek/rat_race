import { Request, Response, Router } from 'express';
import { Controller } from '../interfaces/Controller';
import Exercise, { AssignError } from '../models/Exercise';
import Room from '../models/Room';
import Spreadsheet from '../models/Spreadsheet';
import { PORT } from '..';

export class ExerciseController implements Controller {
    private router: Router = Router({ mergeParams: true })

    constructor() {
        this.router.get('/', ExerciseController.list);
        this.router.post('/exercise/create', ExerciseController.create);
        this.router.post('/exercise/:exerciseId', ExerciseController.assign);
    }
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { roomId, spreadsheetId } = req.params;
            await Exercise.create({ label: req.body.label, spreadsheetId: parseInt(spreadsheetId) });
            res.redirect(`/room/${roomId}/spreadsheet/${spreadsheetId}`);
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }
    public static async list(req: Request, res: Response): Promise<void> {
        try {
            const success = req.query.success;
            const { roomId, spreadsheetId } = req.params;
            const currentSpreadsheet = await Spreadsheet.findByPk(spreadsheetId)
            if(currentSpreadsheet===null) throw new Error('Spreadsheet with given id does not exist')
            const currentRoom =  await currentSpreadsheet.getRoom();
            const spreadsheetList = await Spreadsheet.findAll({ where: { roomId: roomId } });
            const exerciseList = await Exercise.findAll({ where: { spreadsheetId: spreadsheetId }, order: [['id', 'ASC']]});
            const timeCreated = currentSpreadsheet.createdAt; 
            res.render('room',
                {   
                    success: success,
                    createdAt: timeCreated,
                    spreadsheetList: spreadsheetList,
                    exerciseList: exerciseList,
                    roomName: currentRoom.name,
                    roomId: roomId,
                    spreadsheetId: spreadsheetId,
                    spreadsheetName: currentSpreadsheet.name,
                    url: `http://localhost:${PORT}/room/${currentRoom.id}`

                });
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }

    public static async assign(req: Request, res: Response) {
        const { roomId, spreadsheetId, exerciseId } = req.params;
        let success = true;
        try {
            const currentExercise = await Exercise.findByPk(exerciseId);
            if (currentExercise === null) throw new Error('Exercise with given id does not exist');
            (await currentExercise.assign(req.body.exerciseForm[0], req.body.exerciseForm[1])).save();
            res.redirect(`/room/${roomId}/spreadsheet/${spreadsheetId}/?success=${success}`)
        } catch (e) {
            if(e instanceof AssignError){
                success=false;
                res.redirect(`/room/${roomId}/spreadsheet/${spreadsheetId}/?success=${success}`)
            }else{
                console.log(e);
                res.render('error');
            }
        }
    }

    public getRouter(): Router {
        return this.router;
    }

}