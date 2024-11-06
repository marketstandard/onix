import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { auth, providerMap, signIn } from 'auth';
import { AuthError } from 'next-auth';
import Head from 'next/head';
import { redirect } from 'next/navigation';

const SIGNIN_ERROR_URL = '/login-error';

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
                <div className="relative inline-flex h-10 min-h-10 w-full flex-row items-center gap-3 rounded-medium bg-default-100 px-3 shadow-sm outline-none !duration-150 tap-highlight-transparent transition-background data-[hover=true]:bg-default-200 group-data-[focus-visible=true]:z-10 group-data-[focus=true]:bg-default-100 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background motion-reduce:transition-none">
                  <div className="box-border inline-flex h-full w-full items-center">
                    <input
                      className="w-full rounded-md bg-transparent bg-clip-text text-small font-normal !outline-none file:cursor-pointer file:border-0 file:bg-transparent placeholder:text-foreground-500 autofill:bg-transparent focus-visible:outline-none data-[has-end-content=true]:pe-1.5 data-[has-start-content=true]:ps-1.5 group-data-[has-value=true]:text-default-foreground"
                      name="email"
                      id="email"
                      placeholder="Your email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
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
