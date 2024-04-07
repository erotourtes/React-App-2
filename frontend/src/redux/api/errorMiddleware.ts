import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

type ErrorResponseT = {
  message: string;
  statusCode: number;
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload as { data: ErrorResponseT };

    if (!data)
      return void toast.error("An error occurred, may be server is not running", { duration: 5000 });

    const { message, statusCode } = data;

    toast.error("Error: " + action.error.message, {
      duration: 5000,
      description: `${message} <${statusCode}>`,
      dismissible: true,
      closeButton: true,
    });
  }

  return next(action);
};
