import { Op} from "sequelize";
import Spreadsheet from "./Spreadsheet";
import Exercise from "./Exercise";

class User{
    public static async getPoints(roomId: number, firstName: string | undefined, lastName: string | undefined): Promise<number> {
        let points = await Exercise.count({
            include: {
                model: Spreadsheet,
                as: 'Spreadsheet',
                where: {
                    'roomId': {
                        [Op.eq]: roomId
                    }
                }
            },
            where: {
                'assignedUserFirstName': {
                    [Op.eq]: firstName
                },
                'assignedUserLastName': {
                    [Op.eq]: lastName
                }
            }
        });
        return points;
    }
}
export default User;