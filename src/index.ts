// import { Server } from "http";
import { Server } from "@hapi/hapi";
import APIServer from "./server";

const serverInstence: APIServer = new APIServer();

const server = new Server({
  host: "localhost",
  port: process.env.PORT || 8000,
});

serverInstence.init(server);
