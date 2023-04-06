function reviveRequest(o: any): Request {
  let body: BufferSource | null;
  if (o.body != null) {
    body = Buffer.from(o.body, "base64");
  } else {
    body = null;
  }

  return new Request(o.url, { ...o, body });
}

export default reviveRequest;
