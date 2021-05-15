import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";
import Room from "./Room";
import Spreadsheet from "./Spreadsheet";

import User from "./User"

interface ExerciseAttributes {
    id: number;
    label: string;
    assignedUserFirstName?: string;
    assignedUserLastName?: string;
    spreadsheetId: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id"> { }

class Exercise extends Model<ExerciseAttributes>
    implements ExerciseAttributes {
    public id!: number;
    public label!: string;
    public assignedUserFirstName?: string;
    public assignedUserLastName?: string;
    public spreadsheetId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

     public assign(firstName: string, lastName: string): void {
        
    }

}

Exercise.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: new DataTypes.STRING(3),
        allowNull: false,
    },
    assignedUserFirstName: {
        type: new DataTypes.STRING(32),
        allowNull: true,
    },
    assignedUserLastName: {
        type: new DataTypes.STRING(32),
        allowNull: true,
    },
    spreadsheetId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
},
    {
        sequelize,
        tableName: "exercises",
    }
);

export default Exercise;