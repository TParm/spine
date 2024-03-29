import { Logger } from "./Logger";
import { Database } from "./Database";

export abstract class Repository {
    protected readonly logger: Logger;
    protected readonly database: Database;

    constructor() {
        this.logger = new Logger();
        this.database = new Database(this.logger);
    }
}