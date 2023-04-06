import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget.ts"

/**
 * ```webidl
 * [Exposed=(Window,DedicatedWorker,SharedWorker)]
 * interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {
 * };
 * ```
 */
class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {}

export default XMLHttpRequestUpload
