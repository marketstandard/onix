import fs from 'fs/promises';
import { globSync } from 'glob';
import { Document } from 'langchain/document';

export async function processFilesToDocs(directoryPath: string): Promise<Document[]> {
  try {
    const fileNames = await globSync(`${directoryPath}/**/*.{md,csv}`, { absolute: true });
    console.log('files', fileNames);

    const docs: Document[] = [];
    for (const fileName of fileNames) {
      const filePath = fileName;
      const text = await fs.readFile(filePath, {
        encoding: 'utf-8',
      });
      const metadata = { source: fileName };
      docs.push(
        new Document({
          pageContent: text,
          metadata,
        }),
      );
    }
    console.log('docs', docs);
    return docs;
  } catch (error) {
    console.log('error', error);
    throw new Error(`Could not read directory path ${directoryPath} `);
  }
}
