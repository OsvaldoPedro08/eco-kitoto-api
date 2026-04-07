export interface JWTProviderRepository {
    generateToken(payload : object) : Promise<string>
    verifyToken(token : string) : Promise<any>
}