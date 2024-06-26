interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Image {
  id: string;
  project: number;
  url: string;
}

interface Project {
  id: number;
  title: string;
  tags: string[];
  images: Image[];
}
