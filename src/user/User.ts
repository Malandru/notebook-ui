class User
{
    userID!: number;
    username!: string;
    fullName!: string;
    password!: string;

    accountLocked!: boolean;
    enabled!: boolean;

    constructor() {
    }
}

export default User;