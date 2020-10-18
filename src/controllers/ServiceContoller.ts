import { Service } from "../models/serviceModel";
import * as boom from "@hapi/boom";
const Joi = require("@hapi/joi");

export class ServiceContoller {
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
        path: "/service",
        handler: async (request: any, h: any) => {
          const servise = await Service.create(request.payload);
          return h
            .response({
              statusCode: 201,
              message: "Successfully Created",
              id: servise._id,
            })
            .code(201);
        },
        options: {
          validate: {
            payload: Joi.object({
              mileage: Joi.number().integer(),
              lastServiceMileage: Joi.number().integer(),
              workingHours: Joi.number().integer(),
              lastServiceHours: Joi.number().integer(),
              lastServiceDate: Joi.date().required(),
            }),
          },
        },
      };
    };

    this.getAllEntitiesRoute = () => {
      return {
        method: "GET",
        path: "/services",
        handler: async (request: any, h: any) => {
          const servise = await Service.find({});

          return h.response(servise).code(200);
        },
      };
    };

    this.getEntityByIdRoute = () => {
      return {
        method: "GET",
        path: "/service/{id}",
        handler: async (request: any, h: any) => {
          const service = await Service.findById(request.params.id);
          if (service) {
            return h.response(service).code(200);
          } else {
            return boom.notFound("service not found");
          }
        },
      };
    };

    this.updateEntityByIdRoute = () => {
      return {
        method: "PUT",
        path: "/service/{id}",
        handler: async (request: any, h: any) => {
          const service = await Service.findById(request.params.id);
          if (service) {
            await Service.findByIdAndUpdate(request.params.id, request.payload);

            return h
              .response({ statusCode: 200, message: "Successfully Updated" })
              .code(200);
          } else {
            return boom.notFound("service not found");
          }
        },
        options: {
          validate: {
            payload: Joi.object({
              mileage: Joi.number().integer(),
              lastServiceMileage: Joi.number().integer(),
              workingHours: Joi.number().integer(),
              lastServiceHours: Joi.number().integer(),
              lastServiceDate: Joi.date().required(),
            }),
          },
        },
      };
    };

    this.deleteEntityByIdRoute = () => {
      return {
        method: "DELETE",
        path: "/service/{id}",
        handler: async (request: any, h: any) => {
          const service = await Service.findById(request.params.id);
          if (service) {
            await Service.findByIdAndDelete(request.params.id);

            return h
              .response({ statusCode: 200, message: "Successfully Deleted" })
              .code(200);
          } else {
            return boom.notFound("service not found");
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
