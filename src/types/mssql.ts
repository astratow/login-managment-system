import 'mssql';

declare module 'mssql' {
  export function close(): Promise<void>;
}