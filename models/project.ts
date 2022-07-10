import { Model } from 'sequelize';

type ProjectAttributes = {
  id: string;
  title: string;
  status: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> {
    declare id: number;
    declare title: string;
    declare status: string;
    static associate(models: any) {
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignments',
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
