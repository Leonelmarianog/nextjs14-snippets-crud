import { CustomLink } from "../../components/CustomLink";
import backendService from "../../services/backend";

export default async function SnippetsPage() {
  const snippets = await backendService.snippet.findAll();

  return (
    <div className="h-screen">
      <div className="py-12 px-12 flex justify-between items-center">
        <h1 className="text-white">View</h1>
        <CustomLink href="#" text="New" />
      </div>

      <div className="flex flex-col gap-4 px-4 md:px-12">
        {snippets.map(({ id, title }) => {
          return <CustomLink key={id} href="#" text={title} />;
        })}
      </div>
    </div>
  );
}
