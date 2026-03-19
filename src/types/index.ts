export interface BlogPost {
  id: string;
  title: string;
  date: string;
  body?: string;
  tag?: string;
  /** If set, clicking the entry opens this URL instead of the modal. */
  url?: string;
}
