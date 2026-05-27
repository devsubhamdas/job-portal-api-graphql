declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOSTNAME: string;
    DATABASE_URL: string;
    ORIGIN_1: string;
    ORIGIN_2: string;
  }
}
