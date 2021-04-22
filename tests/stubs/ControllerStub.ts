import { Router } from "express";

export class ControllerStub {
    public getRouter(): Router {
        return Router();
    };
}