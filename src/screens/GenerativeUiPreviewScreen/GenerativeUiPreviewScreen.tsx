import SafeAreaPage from 'layouts/SafeAreaPage';
import GenerativeUserInterface from 'components/GenerativeUserInterface';
import Head from 'components/Head';

/**
 * @todo Use storybook to preview components
 */

export default function GenerativeUiPreviewScreen() {
  return (
    <>
      <Head noIndex />
      <SafeAreaPage product={null}>
        <div>
          <h1 className="p-4">GenUI Component Preview</h1>
          <div className="flex w-full flex-col gap-8">
            <div className="px-4">
              <h2 className="text-brand-gray-300">Weather component (TEST, delete)</h2>
              <GenerativeUserInterface
                component="Weather"
                props={{
                  temperature: 25,
                  scale: 'C',
                }}
              />
            </div>
            <div className="px-4">
              <h2 className="text-brand-gray-300">Sources component</h2>
              <GenerativeUserInterface
                component="Sources"
                props={{
                  sources: [
                    {
                      name: 'Economist',
                      url: 'https://www.economist.com',
                    },
                    {
                      name: 'BBC',
                      url: 'https://bbc.com',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </SafeAreaPage>
    </>
  );
}
