import { Model, UUIDV4 } from 'sequelize';

type UserAttributes = {
  id: string;
  name: string;
  email: string;
  password: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;

    static associate(models: any) {
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
