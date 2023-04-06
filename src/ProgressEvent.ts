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
  #loaded: number;
  #total: number;
  constructor(type: string, eventInitDict: ProgressEventInit = {}) {
    type = "" + type;
    eventInitDict = ProgressEventInit.from(eventInitDict);

    super(type, eventInitDict)

    this.#lengthComputable = eventInitDict.lengthComputable
    this.#loaded = eventInitDict.loaded
    this.#total = eventInitDict.total
  }

  get lengthComputable(): boolean {
    return this.#lengthComputable;
  }
  get loaded(): number {
    return this.#loaded
  }
  get total(): number {
    return this.#total
  }
}

export default ProgressEvent;
