import { mocked } from 'ts-jest/utils';
import { Router, Response, Request } from 'express';
import { SpreadsheetController } from '../../src/controllers/SpreadsheetController'
import Spreadsheet from '../../src/models/Spreadsheet';

jest.mock('../../src/models/Room');

describe("SpreadsheetController",() => {
    const mockResponse = {
        render: jest.fn()
    } as unknown as Response;
    const mockedSpreadsheet = mocked(Spreadsheet,true);

    beforeEach(() =>{
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    
    describe('create', () => {
        const mockRequest = {params: {name: "test"}} as unknown as Request;
        test('render new spreadsheet template', () => {
            SpreadsheetController.create(mockRequest, mockResponse);
            expect(mockResponse.render).toHaveBeenCalledWith('spreadsheet', expect.any(Object));
        });
        
        test('create spreadsheet', () => {
            SpreadsheetController.create(mockRequest, mockResponse);
            expect(mockedSpreadsheet.create).toHaveBeenCalledWith({name: "test"});
        });
    });

    describe('get', () =>{
        const mockRequest = { params: {id: 123} } as unknown as Request;
        test('returns certain spreadsheet', () => {
            SpreadsheetController.get(mockRequest, mockResponse);
            expect(mockedSpreadsheet.findOne).toHaveBeenCalledWith({where: { id:123 }});
        });
    });

    describe('list',() =>{
        const mockRequest = {params: {id: 123} } as unknown as Request;
        test('queries for all spreadsheets', () => {
            SpreadsheetController.list(mockRequest,mockResponse);
            expect(mockedSpreadsheet.findAll).toHaveBeenCalledWith({where: {id: 123}});
        });
        test('render spreadsheet template', () => {
            SpreadsheetController.create(mockRequest, mockResponse);
            expect(mockResponse.render).toHaveBeenCalledWith('spreadsheet', expect.any(Object));
        });
    });
});