import User from "user/User";
import Service from "./Service";

enum URL {
    USER_DETAILS = "user/details",
};

class API {
    private static service:Service = Service.getInstance();

    public static login(user: IUser): Promise<User> {
        this.service.setAuthorization(user);
        return this.service.post<User>(URL.USER_DETAILS, user);
    }
}

export default API;