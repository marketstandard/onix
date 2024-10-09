import { mdToPdf } from 'md-to-pdf';

export const markdownToPdf = async (markdown: string, outputFilename: string = 'output.pdf') => {
  const output = await mdToPdf({ content: markdown }); //, { dest: `/tmp/${outputFilename}` });

  return output.content;
};
