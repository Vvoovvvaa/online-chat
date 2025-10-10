export interface AuthenticatedWebSocket {
  length(): any;
  url?: string;
  user?: {
    id: number;
    name: string;
    phone?: string;
  };
  send(arg0: string): void;
  readyState: number;
  OPEN: number;
  close(): void;
}
