import { stringLiteral } from "@babel/types";
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";

interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;

}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User extends Model
    implements UserAttributes {
    public id?: number;
    public firstName!: string;
    public lastName!: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    public getPoints(roomId: number): number {
        //TODO: implement this xD
        return 122222;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: new DataTypes.STRING(128),
    }
},
{
    sequelize,
    tableName: "users",
})
export default User;