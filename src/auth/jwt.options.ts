export const JWT_OPTIONS = Symbol('JWT_OPTIONS');

export interface JwtOptions {
  secret: string;
  accessTtlSeconds: number;
  refreshTtlSeconds: number;
}
