import { Model, Optional, BelongsToGetAssociationMixin } from "sequelize";
import Room from './Room'
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

    public getRoom!: BelongsToGetAssociationMixin<Room>;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}


export default Spreadsheet;