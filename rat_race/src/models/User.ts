import { Model } from "sequelize";
  
export default class User extends Model{
    public static getPoints(firstName: string, lastName: string): number {
        return 122222;
    }
}