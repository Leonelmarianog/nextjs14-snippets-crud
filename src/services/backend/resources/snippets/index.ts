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

const findById = async (id: number | string): Promise<Snippet | null> => {
  try {
    const { data: rawSnippet } = await backendClient.get<IRawSnippet>(
      `/snippet/${id}`
    );

    return new Snippet({ ...rawSnippet, id: parseInt(rawSnippet.id) });
  } catch (_) {
    return null;
  }
};

const snippetService = {
  findAll,
  findById,
};

export default snippetService;
