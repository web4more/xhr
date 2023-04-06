async function replaceResponse(response: Response): any {
  const bodyBuffer = await response.arrayBuffer();
  const body = Buffer.from(body).toString("base64");

  return {
    url: response.url,
    redirected: response.redirected,
    headers: [...response.headers],
    body,
  };
}

export default replaceResponse;
