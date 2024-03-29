import { Id, Nullable } from "../types";
import { Repository } from "../core/Repository";
import { IUserModel } from "../models/UserModel";

export class AuthRepository extends Repository {
    public async createUser(username: string, email: string, password: string): Promise<void> {
        const createUserQuery = `
            INSERT INTO users (
                username,
                email,
                password 
            )
            VALUES (?, ?, ?)  
        `;
        await this.database.query(createUserQuery, [username, email, password]);
    }

    public async createUserRole(userId: Id, roleId: Id): Promise<void> {
        const createUserRoleQuery = `
            INSERT INTO user_roles (
                user_id,
                role_id
            )
            VALUES (?, ?)
        `;
        await this.database.query(createUserRoleQuery, [userId, roleId]);
    }

    public async getCreatedUserId(username: string): Promise<Nullable<{ id: Id; }>> {
        const getUserIdQuery = "SELECT id FROM users WHERE username = ?";
        const foundUser: Nullable<{ id: Id; }> = await this.database.queryOne<{ id: Id; }>(getUserIdQuery, [username]);
        return foundUser;
    }

    public async getRole(role: string): Promise<Nullable<{ id: Id; }>> {
        const getRoleIdQuery = "SELECT id FROM roles WHERE name = ?";
        const foundRole: Nullable<{ id: Id; }> = await this.database.queryOne<{ id: Id; }>(getRoleIdQuery, [role]);
        return foundRole;
    }

    public async getUser(username: string): Promise<Nullable<IUserModel>> {
        const getUserQuery = "SELECT * FROM users WHERE username = ?";
        const user: Nullable<IUserModel> = await this.database.queryOne<IUserModel>(getUserQuery, [username]);
        return user;
    }

    public async getUserRoles(userId: Id): Promise<Nullable<{ name: string; }[]>> {
        const getUserRolesQuery = `
            SELECT 
                r.name 
            FROM users u 
            LEFT JOIN user_roles ur 
                ON u.id = ur.user_id
            LEFT JOIN roles r 
                ON ur.role_id = r.id
            WHERE user_id = ?
        `;
        const userRoles: Nullable<{ name: string; }[]> = await this.database.query<{ name: string; }>(getUserRolesQuery, [userId]);
        return userRoles;
    }
}