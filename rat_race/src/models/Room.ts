import {
    Model,
    DataTypes,
    Optional,
  } from "sequelize";
import sequelize from "../sequelize";



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

// TODO
// Room.hasMany(Spreadsheet, {
//   sourceKey: "",
//   foreignKey: "",
//   as: "projects", // this determines the name in `associations`!
// });
// TODO add associations field in model

export default Room;