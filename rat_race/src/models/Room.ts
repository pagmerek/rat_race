import {
    Model,
    Optional,
  } from "sequelize";


interface RoomAttributes {
  id: number;
  name: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, "id"> {}

class Room extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Room;