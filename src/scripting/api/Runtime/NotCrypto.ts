/**
 * Crypto-like wrappers that have no actual guarantees of safety.
 * These are just around to provide common interfaces since the sandbox may be
 * running in different environments.
 *
 * If safety is required, please use something else.
 */
module Runtime.NotCrypto {
  class Rc4 {
    private _s:number[] = [];
    constructor (key:number[]) {
      for (var i = 0; i < 256; i++) {
        this._s[i] = i;
      }
      var j = 0;
      for (var i = 0; i < 256; i++) {
        j = j + this._s[i] + key[i % key.length] % 256;
        var m = this._s[i];
        this._s[i] = this._s[j];
        this._s[j] = m;
      }
    }
  }

  /**
   * (UNSAFE) Random value generator.
   * @param {number} bits - number of bits of randomness requested
   * @returns {number} a number within requested number of bits
   */
  export function random(bits:number = 16):number {
    // Use Math.random for this if it exists
    if (Math && Math.random) {
      var value:number = 0;
      for (var i = 0; i < bits; i++) {
        value = (value << 1) + (Math.random() < 0.5 ? 0 : 1);
      }
      return value;
    } else {
      return Runtime.NotCrypto.fallbackRandom([Date.now() % 1024]);
    }
  }

  /**
   * Generates a some randomness
   */
  export function fallbackRandom(seed:number[], bits:number = 16):number {
    return ;
  }

  /**
   * Transforms an integer to a hex value.
   * @param {number} value - value to transform
   * @param {number} length - how many hex digits to use. 0 means no prefixed 0s
   * @return {string} hex value
   */
  export function toHex(value:number, length:number = 0):string {
    if (length <= 0) {
      return value.toString(16);
    }
    var base:string = value.toString(16);
    while (base.length < length) {
      base = '0' + base;
    }
    return base;
  }
}
