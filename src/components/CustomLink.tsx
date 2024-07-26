import Link from "next/link";

interface ICustomLinkProps {
  href: string;
  text: string;
}

export const CustomLink = ({ href, text }: Readonly<ICustomLinkProps>) => {
  return (
    <div className="group bg-slate-700 pr-1 pb-1 cursor-pointer">
      <div className="bg-slate-500 border border-white py-4 px-6 group-hover:bg-slate-600">
        <Link
          href={href}
          className="text-white flex justify-between gap-12 group-hover:text-green-500"
        >
          <p>{text}</p>
        </Link>
      </div>
    </div>
  );
};
