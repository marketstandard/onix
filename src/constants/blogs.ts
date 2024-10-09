export interface Post {
  title: string;
  categories: Tag[];
  description: string;
  href: string;
  createdDate: string;
  imageUrl: string | null;
  wordCount: number;
}

export interface Tag {
  color: string;
  title: string;
}

export interface CategorizedPosts {
  category: string;
  posts: Post[];
}

export const DEFAULT_IMAGE =
  'https://cdn.sanity.io/images/b1blnjo9/production/5f6ae1d02e0a1dae0f8f3f44e1dcb16a42edad14-1456x832.png';
