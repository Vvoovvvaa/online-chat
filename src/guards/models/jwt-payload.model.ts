export interface JwtPayload {
    sub: number | string;
    phone?: string;
    name?: string;
    temp?: boolean;
}