
import { mocked } from 'ts-jest/utils';
import { Router, Response, Request } from 'express';
import { RoomController } from '../../src/controllers/RoomController'
import Room from '../../src/models/Room';

jest.mock('../../src/models/Room');

describe("RoomController",() => {
    const mockResponse = {
        render: jest.fn()
    } as unknown as Response;
    const mockRequest = {} as unknown as Request;
    const mockedRoom = mocked(Room,true);

    describe('create', () => {
        test('render room template xD', () => {
            RoomController.create(mockRequest, mockResponse);
            expect(mockResponse.render).toHaveBeenCalledWith('rooms', {});
        });
        
        test('create room xD', () => {
            RoomController.create(mockRequest, mockResponse);
            expect(mockedRoom.create).toHaveBeenCalled();
        });
    });
});