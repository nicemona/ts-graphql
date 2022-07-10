import { Model } from 'sequelize';

type ProjectAssignmentAttributes = {
  ProjectId: number;
  UserId: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssignments extends Model<ProjectAssignmentAttributes> {
    declare ProjectId: number;
    declare UserId: string;
  }
  ProjectAssignments.init(
    {
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Project',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'ProjectAssignments',
    }
  );
  return ProjectAssignments;
};
