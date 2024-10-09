import { DetailedHTMLProps, HTMLAttributes, RefAttributes } from 'react';

export type DetailedHTML<T> = DetailedHTMLProps<HTMLAttributes<T> & RefAttributes<T>, T>;
