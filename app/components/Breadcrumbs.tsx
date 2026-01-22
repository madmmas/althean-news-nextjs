import Link from 'next/link';

interface BreadcrumbsProps {
  title: string;
  items?: Array<{ label: string; href?: string }>;
}

export default function Breadcrumbs({ title, items = [] }: BreadcrumbsProps) {
  const defaultItems = [{ label: 'Home', href: '/' }, { label: title }];
  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="back-breadcrumbs">
      <div className="breadcrumbs-wrap">
        <div className="breadcrumbs-inner">
          <div className="container">
            <div className="breadcrumbs-text">
              <h1 className="breadcrumbs-title">{title}</h1>
              <div className="back-nav">
                <ul>
                  {breadcrumbItems.map((item, index) => (
                    <li key={index}>
                      {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

