import onstar from "./onstar.ts"

/**
 * ```webidl
 * [Exposed=(Window,DedicatedWorker,SharedWorker)]
 * interface XMLHttpRequestEventTarget : EventTarget {
 *   // event handlers
 *   attribute EventHandler onloadstart;
 *   attribute EventHandler onprogress;
 *   attribute EventHandler onabort;
 *   attribute EventHandler onerror;
 *   attribute EventHandler onload;
 *   attribute EventHandler ontimeout;
 *   attribute EventHandler onloadend;
 * };
 * ```
 */
class XMLHttpRequestEventTarget extends EventTarget {
  static {
    onstar(this, "loadstart")
    onstar(this, "progress")
    onstar(this, "abort")
    onstar(this, "error")
    onstar(this, "load")
    onstar(this, "timeout")
    onstar(this, "loadend")
  }

  onloadstart: ((event: Event) => any) | null
  onprogress: ((event: Event) => any) | null
  onabort: ((event: Event) => any) | null
  onerror: ((event: Event) => any) | null
  onload: ((event: Event) => any) | null
  ontimeout: ((event: Event) => any) | null
  onloadend: ((event: Event) => any) | null
}

export default XMLHttpRequestEventTarget
