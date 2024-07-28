import { notFound } from "next/navigation";
import backendService from "../../../services/backend";
import { CustomLink } from "../../../components/CustomLink";

interface ISnippetDetailsProps {
  params: {
    id: string;
  };
}

export default async function SnippetDetails({
  params,
}: Readonly<ISnippetDetailsProps>) {
  const snippet = await backendService.snippet.findById(params.id);

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col gap-12 p-6 md:p-24">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <h1 className="text-white">{snippet.title}</h1>

          <div className="flex flex-col gap-2 md:flex-row">
            <CustomLink href="#" text="Update" />
            <CustomLink href="#" text="Delete" />
          </div>
        </div>

        <div className="bg-slate-700">
          <div className="bg-slate-500 py-8 px-12">
            <div className="text-white flex justify-between gap-12">
              <p>{snippet.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
