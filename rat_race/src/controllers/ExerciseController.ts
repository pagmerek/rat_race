import { Request, Response, Router } from 'express';
import { Controller } from '../interfaces/Controller';
import Exercise, { AssignError } from '../models/Exercise';
import Spreadsheet from '../models/Spreadsheet';
import { PORT } from '../consts';

export default class ExerciseController implements Controller {
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
            if(currentSpreadsheet === null) throw new Error('Spreadsheet with given id does not exist')
            const currentRoom =  await currentSpreadsheet.getRoom();
            const spreadsheetList = await currentRoom.getSpreadsheets();
            console.log('11111')
            const exerciseList = await currentSpreadsheet.getExercises();
            console.log('22222')
            res.render('room',
                {   
                    success: success,
                    spreadsheetList: spreadsheetList,
                    exerciseList: exerciseList,
                    room: currentRoom,
                    currentSpreadsheet: currentSpreadsheet,
                    url: `http://localhost:${PORT}/room/${currentRoom.id}`
                });
        } catch (e) {
            console.error(e.message);
            res.render('error');
        }
    }

    public static async assign(req: Request, res: Response) {
        const { roomId, spreadsheetId, exerciseId } = req.params;
        try {
            const currentExercise = await Exercise.findByPk(exerciseId);
            if (currentExercise === null) throw new Error('Exercise with given id does not exist');
            (await currentExercise.assign(req.body.exerciseForm[0], req.body.exerciseForm[1])).save();
            res.redirect(`/room/${roomId}/spreadsheet/${spreadsheetId}/?success=${true}`)
        } catch (e) {
            if(e instanceof AssignError){
                res.redirect(`/room/${roomId}/spreadsheet/${spreadsheetId}/?success=${false}`)
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