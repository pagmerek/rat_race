import { mocked } from "ts-jest/utils";
import Exercise from "../../src/models/Exercise";
import User from "../../src/models/User";

describe('Exercise', () => {
    describe('assign', () => {
        const mockedUser = mocked(User, true);
        const exerciseInstance = new Exercise();

        test('assigns if user has less points', () => {
            mockedUser.getPoints.mockImplementation((firstName: string, lastName: string) => {
                if (firstName == 'Adam' && lastName == 'Smith') return 12;
                return 13;
            });
            expect(exerciseInstance.assign('Adam', 'Smith')).not.toThrowError();

        })  
        test('rejects if user has more or equal points', () => {
            mockedUser.getPoints.mockImplementation((firstName: string, lastName: string) => {
                if (firstName == 'Adam' && lastName == 'Smith') return 13;
                return 12;
            });
            expect(exerciseInstance.assign('Adam', 'Smith')).toThrowError();
        })
    })
})