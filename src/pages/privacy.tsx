import React from 'react';
import Head from 'components/Head';

export default function Privacy() {
  return (
    <>
      <Head title="Privacy Policy" description="The Onix privacy policy." noIndex />
      <div className="p-8">
        All your data and details will remain private. Email eng@onix.chat with questions or
        feedback.
      </div>
    </>
  );
}
