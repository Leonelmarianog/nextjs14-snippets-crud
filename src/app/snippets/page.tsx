import Link from "next/link";

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

        <div className="group bg-slate-700 pr-1 pb-1 cursor-pointer">
          <div className="bg-slate-500 border border-white py-4 px-6 group-hover:bg-slate-600">
            <Link
              href="#"
              className="text-white flex justify-between gap-12 group-hover:text-green-500"
            >
              <p>New</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 md:px-12">
        {snippets.map(({ id, title }) => {
          return (
            <div
              key={id}
              className="group bg-slate-700 pr-1 pb-1 cursor-pointer"
            >
              <div className="bg-slate-500 border border-white py-4 px-6 group-hover:bg-slate-600">
                <Link
                  href="#"
                  className="text-white flex justify-between gap-12 group-hover:text-green-500"
                >
                  <p>{title}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
