import ProgressEventInit from "./ProgressEventInit.ts";

/**
 * ```webidl
 * [Exposed=(Window,Worker)]
 * interface ProgressEvent : Event {
 *   constructor(DOMString type, optional ProgressEventInit eventInitDict = {});
 *
 *   readonly attribute boolean lengthComputable;
 *   readonly attribute unsigned long long loaded;
 *   readonly attribute unsigned long long total;
 * };
 * ```
 */
class ProgressEvent extends Event {
  #lengthComputable: boolean;
  constructor(type: string, eventInitDict: ProgressEventInit = {}) {
    type = "" + type;
    eventInitDict = ProgressEventInit.from(eventInitDict);
  }

  get lengthComputable(): boolean {
    return this.#lengthComputable;
  }
}

export default ProgressEvent;
