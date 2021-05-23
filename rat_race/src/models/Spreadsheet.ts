import { DataTypes, Model, Optional } from "sequelize";

interface SpreadsheetAttributes {
    id?: number;
    roomId: number;
    name: string;
}

interface SpreadsheetCreationAttributes extends Optional<SpreadsheetAttributes, "id"> { }

class Spreadsheet extends Model<SpreadsheetAttributes, SpreadsheetCreationAttributes>
    implements SpreadsheetAttributes {
    public id?: number;
    public roomId!: number;
    public name!: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}


export default Spreadsheet;