import { Snippet } from "../../../../entities/Snippet";

export interface ICreateSnippetDto extends Pick<Snippet, "title" | "content"> {}
