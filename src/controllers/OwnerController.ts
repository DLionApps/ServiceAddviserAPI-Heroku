import { Owner } from "../models/ownerModel";
import * as boom from "@hapi/boom";
const Joi = require("@hapi/joi");

export class OwnerController {
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
        path: "/owner",
        handler: async (request: any, h: any) => {
          const owner = await Owner.create(request.payload);

          return h
            .response({
              statusCode: 201,
              message: "Successfully Created",
              id: owner._id,
            })
            .code(201);
        },
        options: {
          validate: {
            payload: Joi.object({
              email: Joi.string().required(),
              fName: Joi.string().required(),
              lName: Joi.string().required(),
              contactNumber: Joi.string().required(),
              password: Joi.string().required(),
            }),
          },
        },
      };
    };

    this.getAllEntitiesRoute = () => {
      return {
        method: "GET",
        path: "/owners",
        handler: async (request: any, h: any) => {
          const owners = await Owner.find({});

          return h.response(owners).code(200);
        },
      };
    };

    this.getEntityByIdRoute = () => {
      return {
        method: "GET",
        path: "/owner/{id}",
        handler: async (request: any, h: any) => {
          const owner = await Owner.findById(request.params.id);
          if (owner) {
            return h.response(owner).code(200);
          } else {
            return boom.notFound("Owner not found");
          }
        },
        options: {
          cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"],
          },
        },
      };
    };

    this.updateEntityByIdRoute = () => {
      return {
        method: "PUT",
        path: "/owner/{id}",
        handler: async (request: any, h: any) => {
          const owner = await Owner.findById(request.params.id);
          if (owner) {
            await Owner.findByIdAndUpdate(request.params.id, request.payload);

            return h
              .response({ statusCode: 200, message: "Successfully Updated" })
              .code(200);
          } else {
            return boom.notFound("Owner not found");
          }
        },
        options: {
          validate: {
            payload: Joi.object({
              email: Joi.string().required(),
              fName: Joi.string().required(),
              lName: Joi.string().required(),
              contactNumber: Joi.string().required(),
              password: Joi.string().required(),
            }),
          },
        },
      };
    };

    this.deleteEntityByIdRoute = () => {
      return {
        method: "DELETE",
        path: "/owner/{id}",
        handler: async (request: any, h: any) => {
          const owner = await Owner.findById(request.params.id);
          if (owner) {
            await Owner.findByIdAndDelete(request.params.id);

            return h
              .response({ statusCode: 200, message: "Successfully Deleted" })
              .code(200);
          } else {
            return boom.notFound("Owner not found");
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
