import { navigate, routeToHash, type Route } from '../../router';

// The level bar for the Cases pages, with the same look as the course
// Wayfinder: 首页 › 哲学案例 › 分洪 › 当前章节. Cases are reached only from the
// 哲学案例 entry, so the path is fixed.

export interface CaseCrumb {
  label: string;
  kind: string;
  route?: Route;
}

export default function CaseCrumbs({ items }: { items: CaseCrumb[] }) {
  const all: CaseCrumb[] = [{ label: '首页', kind: '首页', route: { name: 'home' } }, ...items];
  return (
    <nav className="wayfinder" aria-label="当前位置">
      <ol>
        {all.map((c, i) => {
          const current = i === all.length - 1;
          return (
            <li
              key={c.label + i}
              className={'wf-step ' + (current ? 'is-current' : 'is-past') + (i === 0 ? ' wf-home' : '')}
              aria-current={current ? 'location' : undefined}
            >
              <span className="wf-level">{c.kind}</span>
              {current || !c.route ? (
                <span className="wf-label">{c.label}</span>
              ) : (
                <a
                  href={routeToHash(c.route)}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(c.route!);
                  }}
                >
                  {c.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
