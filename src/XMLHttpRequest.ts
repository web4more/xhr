import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget.ts";
import onstar from "./onstar.ts";
import { pathToFileURL } from "node:url";
import XMLHttpRequestResponseType from "./XMLHttpRequestResponseType.ts";
import XMLHttpRequestUpload, { listenersSize } from "./XMLHttpRequestUpload.ts";

if (typeof fetch === "undefined") {
  const { fetch, Request, Response, Headers, FormData } = await import(
    "undici"
  );
  // @ts-ignore
  globalThis.fetch = fetch;
  // @ts-ignore
  globalThis.Request = Request;
  // @ts-ignore
  globalThis.Response = Response;
  // @ts-ignore
  globalThis.Headers = Headers;
  // @ts-ignore
  globalThis.FormData = FormData;
}

/** A flag. Initially unset. */
const uploadListenerFlag = new WeakMap<XMLHttpRequest, boolean>();
class XMLHttpRequest extends XMLHttpRequestEventTarget {
  static readonly UNSENT: 0;
  static readonly OPENED: 1;
  static readonly HEADERS_RECEIVED: 2;
  static readonly LOADING: 3;
  static readonly DONE: 4;
  readonly UNSENT: 0;
  readonly OPENED: 1;
  readonly HEADERS_RECEIVED: 2;
  readonly LOADING: 3;
  readonly DONE: 4;

  static {
    // @ts-ignore
    this.UNSENT = 0;
    // @ts-ignore
    this.OPENED = 1;
    // @ts-ignore
    this.HEADERS_RECEIVED = 2;
    // @ts-ignore
    this.LOADING = 3;
    // @ts-ignore
    this.DONE = 4;
    // @ts-ignore
    this.prototype.UNSENT = 0;
    // @ts-ignore
    this.prototype.OPENED = 1;
    // @ts-ignore
    this.prototype.HEADERS_RECEIVED = 2;
    // @ts-ignore
    this.prototype.LOADING = 3;
    // @ts-ignore
    this.prototype.DONE = 4;

    onstar(this, "readystatechange");
  }

  /** An XMLHttpRequestUpload object. * */
  #uploadObject: XMLHttpRequestUpload;
  /**
   * One of unsent, opened, headers received, loading, and done; initially
   * unsent.
   */
  #state: "unsent" | "opened" | "headers received" | "loading" | "done" =
    "unsent";
  /** A flag, initially unset. */
  #sendFlag: boolean = false;
  /** An unsigned integer, initially 0. */
  #timeout: number = 0;
  /** A boolean, initially false. */
  #crossOriginCredentials: boolean = false;
  /** A method. */
  #requestMethod: string | null = null;
  /** A URL. */
  #requestURL: URL | null = null;
  /** A header list, initially empty. */
  #authorRequestHeaders: Headers = new Headers();
  /** Initially null. */
  #requestBody: BodyInit | null = null;
  /** A flag, initially unset. */
  #synchronousFlag: boolean = false;
  /** A flag, initially unset. */
  #uploadCompleteFlag: boolean = false;
  /** A flag, initially unset. */
  #uploadListenerFlag: boolean = false;
  /** A flag, initially unset. */
  #timedOutFlag: boolean = false;
  /** A response, initially a network error. */
  #response: Response | "network error" = "network error";
  /** A byte sequence, initially the empty byte sequence. */
  #receivedBytes = new Uint8Array();
  /**
   * One of the empty string, "arraybuffer", "blob", "document", "json", and
   * "text"; initially the empty string.
   */
  #responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text" =
    "";
  /** An object, failure, or null, initially null. */
  #responseObject: any = null;
  /**
   * A fetch controller, initially a new fetch controller. The send() method
   * sets it to a useful fetch controller, but for simplicity it always holds a
   * fetch controller.
   */
  #fetchController = new AbortController();
  /**
   * A MIME type or null, initially null. Can get a value when
   * overrideMimeType() is invoked.
   */
  #overrideMimeType: string | null = null;

  /**
   * ```js
   * client = new XMLHttpRequest();
   * ```
   *
   * Returns a new XMLHttpRequest object.
   */
  constructor() {
    super();

    // The new XMLHttpRequest() constructor steps are:

    // 1. Set this’s upload object to a new XMLHttpRequestUpload object.
    this.#uploadObject = new XMLHttpRequestUpload();

    uploadListenerFlag.set(this, false);
  }

  /**
   * ```js
   * client . open(method, url [, async = true [, username = null [, password = null]]])
   * ```
   *
   * Sets the request method, request URL, and synchronous flag.
   *
   * Throws a "SyntaxError" DOMException if either method is not a valid method
   * or url cannot be parsed.
   *
   * Throws a "SecurityError" DOMException if method is a case-insensitive match
   * for `CONNECT`, `TRACE`, or `TRACK`.
   *
   * Throws an "InvalidAccessError" DOMException if async is false, the current
   * global object is a Window object, and the timeout attribute is not zero or
   * the responseType attribute is not the empty string.
   *
   * @see https://xhr.spec.whatwg.org/#dom-xmlhttprequest-open
   */
  open(method: string, url: string): void;
  /**
   * ```js
   * client . open(method, url [, async = true [, username = null [, password = null]]])
   * ```
   *
   * Sets the request method, request URL, and synchronous flag.
   *
   * Throws a "SyntaxError" DOMException if either method is not a valid method
   * or url cannot be parsed.
   *
   * Throws a "SecurityError" DOMException if method is a case-insensitive match
   * for `CONNECT`, `TRACE`, or `TRACK`.
   *
   * Throws an "InvalidAccessError" DOMException if async is false, the current
   * global object is a Window object, and the timeout attribute is not zero or
   * the responseType attribute is not the empty string.
   *
   * @see https://xhr.spec.whatwg.org/#dom-xmlhttprequest-open
   */
  open(
    method: string,
    url: string,
    async: boolean,
    username?: string | null,
    password?: string | null
  ): void;
  /**
   * ```js
   * client . open(method, url [, async = true [, username = null [, password = null]]])
   * ```
   *
   * Sets the request method, request URL, and synchronous flag.
   *
   * Throws a "SyntaxError" DOMException if either method is not a valid method
   * or url cannot be parsed.
   *
   * Throws a "SecurityError" DOMException if method is a case-insensitive match
   * for `CONNECT`, `TRACE`, or `TRACK`.
   *
   * Throws an "InvalidAccessError" DOMException if async is false, the current
   * global object is a Window object, and the timeout attribute is not zero or
   * the responseType attribute is not the empty string.
   *
   * @see https://xhr.spec.whatwg.org/#dom-xmlhttprequest-open
   */
  open(
    method: string,
    url: string,
    async: boolean | undefined = undefined,
    username: string | null | undefined = null,
    password: string | null | undefined = null
  ): void {
    method = "" + method;
    url = "" + url;
    // undefined is treated as FALSE here instead of defaulting to true. We only
    // default to true if the argument is omitted.
    if (arguments.length < 3) {
      async = true;
    } else {
      async = !!async;
    }
    username = username == null ? null : "" + username;
    password = password == null ? null : "" + password;

    // The open(method, url) and open(method, url, async, username, password)
    // method steps are:

    // 2. If method is not a method, then throw a "SyntaxError" DOMException.
    const re = /^(?:\!|#|\$|%|&|'|\*|\+|\-|\.|\^|_|`|\||~|\d|[a-zA-Z])+$/;
    if (!re.test(method)) {
      throw new DOMException("method is not a method", "SyntaxError");
    }

    // 3. If method is a forbidden method, then throw a "SecurityError"
    //    DOMException.
    if (["CONNECT", "TRACE", "TRACK"].includes(method.toUpperCase())) {
      throw new DOMException("method is a forbidden method", "SecurityError");
    }

    // 4. Normalize method. To normalize a method, if it is a
    //    byte-case-insensitive match for `DELETE`, `GET`, `HEAD`, `OPTIONS`,
    //    `POST`, or `PUT`, byte-uppercase it.
    if (/^(?:DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method)) {
      method = method.toUpperCase();
    }

    // 5. Let parsedURL be the result of parsing url with this’s relevant
    //    settings object’s API base URL and this’s relevant settings object’s
    //    API URL character encoding.
    let parsedURL: URL;
    try {
      parsedURL = new URL(url, pathToFileURL(process.cwd()));
    } catch (error) {
      // 6. If parsedURL is failure, then throw a "SyntaxError" DOMException.
      throw new DOMException("url cannot be parsed", "SyntaxError");
    }

    // 7. If the async argument is omitted, set async to true, and set username
    //    and password to null.
    /* Already done above */
    // Note: Unfortunately legacy content prevents treating the async argument
    // being undefined identical from it being omitted.

    // 8. If parsedURL’s host is non-null, then:
    if (parsedURL.host !== null) {
      // 1. If the username argument is not null, set the username given
      //    parsedURL and username.
      if (username !== null) {
        parsedURL.username = username;
      }

      // 2. If the password argument is not null, set the password given
      //    parsedURL and password.
      if (password !== null) {
        parsedURL.password = password;
      }
    }

    // 9. If async is false, the current global object is a Window object, and
    //    either this’s timeout is not 0 or this’s response type is not the
    //    empty string, then throw an "InvalidAccessError" DOMException.
    if (!async && (this.#timeout !== 0 || this.responseType !== "")) {
      throw new DOMException(undefined, "InvalidAccessError");
    }

    // 10. Terminate this’s fetch controller.
    this.#fetchController.abort();
    // Note: A fetch can be ongoing at this point.

    // 11. Set variables associated with the object as follows:
    // - Unset this’s send() flag.
    this.#sendFlag = false;
    // - Unset this’s upload listener flag.
    this.#uploadListenerFlag = false;
    // - Set this’s request method to method.
    this.#requestMethod = method;
    // - Set this’s request URL to parsedURL.
    this.#requestURL = parsedURL;
    // - Set this’s synchronous flag if async is false; otherwise unset this’s synchronous flag.
    this.#synchronousFlag = !async;
    // - Empty this’s author request headers.
    this.#authorRequestHeaders = new Headers();
    // - Set this’s response to a network error.
    this.#response = "network error";
    // - Set this’s received bytes to the empty byte sequence.
    this.#receivedBytes = new Uint8Array();
    // - Set this’s response object to null.
    this.#responseObject = null;
    // Note: Override MIME type is not overridden here as the overrideMimeType()
    // method can be invoked before the open() method.

    // 12. If this’s state is not opened, then:
    if (this.#state !== "opened") {
      // 1. Set this’s state to opened.
      this.#state = "opened";

      // 2. Fire an event named readystatechange at this.
      this.dispatchEvent(new Event("readystatechange"));
    }
  }

  /**
   * ```js
   * client.setRequestHeader(name, value);
   * ```
   *
   * Appends a value to an existing request header or adds a new request header.
   *
   * Throws an "InvalidStateError" DOMException if either state is not opened or
   * the send() flag is set.
   *
   * Throws a "SyntaxError" DOMException if name is not a header name or if
   * value is not a header value.
   */
  setRequestHeader(name: string, value: string): void {
    // The setRequestHeader(name, value) method must run these steps:

    // 1. If this’s state is not opened, then throw an "InvalidStateError" DOMException.
    if (this.#state !== "opened") {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 2. If this’s send() flag is set, then throw an "InvalidStateError" DOMException.
    if (this.#sendFlag) {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 3. Normalize value.
    value = value.trim();

    // 4. If name is not a header name or value is not a header value, then throw a "SyntaxError" DOMException.
    if (
      !/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(name) ||
      !/^[ \t\x21-\x7E\x80-\xFF]*$/.test(value)
    ) {
      throw new DOMException(
        "name or value is not a header name or value",
        "SyntaxError"
      );
    }
    // Note: An empty byte sequence represents an empty header value.

    // 6. Combine (name, value) in this’s author request headers.
    this.#authorRequestHeaders.append(name, value);
  }

  /**
   * ```js
   * client.timeout;
   * ```
   *
   * Can be set to a time in milliseconds. When set to a non-zero value will
   * cause fetching to terminate after the given time has passed. When the time
   * has passed, the request has not yet completed, and this’s synchronous flag
   * is unset, a timeout event will then be dispatched, or a "TimeoutError"
   * DOMException will be thrown otherwise (for the send() method).
   *
   * When set: throws an "InvalidAccessError" DOMException if the synchronous
   * flag is set and the current global object is a Window object.
   */
  get timeout(): number {
    // The timeout getter steps are to return this’s timeout.
    return this.#timeout;
  }
  set timeout(timeout: number) {
    // The timeout setter steps are:

    // 1. If the current global object is a Window object and this’s synchronous
    //    flag is set, then throw an "InvalidAccessError" DOMException.
    if (this.#synchronousFlag) {
      throw new DOMException(undefined, "InvalidAccessError");
    }

    // 2. Set this’s timeout to the given value.
    this.#timeout = timeout;
    // Note: This implies that the timeout attribute can be set while fetching
    // is in progress. If that occurs it will still be measured relative to the
    // start of fetching.
  }

  /**
   * ```js
   * client.withCredentials;
   * ```
   *
   * True when credentials are to be included in a cross-origin request. False
   * when they are to be excluded in a cross-origin request and when cookies are
   * to be ignored in its response. Initially false.
   *
   * When set: throws an "InvalidStateError" DOMException if state is not unsent
   * or opened, or if the send() flag is set.
   */
  get withCredentials(): boolean {
    // The withCredentials getter steps are to return this’s cross-origin credentials.
    return this.#crossOriginCredentials;
  }
  set withCredentials(withCredentials: boolean) {
    // The withCredentials setter steps are:

    // 1. If this’s state is not unsent or opened, then throw an
    //    "InvalidStateError" DOMException.
    if (!(this.#state === "unsent" || this.#state === "opened")) {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 2. If this’s send() flag is set, then throw an "InvalidStateError"
    //    DOMException.
    if (this.#sendFlag) {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 3. Set this’s cross-origin credentials to the given value.
    this.#crossOriginCredentials = withCredentials;
  }

  /**
   * ```js
   * client.upload;
   * ```
   *
   * Returns the associated XMLHttpRequestUpload object. It can be used to
   * gather transmission information when data is transferred to a server.
   */
  get upload(): XMLHttpRequestUpload {
    // The upload getter steps are to return this’s upload object.
    return this.#uploadObject;
  }

  /**
   * ```js
   * client.send([(body = null)]);
   * ```
   *
   * Initiates the request. The body argument provides the request body, if any,
   * and is ignored if the request method is GET or HEAD.
   *
   * Throws an "InvalidStateError" DOMException if either state is not opened or
   * the send() flag is set.
   */
  send(body: Document | XMLHttpRequestBodyInit | null = null): void {
    // The send(body) method steps are:

    // 1. If this’s state is not opened, then throw an "InvalidStateError"
    //    DOMException.
    if (this.#state !== "opened") {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 2. If this’s send() flag is set, then throw an "InvalidStateError"
    //    DOMException.
    if (this.#sendFlag) {
      throw new DOMException(undefined, "InvalidStateError");
    }

    // 3. If this’s request method is `GET` or `HEAD`, then set body to null.
    if (this.#requestMethod === "GET" || this.#requestMethod === "HEAD") {
      body = null;
    }

    // 5. If one or more event listeners are registered on this’s upload object,
    //    then set this’s upload listener flag.
    if (listenersSize(this.#uploadObject) > 0) {
      this.#uploadListenerFlag = true;
    }

    // 6. Let req be a new request, initialized as follows:
    const req = new Request(
      // URL
      // This’s request URL.
      "" + this.#requestURL,
      {
        // method
        // This’s request method.
        method: this.#requestMethod!,
        // header list
        // This’s author request headers.
        headers: this.#authorRequestHeaders,
        // body
        // This’s request body.
        body: this.#requestBody,
        // mode
        // "cors".
        mode: "cors",
        // credentials mode If this’s cross-origin credentials is true, then
        // "include"; otherwise "same-origin".
        credentials: this.#crossOriginCredentials ? "include" : "same-origin",
      }
    );
    // Needed for synchronous serialization!
    // @ts-ignore
    req.rawBody = body;

    // 7. Unset this’s upload complete flag.
    this.#uploadCompleteFlag = false;

    // 8. Unset this’s timed out flag.
    this.#timedOutFlag = false;

    // 9. If req’s body is null, then set this’s upload complete flag.
    if (req.body === null) {
      this.#uploadCompleteFlag = true;
    }

    // 10. Set this’s send() flag.
    this.#sendFlag = true;

    // 11.
    if (false) {
    }

    // 12. Otherwise, if this’s synchronous flag is set:
    else if (this.#synchronousFlag) {
      // Run subprocess synchronously!
      const subprocessPath = fileURLToPath(
        new URL("./subprocess.ts", import.meta.url)
      );
      const subprocess = spawnSync(subprocessPath, [], {
        input: JSON.stringify(replaceRequest(req)),
      });
      const response = reviveResponse(JSON.parse("" + subprocess.stdout));

      // 8. Run handle response end-of-body for this.
      handleResponseEndOfBody(this);
    }
  }

  abort(): void {}

  getResponseHeader(name: string): string | null {}

  getAllResponseHeaders(): string {}

  overrideMimeType(string: mime): void {}
}

export default XMLHttpRequest;
export { uploadListenerFlag };
