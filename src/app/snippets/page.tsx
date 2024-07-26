import { CustomLink } from "../../components/CustomLink";

const snippets = [
  {
    id: 1,
    title: "Function to Add two numbers",
    content: "function add(a, b) { return a + b; }",
  },
  {
    id: 2,
    title: "Function to Subtract two numbers",
    content: "function subtract(a, b) { return a - b; }",
  },
  {
    id: 3,
    title: "Function to Multiply two numbers",
    content: "function multiply(a, b) { return a * b; }",
  },
  {
    id: 4,
    title: "Function to Divide two numbers",
    content: "function divide(a, b) { return a / b; }",
  },
];

export default async function SnippetsPage() {
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
