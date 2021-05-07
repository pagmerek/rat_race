import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";
import Room from "./Room";
import Spreadsheet from "./Spreadsheet";

import User from "./User"

interface ExerciseAttributes {
    id?: number;
    label: string;
    assignedUserId: number | null;
    spreadsheetId: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id"> { }

class Exercise extends Model<ExerciseAttributes>
    implements ExerciseAttributes {
    public id?: number;
    public label!: string;
    public assignedUserId!: number | null;
    public spreadsheetId!: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    public async assign(firstName: string, lastName: string) {
        const exercise = await Exercise.findByPk(this.id);
        const targetUser = await User.findOne({ where: { firstName: firstName, lastName: lastName } });
        //TODO: implement this xD
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
    assignedUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
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