import db from '../models';
import { users } from '../seeders/users';
import { projects } from '../seeders/projects';
import { assignments } from '../seeders/assignments';

// ORM

interface Project {
  id: number;
  title: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  Projects: Project[];
}

export const createUsers = () => {
  users.forEach((user) => {
    db.User.create(user);
  });
};

export const createProjects = () => {
  projects.forEach((project) => {
    db.Project.create(project);
  });
};

export const createProjectAssignments = () => {
  assignments.forEach((assignment) => {
    db.ProjectAssignments.create(assignment);
  });
};

export const getUsers = async (): Promise<User[]> => {
  const userResponse = await db.User.findAll({
    include: {
      model: db.Project,
      through: {
        attributes: [],
      },
    },
  });
  const users = await userResponse.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      projects: user.Projects,
    };
  });
  return users;
};

// Query

// import { pool } from '../database/db';
// import { v4 as uuidv4 } from 'uuid';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }

// export const readQuery = async (query: string) => {
//   try {
//     const res = await pool.query(query);
//     return res.rows;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getUsersFromUsersTable = async () => {
//   const query = `
//     SELECT * FROM users;
//     `;

//   return readQuery(query);
// };

// export const getAssignments = async () => {
//   const query = `
//     SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status
//     FROM ((users
//     INNER JOIN assignments
//     ON users.id = assignments.user_id)
//     INNER JOIN projects
//     ON assignments.project_id = projects.id);
//     `;

//   return readQuery(query);
// };

// export const findUserByEmail = async (
//   email: string
// ): Promise<User[] | undefined> => {
//   const query = {
//     text: 'SELECT * FROM users WHERE email = $1',
//     values: [email],
//   };

//   try {
//     const res = await pool.query(query);
//     return res.rows;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const addUser = async (
//   name: string,
//   email: string,
//   password: string
// ) => {
//   const query = {
//     text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
//     values: [uuidv4(), name, email, password],
//   };

//   const userQuery = await findUserByEmail(email);
//   if (userQuery?.length === 0) {
//     try {
//       await pool.query(query);
//       console.log('User added.');
//     } catch (e) {
//       console.error(e);
//     }
//   } else {
//     console.log('Unable to add user. Check your email address');
//   }
// };

// export const addProject = async (title: string, status: string) => {
//   const query = {
//     text: 'INSERT INTO projects(title, status) VALUES($1, $2)',
//     values: [title, status],
//   };

//   try {
//     await pool.query(query);
//     console.log('Project added.');
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const addAssignment = async (
//   user_email: string,
//   project_id: number,
//   user_name: string
// ) => {
//   let user_id: string = '';
//   const user = await findUserByEmail(user_email);
//   if (user === undefined || user?.length === 0) {
//     console.log('User with that email not found.');
//   } else {
//     user_id = user[0].id;
//   }

//   const query = {
//     text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
//     values: [project_id, user_id, user_name],
//   };

//   try {
//     await pool.query(query);
//     console.log('Assignment created.');
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getUsers = async () => {
//   const usersFromUsersTable = await getUsersFromUsersTable();
//   const assignments = await getAssignments();
//   const users = await usersFromUsersTable?.map(async (user) => {
//     let projects: object[] = [];
//     await assignments?.forEach((assignment) => {
//       if (user.id === assignment.user_id) {
//         projects.push({
//           id: assignment.project_id,
//           title: assignment.title,
//           status: assignment.status,
//         });
//       }
//     });
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       projects: projects,
//     };
//   });
//   return users;
// };

// export const createUserTable = async () => {
//   const query = `
//     CREATE TABLE users (
//         id varchar primary key,
//         name varchar,
//         email varchar,
//         password varchar
//     )
//     `;

//   return readQuery(query);
// };

// export const createProjectTable = async () => {
//   const query = `
//     CREATE TABLE projects (
//         id serial primary key,
//         title varchar,
//         status varchar
//     )
//     `;

//   return readQuery(query);
// };

// export const createAssignmentTable = async () => {
//   const query = `
//     CREATE TABLE assignments (
//         id serial,
//         project_id int references projects (id),
//         user_id varchar references users (id),
//         primary key (project_id, user_id),
//         user_name varchar
//     )
//     `;

//   return readQuery(query);
// };
