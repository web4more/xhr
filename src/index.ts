import XMLHttpRequestEventTarget from "./XMLHttpRequestEventTarget.ts"
import XMLHttpRequestUpload from "./XMLHttpRequestUpload.ts"
import XMLHttpRequestResponseType from "./XMLHttpRequestResponseType.ts"
import XMLHttpRequest from "./XMLHttpRequest.ts";
import ProgressEvent from "./ProgressEvent.ts"
import ProgressEventInit from "./ProgressEventInit.ts"

declare global {
  var XMLHttpRequestEventTarget: typeof XMLHttpRequestEventTarget
  var XMLHttpRequestUpload: typeof XMLHttpRequestUpload
  type XMLHttpRequestResponseType = XMLHttpRequestResponseType;
  var XMLHttpRequest: typeof XMLHttpRequest
  var ProgressEvent: typeof ProgressEvent;
  type ProgressEventInit = ProgressEventInit;
}

globalThis.XMLHttpRequestEventTarget = XMLHttpRequestEventTarget;
globalThis.XMLHttpRequestUpload = XMLHttpRequestUpload
globalThis.XMLHttpRequest = XMLHttpRequest;
globalThis.ProgressEvent = ProgressEvent;
