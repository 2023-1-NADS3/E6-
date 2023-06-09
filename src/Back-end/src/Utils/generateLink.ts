export class GenerateLinkCode{
    private static characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    private static LENGTH: number = 255;
    private static SESSION_ID_LENGTH = 12;

    public static generatePath(): string {
        let result = '';
        for (let i = 0; i < GenerateLinkCode.LENGTH; i++) {
            result += GenerateLinkCode.characters.charAt(Math.floor(Math.random() * GenerateLinkCode.characters.length));
        }
        return result;
    }

    // public generateCode(): string{
    //     const min = 100000; // minimum possible six-digit number
    //     const max = 999999; // maximum possible six-digit number
    //     return (Math.floor(Math.random() * (max - min + 1) + min)).toString();
    // }

    public static generateId(): string{
        let result = '';
        for (let i = 0; i < GenerateLinkCode.SESSION_ID_LENGTH; i++) {
            result += GenerateLinkCode.characters.charAt(Math.floor(Math.random() * GenerateLinkCode.characters.length));
        }
        return result;
    }

}