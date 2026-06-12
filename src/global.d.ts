type GtagEventParams = {
  send_to?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
};

type Gtag = {
  (command: "js", config: Date): void;
  (command: "config", targetId: string, config?: Record<string, unknown>): void;
  (command: "event", eventName: string, eventParams?: GtagEventParams): void;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

export {};