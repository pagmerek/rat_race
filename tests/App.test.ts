import { Sequelize } from 'sequelize';
import express from 'express';
import { mocked } from 'ts-jest/utils';
import { App } from '../src/App';
import { ControllerStub } from './stubs/ControllerStub';

jest.mock('sequelize')
jest.mock('express')

describe('App', () => {

    test('creates Sequelize instance xD', () => {
        const mockedSequelizeConstructor = mocked(Sequelize, true);
        new App('database_urlxD', 5555);
        expect(mockedSequelizeConstructor).toHaveBeenCalledWith('database_urlxD');
    });

    test('creates express instance xD', () => {
        const mockedExpressConstructor = mocked(express, true);
        new App('database_urlxD', 5555);
        expect(mockedExpressConstructor).toHaveBeenCalled();
    });

    test('adds controller xD', () => {
        // const mockedExpress = mocked(express, true)
        // const instance = express();
        // const mockedExpressInstance = mocked(instance, true);
        // mockedExpress.mockReturnValue(instance);

        // const app = new App('database_urlxD', 5555);
        // const controller = new ControllerStub();
        // app.addController(controller);

        // expect(mockedExpressInstance.use).toHaveBeenCalledWith(controller);
    })
});
