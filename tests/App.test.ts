import { Sequelize } from 'sequelize';
import express from 'express';
import { mocked } from 'ts-jest/utils';
import { App } from '../src/App';
import { ControllerStub } from './stubs/ControllerStub';

jest.mock('sequelize')

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
        const app = new App('database_urlxD', 5555);
        const controller = new ControllerStub();
        app.addController(controller);
    })
});
