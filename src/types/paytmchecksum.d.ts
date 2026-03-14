declare module 'paytmchecksum' {
    export function generateSignature(body: string | object, key: string): Promise<string>;
    export function verifySignature(body: string | object, key: string, checksum: string): boolean;
    export function generateSignatureByString(body: string, key: string): Promise<string>;
    export function verifySignatureByString(body: string, key: string, checksum: string): boolean;
}
