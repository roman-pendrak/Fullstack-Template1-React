class AuthService {
  static isAuthorized(): boolean {
    const expiresIn = JSON.parse(localStorage.getItem("expires_in") || "0");
    return !!(
      localStorage.getItem("access_token") && new Date().getTime() < expiresIn
    );
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem("refresh_token", token);
  }

  static getScope(): string | null {
    return localStorage.getItem("scope");
  }

  static setScope(scope: string): void {
    localStorage.setItem("scope", scope);
  }

  static getExpiresIn(): number | null {
    return JSON.parse(localStorage.getItem("expires_in") || "0");
  }

  static setExpiresIn(expiresIn: number): void {
    const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
    localStorage.setItem("expires_in", expiresAt);
  }

  static getTokenType(): string | null {
    return localStorage.getItem("token_type");
  }

  static setTokenType(tokenType: string): void {
    localStorage.setItem("token_type", tokenType);
  }

  static clearTokens(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("scope");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("token_type");
  }
}

export default AuthService;
