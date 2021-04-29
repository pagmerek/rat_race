import { Sequelize } from "sequelize";
import express, { Application } from 'express';
import { Controller } from "./interfaces/Controller";

export class App {
    private database: Sequelize;
    private express: Application;
    private port: number;

    constructor(databaseUrl: string, port: number) {
        this.database = new Sequelize(databaseUrl);
        this.express = express();
        this.port = port;
    }

    public addController(controller: Controller, path: string = '/'): void {
        this.express.use(path, controller.getRouter());
    }

    public get(){
        return this.express;
    }
}