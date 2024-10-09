import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { auth, providerMap, signIn } from 'auth';
import { AuthError } from 'next-auth';
import Head from 'next/head';
import { redirect } from 'next/navigation';

const SIGNIN_ERROR_URL = '/login-test';

export default async function SignInPage() {
  const session = await auth();

  console.log('session', session);

  if (session?.user) {
    return redirect('/');
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex w-full justify-center px-2">
        <Card className="w-full max-w-lg p-8">
          <CardBody>
            <div className="mb-6 space-y-3 text-center">
              <div className="flex justify-center">
                <img src="/logo-white.png" className="h-16 text-brand-primary" />
              </div>
              <h1 className="text-2xl font-bold">Log In</h1>
              {/* <p className="text-sm text-gray-400">
              We use a magic link. Manage auth with... The only thing we store is your email in our
              database to manage application access. No other details are maintained.
            </p> */}
            </div>
            {Object.values(providerMap).map((provider) => (
              <form
                action={async (formData) => {
                  'use server';
                  try {
                    await signIn(provider.id, formData, { redirectTo: '/' });
                  } catch (error) {
                    // Signin can fail for a number of reasons, such as the user
                    // not existing, or the user not having the correct role.
                    // In some cases, you may want to redirect to a custom error
                    if (error instanceof AuthError) {
                      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                    }

                    // Otherwise if a redirects happens Next.js can handle it
                    // so you can just re-thrown the error and let Next.js handle it.
                    // Docs:
                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                    throw error;
                  }
                }}
              >
                <Input name="email" id="email" placeholder="Your email" />
                <div className="mt-2">
                  <Button
                    type="submit"
                    color="primary"
                    className="font-semibold text-black"
                    fullWidth
                  >
                    <span>Sign In Email Magic Link</span>
                  </Button>
                </div>
              </form>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
