/**
 * ```webidl
 * dictionary ProgressEventInit : EventInit {
 *   boolean lengthComputable = false;
 *   unsigned long long loaded = 0;
 *   unsigned long long total = 0;
 * };
 * ```
 */
interface ProgressEventInit extends EventInit {
  /** @defaultValue false */
  lengthComputable: boolean;
  /** @defaultValue 0 */
  loaded: number;
  /** @defaultValue 0 */
  total: number;
}

const ProgressEventInit = {
  /**
   * @see https://webidl.spec.whatwg.org/#es-dictionary
   */
  from(o: unknown): ProgressEventInit {
    if (!(typeof o === "undefined" || typeof o === "object")) {
      throw new TypeError();
    }
    o ??= {}
    o.lengthComputable ??= false;
    o.loaded ??= 0
    o.total ??= 0
    return o;
  }
}

export default ProgressEventInit;
