import { App } from "./App";
import { PORT } from "./consts";
import ExerciseController from "./controllers/ExerciseController";
import HomeController from "./controllers/HomeController";
import RoomController from "./controllers/RoomController";
import { SpreadsheetController } from "./controllers/SpreadsheetController";
import sequelize from "./database";

const app = new App(sequelize, PORT);

app.addController(new HomeController());
app.addController(new RoomController(), '/room');
app.addController(new SpreadsheetController(), '/room/:roomId');
app.addController(new ExerciseController(), '/room/:roomId/spreadsheet/:spreadsheetId')
app.listen();
