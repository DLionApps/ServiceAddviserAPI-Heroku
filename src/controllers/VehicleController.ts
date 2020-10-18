import { Vehicle } from "../models/vehicleModel";
import * as boom from "@hapi/boom";
const Joi = require("@hapi/joi");

export class VehicleController {
  // POST
  public addEntityRoute: any;
  // GET
  public getAllEntitiesRoute: any;
  // GET
  public getEntityByIdRoute: any;
  // PUT
  public updateEntityByIdRoute: any;
  // DELETE
  public deleteEntityByIdRoute: any;

  constructor() {
    this.initBaseRoutes();
  }

  private initBaseRoutes(): void {
    this.addEntityRoute = () => {
      return {
        method: "POST",
        path: "/vehicle",
        handler: async (request: any, h: any) => {
          const vehicle = await Vehicle.create(request.payload);

          return h
            .response({
              statusCode: 201,
              message: "Successfully Created",
              id: vehicle._id,
            })
            .code(201);
        },
        options: {
          validate: {
            payload: Joi.object({
              VRN: Joi.string().required(),
              make: Joi.string().required(),
              model: Joi.string().required(),
              mfgYear: Joi.number()
                .integer()
                .min(1886)
                .max(new Date().getFullYear())
                .required(),
            }),
          },
        },
      };
    };

    this.getAllEntitiesRoute = () => {
      return {
        method: "GET",
        path: "/vehicles",
        handler: async (request: any, h: any) => {
          const vehicles = await Vehicle.find({});

          return h.response(vehicles).code(200);
        },
      };
    };

    this.getEntityByIdRoute = () => {
      return {
        method: "GET",
        path: "/vehicle/{id}",
        handler: async (request: any, h: any) => {
          const vehicle = await Vehicle.findById(request.params.id);
          if (vehicle) {
            return h.response(vehicle).code(200);
          } else {
            return boom.notFound("Vehicle not found");
          }
        },
      };
    };

    this.updateEntityByIdRoute = () => {
      return {
        method: "PUT",
        path: "/vehicle/{id}",
        handler: async (request: any, h: any) => {
          const vehicle = await Vehicle.findById(request.params.id);
          if (vehicle) {
            await Vehicle.findByIdAndUpdate(request.params.id, request.payload);

            return h
              .response({ statusCode: 200, message: "Successfully Updated" })
              .code(200);
          } else {
            return boom.notFound("Vehicle not found");
          }
        },
        options: {
          validate: {
            payload: Joi.object({
              VRN: Joi.string().required(),
              make: Joi.string().required(),
              model: Joi.string().required(),
              mfgYear: Joi.number()
                .integer()
                .min(1886)
                .max(new Date().getFullYear())
                .required(),
            }),
          },
        },
      };
    };

    this.deleteEntityByIdRoute = () => {
      return {
        method: "DELETE",
        path: "/vehicle/{id}",
        handler: async (request: any, h: any) => {
          const vehicle = await Vehicle.findById(request.params.id);
          if (vehicle) {
            await Vehicle.findByIdAndDelete(request.params.id);

            return h
              .response({ statusCode: 200, message: "Successfully Deleted" })
              .code(200);
          } else {
            return boom.notFound("Vehicle not found");
          }
        },
      };
    };
  }

  public getRouteList(): any[] {
    return [
      this.addEntityRoute(),
      this.getAllEntitiesRoute(),
      this.getEntityByIdRoute(),
      this.updateEntityByIdRoute(),
      this.deleteEntityByIdRoute(),
    ];
  }
}
