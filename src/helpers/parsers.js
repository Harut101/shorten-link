export function parseSearchParams(params) {
  return JSON.parse(
    '{"' +
      decodeURI(params)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
