import { CookieSerializeOptions, parse, serialize } from 'cookie-es';

export function getTokenFromCookies(): string {
  const cookies = parse(document.cookie);
  return cookies.jwtToken ?? '';
}

export function setTokenToCookies(
  name: string = 'jwtToken',
  value: string,
  options?: CookieSerializeOptions,
) {
  const jwtTokenCookie = serialize(name, value, options);
  document.cookie = jwtTokenCookie;
}

export function removeTokenFromCookies(name: string = 'jwtToken') {
  const jwtTokenCookie = serialize(name, '', {
    expires: new Date(0),
  });
  document.cookie = jwtTokenCookie;
}
