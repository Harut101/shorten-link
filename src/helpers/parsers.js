export function parseSearchParams(params) {
  return JSON.parse(
    '{"' +
      decodeURI(params.slice(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
