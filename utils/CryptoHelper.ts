import CryptoJS from "crypto-js";

export class CryptoHelper {
  private static readonly SECRET_KEY = "SECRET"

  static encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.SECRET_KEY).toString();
  }

  static decrypt(cipherText: string): string {
    return CryptoJS.AES.decrypt(cipherText, this.SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }
}
