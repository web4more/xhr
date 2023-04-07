import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget.ts";

// Pseudo-WeakMap that uses internal Node.js symbols to get the number of
// listeners for a given XMLHttpRequestUpload instance. Used in the main
// XMLHttpRequest class to determine if it should spend time dispatching
// events to the upload object.
const listenersSize = {
  get(target: XMLHttpRequestUpload): number | undefined {
    if (!(target instanceof XMLHttpRequestUpload)) {
      return undefined;
    }

    const symbols = Object.getOwnPropertySymbols(target);
    const kEvents = symbols.find((s) => s.description === "kEvents");
    return kEvents != null ? target[kEvents]?.events?.size ?? 1 : 1;
  },
};
/**
 * ```webidl
 * [Exposed=(Window,DedicatedWorker,SharedWorker)]
 * interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {
 * };
 * ```
 */
class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {}

export default XMLHttpRequestUpload;
export { listenersSize };
