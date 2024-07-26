import { Snippet } from "../../../../entities/Snippet";
import backendClient from "../../config";
import { IRawSnippet } from "./IRawSnippet";

const findAll = async (): Promise<Snippet[]> => {
  const { data: rawSnippets } = await backendClient.get<IRawSnippet[]>(
    "/snippet"
  );

  return rawSnippets.map(
    (rawSnippet) => new Snippet({ ...rawSnippet, id: parseInt(rawSnippet.id) })
  );
};

const snippetService = {
  findAll,
};

export default snippetService;
