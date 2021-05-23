import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
import Exercise from "./Exercise";
import Room from "./Room";
import Spreadsheet from "./Spreadsheet";

export const modelInit = (sequelize: Sequelize) => {
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
    
    Spreadsheet.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            roomId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "spreadsheets",
        }
    );
    
    Spreadsheet.belongsTo(Room, { foreignKey: 'spreadsheetId' });
    
    Room.hasMany(Spreadsheet, { foreignKey: 'spreadsheetId', as: 'spreadsheets' });
    
    Exercise.belongsTo(Spreadsheet, { foreignKey: 'spreadsheetId' });
    
    Spreadsheet.hasMany(Exercise);
    
}
