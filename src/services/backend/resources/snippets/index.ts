import { Snippet } from "../../../../entities/Snippet";
import backendClient from "../../config";
import { ICreateSnippetDto } from "./ICreateSnippetDto";
import { IRawSnippet } from "./IRawSnippet";

const findAll = async (): Promise<Snippet[]> => {
  const { data: rawSnippets } = await backendClient.get<IRawSnippet[]>(
    "/snippet"
  );

  return rawSnippets.map(
    (rawSnippet) => new Snippet({ ...rawSnippet, id: rawSnippet.id })
  );
};

const findById = async (id: number | string): Promise<Snippet | null> => {
  try {
    const { data: rawSnippet } = await backendClient.get<IRawSnippet>(
      `/snippet/${id}`
    );

    return new Snippet({ ...rawSnippet, id: rawSnippet.id });
  } catch (_) {
    return null;
  }
};

const create = async (createSnippetDto: ICreateSnippetDto) => {
  const { data: rawSnippet } = await backendClient.post(
    "/snippet",
    createSnippetDto
  );
  return new Snippet({ ...rawSnippet, id: parseInt(rawSnippet.id) });
};

const snippetService = {
  findAll,
  findById,
  create,
};

export default snippetService;
