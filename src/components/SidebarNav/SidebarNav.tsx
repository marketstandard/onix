import React from 'react';
import { useRouter } from 'next/router';
import { AuthStatus } from 'constants/auth';
import { HOME_PAGE } from 'constants/pages';
import { Product } from 'types/generated/sanity';
import { useModal } from 'hooks/useModal';
import Button from 'components/Button';
import Link from 'components/Link';
import classNames from 'styles/utils/classNames';

interface SidebarProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
  isActive: boolean;
}

const SidebarItem = ({ href, icon, text, isActive }: SidebarProps) => {
  return (
    <Link
      className={classNames(
        'relative flex items-center rounded-md transition-colors hover:text-text-primary-lightmode hover:dark:text-text-primary-darkmode',
        isActive
          ? 'text-text-primary-lightmode dark:text-text-primary-darkmode'
          : 'text-text-label-lightmode dark:text-text-label-darkmode',
      )}
      href={href}
    >
      {isActive && (
        <div className="absolute left-0 top-1 h-9 w-[5px] rounded-br-xl rounded-tr-xl bg-brand-primary"></div>
      )}
      <div className="mx-2 flex w-full items-center rounded-md py-3 pl-2 hover:bg-brand-gray-100 hover:dark:bg-brand-gray-800">
        <div className="flex w-full items-center">
          {!!icon && <span className={classNames('mr-4 w-5', isActive ? '' : '')}>{icon}</span>}
          <span className={classNames('text-sm', isActive ? '' : '')}>{text}</span>
        </div>
      </div>
    </Link>
  );
};

interface Props {
  isTopNavActive?: boolean;
  product?: Product | null;
}

export default function SidebarNav({ isTopNavActive, product }: Props) {
  const {
    isOpen: isCommandCenterOpen,
    openModal: openCommandCenterModal,
    closeModal: closeCommandCenterModal,
  } = useModal();

  return (
    <>
      <div
        className={classNames(
          'bg-color-bg-lightmode-primary border-primary-lightmode fixed bottom-0 left-0 z-30 hidden w-side-nav overflow-hidden border-r dark:border-border-primary-darkmode lg:block',
          isTopNavActive ? 'h-[calc(100vh-theme(height.top-nav))]' : 'h-screen',
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col">
            <Link href={HOME_PAGE}>
              <div className="flex items-center px-4 py-4 font-bold leading-none">
                <img src="/logo.png" className="mr-3 w-10" />{' '}
                <div className="bg-gradient-to-b font-title font-semibold text-gray-200">Onix</div>
              </div>
            </Link>
            <div className="flex h-full flex-auto grow flex-col space-y-2 overflow-y-auto pt-5">
              {false ? (
                <>
                  <div className="w-full px-4">
                    <Button
                      color="primary"
                      onClick={() => openCommandCenterModal()}
                      className="mb-4 w-full font-bold"
                    >
                      My Tools
                    </Button>
                  </div>
                  {/* <Select
                    label="My Tools"
                    selectedKeys={selectedKeys}
                    disableAnimation={true}
                    onSelectionChange={setSelectedKeys}
                    className="px-4"
                  >
                    {Array.from(sidebarItems.keys()).map((key) => {
                      return (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      );
                    })}
                  </Select> */}
                </>
              ) : null}
            </div>
            <div className="border-primary-lightmode w-full items-center pb-4 dark:border-border-primary-darkmode">
              {false ? (
                <div className="flex flex-col px-4 pb-4">
                  {/* <div className="grid grid-cols-12">
                    <div className="col-span-1">
                      <Cog8ToothIcon className="w-5" />
                    </div>
                    <div
                      className="group col-span-11 flex cursor-pointer items-center text-sm text-text-label-lightmode hover:text-text-primary-lightmode dark:text-text-label-darkmode hover:dark:text-text-primary-darkmode"
                      onClick={() => setIsSettingsOpen((prev) => !prev)}
                    >
                      <span className="ml-1.5 font-bold">Settings</span>
                    </div>
                    {isSettingsOpen ? (
                      <div className="col-span-11 col-start-2 ml-1.5 flex w-full flex-col items-start">
                        {SETTINGS_PAGES.map((page) => {
                          return (
                            <Link
                              className="text-text-label-lightmode hover:text-text-primary-lightmode dark:text-text-label-darkmode hover:dark:text-text-primary-darkmode"
                              href={page.href}
                            >
                              <span className="text-sm">{page.text}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div> */}
                  <Button
                    as={Link}
                    href={HOME_PAGE}
                    className="border-solid font-medium"
                    variant="ghost"
                    color="primary"
                  >
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-4 py-4">
                  <Button
                    onClick={() => {}}
                    className="rounded-2xl bg-brand-primary py-3 font-bold text-black"
                  >
                    Sign up
                  </Button>
                  <Button onClick={() => {}} className="rounded-2xl bg-brand-gray-700 py-3">
                    Log in
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
