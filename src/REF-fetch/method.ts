import method from "../REF-rfc9110/method.ts"

/**
 * A method is a byte sequence that matches the method token production.
 *
 * @see https://fetch.spec.whatwg.org/#concept-method
 */
const Method = {
  [Symbol.hasInstance](o: unknown): o is Method {
    return typeof o === "string" && method.test(o);
  }
}

export default Method;
