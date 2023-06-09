
export class MyDate {
    
    public static getCurrentDateAndTime(): string { 
        return MyDate.format(new Date());
    }

    private static format(date: Date) {
        return `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
    }

    public static getFutureDate(howFar: string) {
        let d = new Date;
        switch (howFar) {
            case 'threedays':
                d.setDate(d.getDate() + 3);
                break;
            case 'oneweek':
                d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                break;
            case 'twoweeks':
                d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000));
                break;
            case 'threeweeks':
                d.setTime(d.getTime() + (21 * 24 * 60 * 60 * 1000));
                break;
            case 'onemonth':
                d.setMonth(d.getMonth() + 1);
                break;
            case 'twomonths':
                d.setMonth(d.getMonth() + 2);
                break;
            case 'threemonths':
                d.setMonth(d.getMonth() + 3);
                break;
        }
        return MyDate.format(d);
    }

    public static hasDateTimeDeprecated(date: string): boolean{
        const [dateStr, timeStr] = date.split('-');
        const [day, month, year] = dateStr.split('/');
        const [hour, min, sec] = timeStr.split(':');
        const dateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min), Number(sec));
        const now = new Date();
        return now >= dateTime;
    }
}