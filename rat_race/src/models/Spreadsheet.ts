import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";
import Exercise from "./Exercise";

interface SpreadsheetAttributes {
    id: number;
    roomId: number;
    name: string;
}

interface SpreadsheetCreationAttributes extends Optional<SpreadsheetAttributes, "id"> { }

export default class Spreadsheet extends Model<SpreadsheetAttributes>
    implements SpreadsheetAttributes {
    public id!: number;
    public roomId!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Spreadsheet.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        roomId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "spreadsheets",
    }
);

Spreadsheet.hasMany(Exercise, {
    sourceKey: "id",
    foreignKey: "spreadsheetId",
    as: "excercises",
});