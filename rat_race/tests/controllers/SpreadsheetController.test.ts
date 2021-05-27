import { mocked } from 'ts-jest/utils';
import { Response, Request } from 'express';
import { SpreadsheetController } from '../../src/controllers/SpreadsheetController'
import Spreadsheet from '../../src/models/Spreadsheet';
import Room from '../../src/models/Room';
import { PORT } from '../../src/consts';

jest.mock('../../src/models/Spreadsheet');
jest.mock('../../src/models/Room');

describe("SpreadsheetController",() => {
    const mockResponse = {
        render: jest.fn(),
        redirect: jest.fn()
    } as unknown as Response;
    const mockedSpreadsheet = mocked(Spreadsheet, true);
    const mockedRoom = mocked(Room, true);

    beforeEach(() =>{
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    
    describe('create', () => {
        const mockRequest = { params: { roomId: 111 }, body: { name: "test" } } as unknown as Request;
        const sampleSpreadsheet = { id: 555 } as unknown as void;

        test('redirects to new spreadsheet', async () => {
            mockedSpreadsheet.create.mockResolvedValue(sampleSpreadsheet);
            await SpreadsheetController.create(mockRequest, mockResponse);
            expect(mockResponse.redirect).toHaveBeenCalledWith('/room/111/spreadsheet/555');
        });
        
        test('create spreadsheet', async () => {
            mockedSpreadsheet.create.mockResolvedValue(sampleSpreadsheet);
            await SpreadsheetController.create(mockRequest, mockResponse);
            expect(mockedSpreadsheet.create).toHaveBeenCalledWith({name: "test", roomId: 111});
        });
    });

    describe('list',() =>{
        const mockRequest = {params: {roomId: 123} } as unknown as Request;
        const sampleRoom = { name: 'zz', id: 123 } as unknown as Room;
        const sampleSpreadsheets = [{s:1}, {s:2}] as unknown as Spreadsheet[];

        test('queries for all spreadsheets', async () => {
            mockedRoom.findByPk.mockResolvedValue(sampleRoom);
            mockedSpreadsheet.findAll.mockResolvedValue(sampleSpreadsheets);

            await SpreadsheetController.list(mockRequest,mockResponse);
            expect(mockedSpreadsheet.findAll).toHaveBeenCalledWith({where: {roomId: 123}});
        });

        test('render spreadsheet template', async () => {
            mockedRoom.findByPk.mockResolvedValue(sampleRoom);
            mockedSpreadsheet.findAll.mockResolvedValue(sampleSpreadsheets);

            await SpreadsheetController.list(mockRequest, mockResponse);
            expect(mockResponse.render).toHaveBeenCalledWith('room', {
                url: `http://localhost:${PORT}/room/123`,
                roomId: 123,
                roomName: 'zz',
                spreadsheetList: [{s:1}, {s:2}] 
            });
        });
    });
});