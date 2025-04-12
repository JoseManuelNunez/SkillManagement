import { Config } from "./config";
import { getServer } from "./server";
import "reflect-metadata";

getServer().then((app) => {
    app.listen(Config.serverPort, () => {
        console.log(`Server is running on ${Config.serverPort}`);
    });
})
