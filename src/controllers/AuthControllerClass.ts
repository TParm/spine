import { IUserModel } from "./../models/UserModel";
import { AuthService } from "./../services/AuthService";
import { NextFunction, Request, Response } from "express";
import { Controller } from "../core/Controller";
import { IControllerRoute } from "../core/types";
import { ApiMethods } from "../types";
import { ApiError } from "../lib/errors/ApiError";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignup";
import penv from "../config/penv";

export class AuthControllerClass extends Controller {
    path = "/auth";
    routes: IControllerRoute[] = [
        {
            path: "/signup",
            method: ApiMethods.Post,
            handler: this.handleSignup.bind(this),
            localMiddleware: [checkDuplicateUsernameOrEmail, checkRolesExisted]
        },
        {
            path: "/login",
            method: ApiMethods.Post,
            handler: this.handleLogin.bind(this),
            localMiddleware: []
        }
    ];
    authService = new AuthService();

    constructor() {
        super();
    }

    public async handleSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.authService.createUser(req.body.username, req.body.email, req.body.password);
            await this.authService.assignRoles(req.body.username, req.body.roles);

            res.status(200).json({
                message: "User succesfully created."
            });
        } catch (e) {
            this.logger.error("Signup failed.");
            if (e instanceof ApiError) {
                next(ApiError.internal("Signup failed"));
                return;
            }
        }
    }

    public async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: IUserModel = await this.authService.getUserByUsername(req.body.username);

            const passwordIsValid: boolean = this.authService.validatePassword(req.body.password, user.password);
            if (!passwordIsValid) {
                next(ApiError.unauthorized("Invalid password."));
                return;
            }

            const token = this.authService.signToken(user.id, penv.jwtAuthkey);
            const userRoles = await this.authService.getUserRoles(user.id);

            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: userRoles,
                accessToken: token
            });
        } catch (e) {
            this.logger.error("Login failed.");
            if (e instanceof ApiError) {
                next(ApiError.internal("Login failed."));
                return;
            }
        }
    }
}