
import { mocked } from 'ts-jest/utils';
import { Response, Request } from 'express';
import RoomController from '../../src/controllers/RoomController'
import Room from '../../src/models/Room';

jest.mock('../../src/models/Room');
jest.mock('../../src/database');
jest.mock('express');

describe("RoomController",() => {
    const mockResponse = {
        render: jest.fn()
    } as unknown as Response;
    const mockRequest = {} as unknown as Request;
    const mockedRoom = mocked(Room, true);
    describe('create', () => {
        test('render room template', async () => {
            const sampleRoom = { name: 'zz', id: 123 } as unknown as void;
            mockedRoom.create.mockResolvedValue(sampleRoom);
            await RoomController.create(mockRequest, mockResponse);
            expect(mockResponse.render).toHaveBeenCalledWith('room_created', {"name": "zz", "roomUrl": "localhost:5000/room/123"});
        });
    });
});