import Link from 'next/link';

interface BreadcrumbProps {
  category: string;
  page: string;
}

export default function Breadcrumb({ category, page }: BreadcrumbProps) {
  console.log(category);
  
  return (
    <nav className="breadcrumb flex space-x-2 text-sm text-gray-500 mb-8">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <span>/</span>
      <Link href={`/category/${category}`} className="hover:underline">
        {category}
      </Link>
      <span>/</span>
      <span className="font-semibold text-gray-800">{page}</span>
    </nav>
  );
}