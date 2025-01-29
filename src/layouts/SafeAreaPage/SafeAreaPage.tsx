import * as React from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { CLIENT_PORTAL_PAGE } from 'constants/pages';
import { Product } from 'types/generated/sanity';
import { useModal } from 'hooks/useModal';
import Button from 'components/Button';
import Link from 'components/Link';
import SidebarNav from 'components/SidebarNav';
import classNames from 'styles/utils/classNames';

export interface SafeAreaPageProps {
  children: React.ReactNode;
  isHideSidebar?: boolean;
  isIgnoreMobileTabs?: boolean;
  product: Product | null;
}

export default function SafeAreaPage({
  children,
  isHideSidebar,
  isIgnoreMobileTabs,
  product,
}: SafeAreaPageProps) {
  const {
    isOpen: isCommandCenterOpen,
    openModal: openCommandCenterModal,
    closeModal: closeCommandCenterModal,
  } = useModal();

  const [isMobileHamburgerOpen, setIsMobileHamburgerOpen] = React.useState(false);
  const hasSubpages = product?.subPages && product.subPages.length > 0;

  return (
    <>
      <div className="safearea-pad-y bg-color-bg-lightmode-primary flex min-h-screen grow flex-col">
        {!isHideSidebar && <SidebarNav product={product} />}
        <div className="block h-14 lg:hidden">&nbsp;</div>
        <div className="fixed left-0 top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border-primary-darkmode bg-bg-primary-darkmode px-4 py-2 lg:hidden">
          <Link href={CLIENT_PORTAL_PAGE}>
            <img src="/logo.png" className="mr-3 w-8" />
          </Link>
          <div className="flex items-center">
            <Button
              onClick={() => openCommandCenterModal()}
              color="primary"
              size="sm"
              className="mr-3 font-medium"
            >
              My Tools
            </Button>

            {/* HAMBURGER MENU FOR SUB PAGES */}
            {hasSubpages && (
              <Button
                size="sm"
                color="primary"
                className="m-0 w-auto min-w-[auto] p-0 px-2 font-medium"
              >
                {isMobileHamburgerOpen ? (
                  <XMarkIcon
                    className="m-0 w-6 p-0"
                    onClick={() => setIsMobileHamburgerOpen(false)}
                  />
                ) : (
                  <Bars3Icon
                    className="m-0 w-6 p-0"
                    onClick={() => setIsMobileHamburgerOpen(true)}
                  />
                )}
              </Button>
            )}
          </div>
        </div>
        {hasSubpages && isMobileHamburgerOpen && (
          <div className="fixed top-14 z-50 flex w-full flex-col gap-4 rounded-b-xl bg-brand-gray-800 py-3 text-white shadow-xl">
            {product.subPages.map(({ name, slug }) => (
              <Link className="w-full px-4" href={`/${product.slug.current}${slug}`}>
                {name}
              </Link>
            ))}
          </div>
        )}
        {/*  */}
        <main
          className={classNames(
            'flex h-fit grow flex-col lg:pb-0',
            !isIgnoreMobileTabs && 'pb-tabs',
            !isHideSidebar && 'lg:pl-side-nav',
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
}
