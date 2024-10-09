import React from 'react';
import { useRouter } from 'next/router';
import { DASHBOARD_TABS } from 'constants/pages';
import Tabs from 'components/Tabs';

const urlProps = (page: string, pathname: string) => {
  return {
    href: page,
    isActive: page === pathname,
  };
};

export default function DashboardTabs() {
  const router = useRouter();

  return (
    <>
      <div className="hidden justify-center py-4 lg:flex">
        <Tabs
          tabs={DASHBOARD_TABS.map((tab) => ({
            ...tab,
            ...urlProps(tab.href, router.pathname),
          }))}
        />
      </div>
    </>
  );
}
