import { CreateSnippetForm } from "../../../components/create-snippet-form";

export default function CreateSnippetPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-12 p-4">
      <h1 className="text-white text-xl bold">Create</h1>
      <CreateSnippetForm />
    </div>
  );
}
