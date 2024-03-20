export class WebSocketService {
  private ws: WebSocket;
  private ee: EventTarget;

  private constructor(ws: WebSocket) {
    this.ee = new EventTarget();
    this.ws = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.ee.dispatchEvent(new CustomEvent(data.event, { detail: data.data }));
    };
  }

  public on<T>(eventName: string, cb: (data: T) => void) {
    this.ee.addEventListener(eventName, (event) => {
      cb((<CustomEvent>event).detail);
    });
  }

  public close() {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.close();
  }

  public static create(url: string) {
    WebSocketService.instance = new WebSocketService(new WebSocket(url));
    return WebSocketService.instance;
  }

  public static getInstace(): WebSocketService {
    return WebSocketService.instance;
  }

  private static instance: WebSocketService;
}
