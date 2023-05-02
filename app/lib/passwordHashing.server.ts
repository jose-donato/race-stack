import invariant from "tiny-invariant";
type HashArgs = {
  password: string;
  pepper?: string;
  iterations?: number;
};
/**
 * Hashes password using the PBKDF2 algorithm
 *
 * @example
 *  const hash = await hash({
 *    password: passwordInput.toString(),
 *    pepper: context.authPepper,
 *  })
 */
export const hash = async ({
  password,
  pepper = "",
  iterations = 1e5,
}: HashArgs) => {
  const passwordUtf = new TextEncoder().encode(`${password}${pepper}`); // encode pw as UTF-8
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    passwordUtf,
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const saltIntArray = crypto.getRandomValues(new Uint8Array(16)); // get random salt
  const keyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltIntArray.buffer,
      iterations: iterations,
    },
    passwordKey,
    256
  );
  const keyBytes = Array.from(new Uint8Array(keyBuffer));
  const saltBytes = Array.from(new Uint8Array(saltIntArray));
  const iterationsHex = ("000000" + iterations.toString(16)).slice(-6);
  const iterationsPairs = iterationsHex.match(/.{2}/g);
  invariant(iterationsPairs);
  const iterationsBytes = iterationsPairs.map((byte) => parseInt(byte, 16));
  const compositeBytes = [...saltBytes, ...iterationsBytes, ...keyBytes];
  const compositeString = compositeBytes
    .map((byte) => String.fromCharCode(byte))
    .join("");
  const compositeBase64 = (btoa as (data: string) => string)(
    "v01" + compositeString
  );
  return compositeBase64;
};
type VerifyArgs = {
  hash: string;
  password: string;
  pepper?: string;
};
/**
 * Verifies that the supplied password (user input) matches the supplied hash
 *
 * @example
 *   const isValid = await pbkdf2.verify({
 *     password: passwordInput.toString(),
 *     pepper: authPepper,
 *     hash: dbUser.password,
 *   })
 */
export const verify = async ({ hash, password, pepper = "" }: VerifyArgs) => {
  let compositeString = null;
  try {
    compositeString = (atob as (data: string) => string)(hash);
  } catch (e) {
    throw new Error("Invalid hash");
  }
  const INITIAL_PREFIX_LENGTH = 0;
  const VERSION_LENGTH = 3;
  const SALT_LENGTH = 16;
  const ITERATIONS_LENGTH = 3;
  const KEY_LENGTH = 32;
  const versionString = compositeString.slice(
    INITIAL_PREFIX_LENGTH,
    VERSION_LENGTH
  );
  const saltString = compositeString.slice(
    VERSION_LENGTH,
    VERSION_LENGTH + SALT_LENGTH
  );
  const iterationsString = compositeString.slice(
    VERSION_LENGTH + SALT_LENGTH,
    VERSION_LENGTH + SALT_LENGTH + ITERATIONS_LENGTH
  );
  const keyString = compositeString.slice(
    VERSION_LENGTH + SALT_LENGTH + ITERATIONS_LENGTH,
    VERSION_LENGTH + SALT_LENGTH + ITERATIONS_LENGTH + KEY_LENGTH
  );
  if (versionString != "v01") throw new Error("Invalid hash");
  const saltCharacters = saltString.match(/./g);
  invariant(saltCharacters);
  const saltIntArray = new Uint8Array(
    saltCharacters.map((ch) => ch.charCodeAt(0))
  );
  const iterationsCharacters = iterationsString.match(/./g);
  invariant(iterationsCharacters);
  const iterationsHex = iterationsCharacters
    .map((ch) => ch.charCodeAt(0).toString(16))
    .join("");
  const iterations = parseInt(iterationsHex, 16);
  const passwordUtf = new TextEncoder().encode(`${password}${pepper}`);
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    passwordUtf,
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const keyBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: saltIntArray.buffer,
      iterations: iterations,
    },
    passwordKey,
    256
  );
  const keyBytes = Array.from(new Uint8Array(keyBuffer));
  const newKeyString = keyBytes
    .map((byte) => String.fromCharCode(byte))
    .join("");
  return newKeyString == keyString;
};
