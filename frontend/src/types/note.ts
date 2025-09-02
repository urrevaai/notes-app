export interface Note {
  id?: number;
  title: string;
  content: string;
  slug?: string;
}

export interface APIResponse {
  deleted?: number;
}