class User {
  userID: string | null;
  username: string | null;
  fullName: string | null;
  password: string  | null;

  accountLocked: boolean | null;
  enabled: boolean | null;

  constructor() {
    this.userID = null;
    this.username = null;
    this.fullName = null;
    this.password = null;
    this.accountLocked = null;
    this.enabled = null;
  }
}

export type IUser = Pick<User, "username" | "password">

export default User;