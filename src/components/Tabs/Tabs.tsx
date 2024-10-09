import React from 'react';
import Link from 'components/Link';
import classNames from 'styles/utils/classNames';

interface Tab {
  text: string;
  href: string;
  isActive?: boolean;
  isAction?: boolean;
  onClick?: () => void;
}

interface Props {
  tabs: Tab[];
}

export default function Tabs({ tabs }: Props) {
  return (
    <nav className="pointer-events-auto">
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-brand-primary/10 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-[#101010] dark:text-zinc-200 dark:ring-white/10">
        {tabs.map((tab, index) => (
          /**
           * @todo handle if we want to have button clicks as well
           */
          <li key={index}>
            <Link
              href={tab.href}
              className={classNames(
                'relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400',
                tab.isActive && 'text-teal-500 dark:text-teal-400',
              )}
            >
              {tab.text}
              {tab.isActive && (
                <span className="absolute inset-x-1 -bottom-px h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
