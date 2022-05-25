class User {
  userID: string;
  username: string;
  fullName: string;
  password: string;

  accountLocked: boolean;
  enabled: boolean;

  constructor() {
    this.userID = "";
    this.username = "unknown";
    this.fullName = "NOT A USER";
    this.password = "";
    this.accountLocked = true;
    this.enabled = false;
  }
}

export default User;