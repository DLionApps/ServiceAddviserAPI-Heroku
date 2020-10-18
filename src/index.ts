import { Server } from "http";
import APIServer from "./server";

const server: APIServer = new APIServer();
const port = process.env.PORT || 8000;
server.init(port);
