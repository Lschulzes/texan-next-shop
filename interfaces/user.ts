export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: UserRolestype;

  createdAt?: string;
  updatedAt?: string;
}

export enum UserRoles {
  ADMIN = "admin",
  CLIENT = "client",
}

export type UserRolestype = `${UserRoles}`;
