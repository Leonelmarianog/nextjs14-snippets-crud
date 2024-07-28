"use server";

import { redirect } from "next/navigation";
import backendService from "../services/backend";

export const createSnippet = async (code: string, formData: FormData) => {
  const title = formData.get("title") as string;
  await backendService.snippet.create({ title, content: code });
  redirect("/snippets");
};
