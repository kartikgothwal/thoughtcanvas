import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ThoughtCanvas API Docs",
      version: "1.0.0",
      description: "API documentation for ThoughtCanvas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        description: "API Server",
      },
    ],
  },
  apis: ["./app/api/**/*.ts"],
};

const swaggerSpec: object = swaggerJSDoc(options);

export default swaggerSpec;
