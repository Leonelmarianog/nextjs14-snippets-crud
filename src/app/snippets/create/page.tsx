import { CreateSnippetForm } from "../../../components/create-snippet-form";

export default function CreateSnippetPage() {
  return (
    <div className="h-screen flex flex-col gap-12 p-6 md:p-24">
      <h1 className="text-white">Create</h1>
      <CreateSnippetForm />
    </div>
  );
}
