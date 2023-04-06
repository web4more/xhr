import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget.ts"

class XMLHttpRequest extends XMLHttpRequestEventTarget {
  static readonly UNSENT;
  static readonly OPENED;
  static readonly HEADERS_RECEIVED;
  static readonly LOADING;
  static readonly DONE;

  static {
    this.UNSENT = 0
    this.OPENED = 1
    this.HEADERS_RECEIVED = 2
    this.LOADING = 3
    this.DONE = 4
    this.prototype.UNSENT = 0
    this.prototype.OPENED = 1
    this.prototype.HEADERS_RECEIVED = 2
    this.prototype.LOADING = 3
    this.prototype.DONE = 4

    onstar(this, "readystatechange")
  }

  readonly UNSENT;
  readonly OPENED;
  readonly HEADERS_RECEIVED;
  readonly LOADING;
  readonly DONE;
  constructor() {}

  get upload(): XMLHttpRequestUpload {}
  get responseURL(): string {}
  get status(): number {}
  get statusText(): string {}
  get responseType(): XMLHttpResponseType {}
  get response(): any {}
  get responseText(): string {}
  get responseXML(): Document | null {}

  open(method: string, url: string): void;
  open(method: string, url: string, async: boolean, username?: string | null, password?: string | null): void;
  open(method: string, url: string, async: boolean | undefined = undefined, username: string | null | undefined = undefined, password: string | null | undefined = undefined): void {
    if (arguments.length < 2) {
      
    } else if (arguments.length === 2) {
      method = "" + method
      url = "" + url

    } else {

    }

    if (!(method instanceof Method)) {
      throw new DOMException(undefined, "SyntaxError")
    }
    if (method instanceof ForbiddenMethod) {
      throw new DOMException(undefined, "SecurityError")
    }

    if (arguments < 3) {
      async = true
    }

    if (async) {
      (async () => {
        try {

        } catch (error) {
          const event = new ErrorEvent("error", { error })
          this.dispatchEvent(event)
        }
      })()
    } else {}
  }
  send(body: Document | XMLHttpRequestBodyInit = null): void {}

  abort(): void {}

  getResponseHeader(name: string): string | null {}

  getAllResponseHeaders(): string {}

  overrideMimeType(string: mime): void {}
}

export default XMLHttpRequest;
