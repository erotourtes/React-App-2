export class WebSocketService {
  private ws: WebSocket;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private callbacks: Record<string, ((data: any) => void) | undefined> = {};

  private constructor(ws: WebSocket) {
    this.ws = ws;
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit(data.event, data.data);
    };
  }

  public on<T>(eventName: string, cb: (data: T) => void) {
    this.callbacks[eventName] = cb;
  }

  public close() {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.close();
  }

  private emit<T>(eventName: string, data: T) {
    const callback = this.callbacks[eventName];
    if (callback) callback(data);
  }

  public static getInstance(url: string): WebSocketService {
    if (!WebSocketService.instance) WebSocketService.instance = new WebSocketService(new WebSocket(url));

    return WebSocketService.instance;
  }

  private static instance: WebSocketService;
}
