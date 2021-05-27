import { mocked } from 'ts-jest/utils';
import { Request, Response } from 'express';
import ExerciseController from '../../src/controllers/ExerciseController';
import Exercise from '../../src/models/Exercise';
import Spreadsheet from '../../src/models/Spreadsheet';
import Room from '../../src/models/Room';
import { PORT } from '../../src/consts';

jest.mock('../../src/models/Exercise');
jest.mock('../../src/models/Spreadsheet');
jest.mock('../../src/models/Room');


describe('ExerciseController', () => {
    const response = { 
        render: jest.fn(),
        redirect: jest.fn(),
    } as unknown as Response;
    const mockedExercise = mocked(Exercise, true);

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    describe('create', () => {
        const request = { body: { label: 'test_exercise' }, params: { spreadsheetId: "123", roomId: "345" } } as unknown as Request;
        const sampleExercise = {} as unknown as void;
    
        test('creates new exercise', async () => {
            mockedExercise.create.mockResolvedValue(sampleExercise);

            await ExerciseController.create(request, response);
            expect(mockedExercise.create).toHaveBeenCalledWith({ label: 'test_exercise', spreadsheetId : 123});
        });
    
        test('renders new exercise template', async () => {
            mockedExercise.create.mockResolvedValue(sampleExercise);

            await ExerciseController.create(request, response);
            expect(response.redirect).toHaveBeenCalledWith(`/room/345/spreadsheet/123`);
        });
    });

    describe('assign', () => {
        const request = { 
            params: { 
                exerciseId: 123,
                roomId: 222,
                spreadsheetId: 333
            },
            body: {
                exerciseForm: ['Adam', 'Smith']
            } 
        } as unknown as Request;
        const mockedExerciseInstance = mocked(new Exercise(), true); 


        test('queries for certain exercise', async () => {
            mockedExercise.findByPk.mockResolvedValue(mockedExerciseInstance);
            mockedExerciseInstance.assign.mockResolvedValue(mockedExerciseInstance);

            await ExerciseController.assign(request, response);
            expect(mockedExercise.findByPk).toHaveBeenCalledWith(123);
        })

        test('assigns user to exercise', async () => {
            mockedExercise.findByPk.mockResolvedValue(mockedExerciseInstance);
            mockedExerciseInstance.assign.mockResolvedValue(mockedExerciseInstance);

            await ExerciseController.assign(request, response);
            expect(mockedExerciseInstance.assign).toHaveBeenCalledWith('Adam', 'Smith');
        });
    
        test('renders updated spreasheet template', async () => {
            mockedExercise.findByPk.mockResolvedValue(mockedExerciseInstance);
            mockedExerciseInstance.assign.mockResolvedValue(mockedExerciseInstance);

            await ExerciseController.assign(request, response);
            expect(response.redirect).toHaveBeenCalledWith(`/room/222/spreadsheet/333/?success=${true}`);
        });
    });

    describe('list', () => {
        const request = { params: { spreadsheetId: 123, roomId: 555 }, query: {success: true} } as unknown as Request;
        const mockedSpreadsheet = mocked(Spreadsheet, true)

        const sampleSpreadsheet = { getRoom: jest.fn(), getExercises: jest.fn() } as unknown as Spreadsheet;
        const mockedSpreadsheetInstance = mocked(sampleSpreadsheet, true)

        const sampleRoom = { getSpreadsheets: jest.fn(), id: 123 } as unknown as Room;
        const mockedRoomIstance = mocked(sampleRoom, true)

        const sampleSpreadsheetList = [ {a :1}, {b: 2}] as unknown as Spreadsheet[];
        const sampleExerciseList = [ {a :3}, {b: 4}] as unknown as Exercise[];

        test('fetches current room', async () => {
            mockedSpreadsheet.findByPk.mockResolvedValue(mockedSpreadsheetInstance);
            mockedSpreadsheetInstance.getRoom.mockResolvedValue(mockedRoomIstance);
            mockedSpreadsheetInstance.getExercises.mockResolvedValue(sampleExerciseList);
            mockedRoomIstance.getSpreadsheets.mockResolvedValue(sampleSpreadsheetList);


            await ExerciseController.list(request, response);
            expect(mockedRoomIstance.getSpreadsheets).toHaveBeenCalled();
        });
    
        test('renders spreasheet template', async () => {
            mockedSpreadsheet.findByPk.mockResolvedValue(mockedSpreadsheetInstance);
            mockedSpreadsheetInstance.getRoom.mockResolvedValue(mockedRoomIstance);
            mockedSpreadsheetInstance.getExercises.mockResolvedValue(sampleExerciseList);
            mockedRoomIstance.getSpreadsheets.mockResolvedValue(sampleSpreadsheetList);

            await ExerciseController.list(request, response);
            expect(response.render).toHaveBeenCalledWith('room', {
                success: true,
                spreadsheetList: sampleSpreadsheetList,
                exerciseList: sampleExerciseList,
                room: mockedRoomIstance,
                currentSpreadsheet: mockedSpreadsheetInstance,
                url: `http://localhost:${PORT}/room/${123}`
            });
        });
    });
});