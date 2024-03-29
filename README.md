# Spine

***Starting point for a solid back-end with authentication system***

---

## Technologies

- **Runtime**: NodeJS
- **Backend framework**: Express
- **Programming language**: TypeScript
- **Database**: MySQL (mysql2 node driver)
- **Logging**: Winston
- **Testing**: Jest
- **Mocking**: Sinon
- **Authentication method**: JWT
- **Design pattern**: Repository-Service-Controller

---

## Development

#### Database
* Set up the dev database (preferably with Docker).
> ```docker run -d --name mysql-spine -v $HOME/dockervols/mysql-spine:/var/lib/mysql/ -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=dev --restart unless-stopped -p 3307:3306 mysql:8 --default-authentication-plugin=mysql_native_password```

#### Environment variables
* Copy the `.sample.env` file in `./` and rename it as `.env` and change the variables where needed. 
* The ENV variables are mapped in `./src/config/penv.ts` so they are easy to use throughout the code.

#### Scripts

```bash
npm start # build .dist and start
npm run build # build .dist
npm run lint # check for linting
npm run watch # start watcher
```

#### Debugging

* Install [Visual Studio Code](https://code.visualstudio.com/)
* Start watcher (`npm run watch`)
* In [VS Code Run and Debug](https://code.visualstudio.com/docs/editor/debugging), select `Launch Server` and press ▶️
