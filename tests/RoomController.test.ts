
import { mocked } from 'ts-jest/utils';
import { App } from '../src/App';
import { RoomController } from '../src/RoomController'
jest.mock('res')

describe('RoomController', () => {

    test('render template xD'), async()  => {
        const app: App = new App('database_urlxD',5555);
        app.addController(new RoomController());
        RoomController.create();

        

    });
});