import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJsdoc.Options["definition"] = {
  openapi: "3.0.0",
  info: {
    title: "ThoughtCanvas API Documentation",
    version: "1.0.0",
    description: "API documentation for ThoughtCanvas",
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL,
      description: "Local server",
    },
  ],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ["./pages/api/**/*.ts", "./app/api/**/*.ts"], // Adjust paths based on Next.js router
};

export default options;
