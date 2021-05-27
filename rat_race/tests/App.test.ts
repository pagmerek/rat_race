import express, { Express } from 'express';
import { Sequelize } from 'sequelize/types';
import { mocked } from 'ts-jest/utils';
import { App } from '../src/App';
import { ControllerStub } from './stubs/ControllerStub';


jest.mock('express');
jest.mock('sequelize');
jest.mock('../src/database');

describe('App', () => {
    const sampleSequelize = { sync: jest.fn() } as unknown as Sequelize;
    const mockedSequelize = mocked(sampleSequelize, true);

    const mockedExpressConstructor = mocked(express, true);
    const sampleExpress = { set: jest.fn(), use: jest.fn() } as unknown as Express;
    const mockedExpressInstance = mocked(sampleExpress, true);

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    test('creates express instance', () => {
        mockedExpressConstructor.mockReturnValue(mockedExpressInstance);
        new App(sampleSequelize, 5555);
        expect(mockedExpressConstructor).toHaveBeenCalled();
    });

    test('syncs database', () => {
        mockedExpressConstructor.mockReturnValue(mockedExpressInstance);
        new App(sampleSequelize, 5555);
        expect(mockedSequelize.sync).toHaveBeenCalled();
    });

    test('adds controller', () => {
        mockedExpressConstructor.mockReturnValue(mockedExpressInstance);
        const app = new App(mockedSequelize, 5555);
        const controller = new ControllerStub();
        app.addController(controller)
        expect(mockedExpressInstance.use).toHaveBeenCalled();
    })
});
