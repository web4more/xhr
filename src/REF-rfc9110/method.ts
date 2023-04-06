import token from "./token.ts"

/**
 * The request method token is the primary source of request semantics; it indicates the purpose for which the client has made this request and what is expected by the client as a successful result.
 *
 * The request method's semantics might be further specialized by the semantics of some header fields when present in a request if those additional semantics do not conflict with the method. For example, a client can send conditional request header fields (Section 13.1) to make the requested action conditional on the current state of the target resource.
 *
 * HTTP is designed to be usable as an interface to distributed object systems. The request method invokes an action to be applied to a target resource in much the same way that a remote method invocation can be sent to an identified object.
 *
 * ```
 * method = token
 * ```
 *
 * @see https://httpwg.org/specs/rfc9110.html#method.overview
 */
const method = token

export default method
