import { Model, DataTypes, Optional, Op } from "sequelize";
import sequelize from "../sequelize";
import Room from "./Room";
import Spreadsheet from "./Spreadsheet";

import User from "./User"

interface ExerciseAttributes {
    id?: number;
    label: string;
    assignedUserFirstName?: string;
    assignedUserLastName?: string;
    spreadsheetId: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id"> { }

class Exercise extends Model<ExerciseAttributes>
    implements ExerciseAttributes {
    public id?: number;
    public label!: string;
    public assignedUserFirstName?: string;
    public assignedUserLastName?: string;
    public spreadsheetId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async assign(firstName: string, lastName: string): Promise<void> {
        if (this.assignedUserFirstName === null && this.assignedUserLastName === null) {
            this.assignedUserFirstName = firstName;
            this.assignedUserLastName = lastName;
        }
        else {
            const currentSpreadsheet = await Spreadsheet.findByPk(this.spreadsheetId);
            if (currentSpreadsheet === null) throw new Error("Target exercise has no spreadsheet");
            const assignedUserPoints = await Exercise.count({
                include: {
                    model: Spreadsheet,
                    as: 'Spreadsheets',
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
                    as: 'Spreadsheets',
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
            if (requestedUserPoints > assignedUserPoints) {
                this.assignedUserFirstName = firstName;
                this.assignedUserLastName = lastName;

            } else throw new Error('Can\'t reassign an exercise to a user with greater amount of points');
        }
    }
}

Exercise.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: new DataTypes.STRING(16),
        allowNull: false,
    },
    assignedUserFirstName: {
        type: new DataTypes.STRING(32),
        allowNull: true,
    },
    assignedUserLastName: {
        type: new DataTypes.STRING(32),
        allowNull: true,
    },
    spreadsheetId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
},
    {
        sequelize,
        tableName: "exercises",
    }
);


export default Exercise;