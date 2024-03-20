import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

type ErrorResponseT = {
  message: string;
  statusCode: number;
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const {
      data: { message, statusCode },
    } = action.payload as { data: ErrorResponseT };

    toast.error("Error: " + action.error.message, {
      duration: 5000,
      description: `${message} <${statusCode}>`,
      dismissible: true,
      closeButton: true,
    });
  }

  return next(action);
};
