import { mocked } from 'ts-jest/utils';
import { Request, Response, Router } from 'express';
import ExerciseController from '../../src/controllers/ExerciseController';
import Exercise from '../../src/models/Exercise';

jest.mock('../../src/models/Exercise');

describe('ExerciseController', () => {
    const response = { render: jest.fn() } as unknown as Response;
    const mockedExercise = mocked(Exercise, true);

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    describe('create', () => {
        const request = { params: { exerciseName: 'test_exercise' } } as unknown as Request;
        test('creates new exercise', () => {
            ExerciseController.create(request, response);
            expect(mockedExercise.create).toHaveBeenCalledWith({ exerciseName: 'test_exercise'});
        });
    
        test('renders new exercise template', () => {
            ExerciseController.create(request, response);
            expect(response.render).toHaveBeenCalledWith('spreadsheet', expect.any(Object));
        });
    });

    describe('get', () => {
        const request = { params: { exerciseId: 123 } } as unknown as Request;
        test('returns certain exercise', () => {
            ExerciseController.get(request, response);
            expect(mockedExercise.findOne).toHaveBeenCalledWith({where: { id: 123 } });
        });
    
        test('renders detail exercise template', () => {
            ExerciseController.get(request, response);
            expect(response.render).toHaveBeenCalledWith('exercise', expect.any(Object));
        });
    });

    describe('assign', () => {
        const request = { params: { exerciseId: 123, firstName: 'Adam', secondName: 'Smith' } } as unknown as Request;

        const mockedExerciseInstance = mocked(new Exercise(), true);
        mockedExercise.findOne.mockResolvedValue(mockedExerciseInstance);

        test('queries for certain exercise', () => {
            expect(mockedExercise.findOne).toHaveBeenCalledWith({where: {exerciseId: 123}});
        })

        test('assigns user to exercise', () => {
            ExerciseController.assign(request, response);
            expect(mockedExerciseInstance.assign).toHaveBeenCalledWith('Adam', 'Smith');
        });
    
        test('renders updated spreasheet template', () => {
            ExerciseController.assign(request, response);
            expect(response.render).toHaveBeenCalledWith('spreadsheet', expect.any(Object));
        });
    });

    describe('list', () => {
        const request = { params: { spreadsheetId: 123 } } as unknown as Request;
        test('queries for all spreadsheets', () => {
            ExerciseController.list(request, response);
            expect(mockedExercise.findAll).toHaveBeenCalledWith({where: {spreadsheetId: 123}});
        });
    
        test('renders spreasheet template', () => {
            ExerciseController.list(request, response);
            expect(response.render).toHaveBeenCalledWith('spreadsheet', expect.any(Object));
        });
    });
});