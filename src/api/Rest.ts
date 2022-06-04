import Budget, { IBudget } from "budget/Budget";
import BudgetSummary from "summary/BudgetSummary";
import UserSummary from "summary/UserSummary";
import User, { IUser } from "user/User";
import Service from "./Service";

enum URL {
    USER_DETAILS = "user/details",
    BUDGET_CREATE = "budget/create",
    SUMMARY_BUDGET = "summary/budget",
    SUMMARY_USER = "summary/user",
};

class API {
    private static service:Service = Service.getInstance();

    public static login(user: IUser): Promise<User> {
        this.service.setAuthorization(user);
        return this.service.post<User>(URL.USER_DETAILS, user);
    }

    public static createBudget(budget: Budget): Promise<Budget> {
      return this.service.post<Budget>(URL.BUDGET_CREATE, budget);
    }

    public static getBudgetSummary(budget: IBudget): Promise<BudgetSummary> {
      return this.service.post<BudgetSummary>(URL.SUMMARY_BUDGET, budget);
    }

    public static getUserSummary(user: User): Promise<UserSummary> {
      return this.service.post<UserSummary>(URL.SUMMARY_USER, user);
    }
}

export default API;