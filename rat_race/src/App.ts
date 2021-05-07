import { Sequelize } from "sequelize";
import express, { Application } from 'express';
import { Controller } from "./interfaces/Controller";
import bodyParser from "body-parser";

export class App {
    private database: Sequelize;
    private express: Application;
    private port: number;

    constructor(sequelize: Sequelize, port: number) {
        this.database = sequelize;
        this.database.sync();
        this.express = express();
        this.port = port;
        this.express.set('view engine', 'jade');
        this.express.set('views', `${__dirname}/../views`);
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(express.static(`${__dirname}/../public`));
    }

    public addController(controller: Controller, path?: string): void {
        if ( path !== undefined ){
            this.express.use(path, controller.getRouter());
        } else {
            this.express.use(controller.getRouter());
        }
    }

    public listen(){
        return this.express.listen(this.port, () => {
            console.log(`App is listening on ${this.port}...`);
        });
    }
}