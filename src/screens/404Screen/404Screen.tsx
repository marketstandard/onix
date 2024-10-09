import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';
import { useRouter } from 'next/router';
import SafeAreaPage from 'layouts/SafeAreaPage';
import Button from 'components/Button';

export default function Screen404() {
  const router = useRouter();

  useEffect(() => {
    const message = `User reached 404 while trying to access ${router.asPath}`;

    console.log(message);

    const error = new Error(message);
    captureException(error);
  }, []);

  return (
    <SafeAreaPage product={null}>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col">
          <h2 className="text-center text-xl font-bold">404</h2>
          <p>This page could not be found</p>
        </div>
      </div>
    </SafeAreaPage>
  );
}
