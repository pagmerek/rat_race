import { mocked } from 'ts-jest/utils';
import Exercise from '../../src/models/Exercise';
import User from '../../src/models/User';

jest.mock('../../src/models/Exercise');

describe('User', () => {
    test('getPoints', () => {
        const mockedCount = mocked(Exercise.count, true);
        mockedCount.mockResolvedValue(10);

        const points = User.getPoints('Adam', 'Smith');
        expect(points).toEqual(10);
    })
})