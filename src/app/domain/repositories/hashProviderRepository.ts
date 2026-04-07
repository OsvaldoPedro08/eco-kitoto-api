export interface HashProviderRepository {
    generateHash(payload : string) : Promise<string> //generate the crypt password
    compareHash(payload : string, hashed : string) : Promise<boolean> //compare the passwords
}