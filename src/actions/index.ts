"use server";

import { redirect } from "next/navigation";
import backendService from "../services/backend";

export const createSnippet = async (
  code: string,
  _: {
    message: string;
  },
  formData: FormData
) => {
  try {
    const title = formData.get("title");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be at least 3 characters long",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be at least 10 characters long",
      };
    }

    await backendService.snippet.create({ title, content: code });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Something went wrong...",
    };
  }

  // this thing throws an error of type "NEXT_REDIRECT" that Next listens to to redirect to another page
  // It MUST be outside the try/catch block for Next to propertly redirect
  redirect("/snippets");
};
