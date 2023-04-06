type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text"

const XMLHttpRequestResponseType = {
  from(o: unknown): XMLHttpRequestResponseType {
    const string = "" + o
    const valid = ["","arraybuffer", "blob", "document","json","text"]
    if (!valid.includes(string)) {
      throw new TypeError();
    }
    return string;
  }
}

export default XMLHttpRequestResponseType
