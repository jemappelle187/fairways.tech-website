export type TableOfContentsProps = {
  items: { id: string; label: string }[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav aria-label="On this page" className="text-sm text-slate-600">
      <p className="mb-2 font-medium text-slate-700">On this page</p>
      <ol className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-forest/90 underline-offset-2 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
