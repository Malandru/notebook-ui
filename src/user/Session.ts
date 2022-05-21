import User from 'user/User'

const enum ITEM
{
  USER = 'user'
}

class Session {
  public static storeUser(user: User) {
    localStorage.setItem(ITEM.USER, JSON.stringify(user));
  }

  public static restoreUser(): User | undefined {
    const temp = localStorage.getItem(ITEM.USER);
    return temp == null ? undefined : JSON.parse(temp) as User;
  }
}

export default Session;