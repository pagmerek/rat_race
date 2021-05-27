import { Model, Optional, Op, BelongsToGetAssociationMixin } from "sequelize";
import Spreadsheet from "./Spreadsheet";
import User from "./User";

export class AssignError extends Error {
    constructor(args: string){
        super(args);
        this.name = 'AssignError'
    }
}

interface ExerciseAttributes {
    id?: number;
    label: string;
    assignedUserFirstName?: string;
    assignedUserLastName?: string;
    spreadsheetId: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id"> { }

class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes>
    implements ExerciseAttributes {
    public id?: number;
    public label!: string;
    public assignedUserFirstName?: string;
    public assignedUserLastName?: string;
    public spreadsheetId!: number;

    public getSpreadsheet!: BelongsToGetAssociationMixin<Spreadsheet>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public async assign(firstName: string, lastName: string): Promise<this> {
        if (this.assignedUserFirstName === null && this.assignedUserLastName === null) {
            this.assignedUserFirstName = firstName;
            this.assignedUserLastName = lastName;
            return this;
        }

        const currentSpreadsheet = await this.getSpreadsheet();
        const assignedUserPoints = await User.getPoints(currentSpreadsheet.roomId, this.assignedUserFirstName, this.assignedUserLastName);
        const requestedUserPoints = await User.getPoints(currentSpreadsheet.roomId, firstName, lastName);
        console.log(assignedUserPoints);
        console.log(requestedUserPoints);
        if (requestedUserPoints + 1 < assignedUserPoints) {
            this.assignedUserFirstName = firstName;
            this.assignedUserLastName = lastName;
            return this;

        } else throw new AssignError('Can\'t reassign an exercise to a user with greater amount of points');
        }
}


export default Exercise;