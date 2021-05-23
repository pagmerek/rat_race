import { Model, DataTypes, Optional, Op, HasManyCreateAssociationMixin, BelongsToGetAssociationMixin } from "sequelize";
import Spreadsheet from "./Spreadsheet";

interface ExerciseAttributes {
    id?: number;
    label: string;
    assignedUserFirstName?: string;
    assignedUserLastName?: string;
    spreadsheetId: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id"> { }

class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes>
    implements ExerciseAttributes {
    public id?: number;
    public label!: string;
    public assignedUserFirstName?: string;
    public assignedUserLastName?: string;
    public spreadsheetId!: number;

    public getSpreadsheet!: BelongsToGetAssociationMixin<Spreadsheet>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public async assign(firstName: string, lastName: string): Promise<this> {
        if (this.assignedUserFirstName === null && this.assignedUserLastName === null) {
            this.assignedUserFirstName = firstName;
            this.assignedUserLastName = lastName;
            return this;
        }

        const currentSpreadsheet = await this.getSpreadsheet();
        if (currentSpreadsheet === null) throw new Error("Target exercise has no spreadsheet");
        const assignedUserPoints = await Exercise.count({
            include: {
                model: Spreadsheet,
                as: 'Spreadsheet',
                where: {
                    'roomId': {
                        [Op.eq]: currentSpreadsheet.roomId
                    }
                }
            },
            where: {
                'assignedUserFirstName': {
                    [Op.eq]: this.assignedUserFirstName
                },
                'assignedUserLastName': {
                    [Op.eq]: this.assignedUserLastName
                }
            }
        });
        const requestedUserPoints = await Exercise.count({
            include: {
                model: Spreadsheet,
                as: 'Spreadsheet',
                where: {
                    'roomId': {
                        [Op.eq]: currentSpreadsheet.roomId
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
        console.log(requestedUserPoints);
        console.log(assignedUserPoints);
        if (requestedUserPoints < assignedUserPoints) {
            this.assignedUserFirstName = firstName;
            this.assignedUserLastName = lastName;
            return this;

        } else throw new Error('Can\'t reassign an exercise to a user with greater amount of points');
        }
}


export default Exercise;