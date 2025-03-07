"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import "@/css/swagger.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return <SwaggerUI url="/api/docs" />;
}
