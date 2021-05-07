import {
    Model,
    DataTypes,
    Optional,
  } from "sequelize";
import sequelize from "../sequelize";
import Spreadsheet from "./Spreadsheet";


interface RoomAttributes {
  id: number;
  name: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "id"> {}

class Room extends Model<RoomAttributes>
  implements RoomAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Room.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "rooms",
  }
);

Room.hasMany(Spreadsheet, {
  sourceKey: "id",
  foreignKey: "roomId",
  as: "spreadsheets", // this determines the name in `associations`!
});

export default Room;