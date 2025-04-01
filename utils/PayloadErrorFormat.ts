import { ZodIssue } from "zod";

export function PayloadErrorFormat(isValidPayload) {
  const errors:
    | {
        message: string;
      }[]
    | undefined = isValidPayload.error?.issues.map(
    (
      issue: ZodIssue
    ): {
      message: string;
    } => {
      return { message: `${issue.message} ${issue.path[0]}` };
    }
  );
  return errors;
}
