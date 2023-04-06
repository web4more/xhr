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

export default ProgressEventInit;
