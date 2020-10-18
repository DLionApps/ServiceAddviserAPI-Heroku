import { Server } from "@hapi/hapi";
import * as mongoose from "mongoose";
import { OwnerController } from "./controllers/OwnerController";
import { VehicleController } from "./controllers/VehicleController";
import { ServiceContoller } from "./controllers/ServiceContoller";
var config = require("../src/config");

export default class APIServer {
  // private server!: Server;
  // private port = process.env.PORT || 8000;
  constructor() {
    mongoose.connect(config.connectionString, config.options);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", () => {
      console.log("Error while conneting to MongoDB");
    });
  }

  public async init(server: Server) {
    // Create a server with a host and port
    // server = new Server({
    //   host: "localhost",
    //   port: port,
    // });

    // Add the route
    server.route({
      method: "GET",
      path: "/hello",
      handler: function (request, h) {
        return "hello world";
      },
    });

    const ownerController = new OwnerController();
    server.route(ownerController.getRouteList());

    const vehicleController = new VehicleController();
    server.route(vehicleController.getRouteList());

    const serviceContoller = new ServiceContoller();
    server.route(serviceContoller.getRouteList());

    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log("Server running at:", server.info.uri);
    // console.log("Port = " + port);
  }
}
