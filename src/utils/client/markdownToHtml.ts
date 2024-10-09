import 'highlight.js/styles/default.css';
import rehypeHighlight from 'rehype-highlight';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import { unified } from 'unified';

// or any other style you prefer

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(rehypeHighlight)
    // .use(remarkPrism)
    .use(remarkHtml, {sanitize: false})
    .process(markdown);

  const asString = result.toString();

  return asString;
}
