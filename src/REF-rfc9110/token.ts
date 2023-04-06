/**
 * Tokens are short textual identifiers that do not include whitespace or delimiters.
 *
 * ```
 * token          = 1*tchar
 *
 * tchar          = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *                / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *                / DIGIT / ALPHA
 *                ; any VCHAR, except delimiters
 * ```
 *
 * Many HTTP field values are defined using common syntax components, separated
 * by whitespace or specific delimiting characters. Delimiters are chosen from
 * the set of US-ASCII visual characters not allowed in a token (DQUOTE and
 * "(),/:;<=>?@[\]{}").
 *
 * @see https://httpwg.org/specs/rfc9110.html#rule.token.separators
 */
const token = /(?:\!|#|\$|%|&|'|\*|\+|\-|\.|\^|_|`|\||~|\d|[a-zA-Z])+/

export default token
