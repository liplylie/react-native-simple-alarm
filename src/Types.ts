export type Alarm = {
    id: string | number;
    active : boolean;
    date: string;
    message: string;
    snooze: number;
    oid?: string | number;
    // every property below is from react-native push notification
    // https://github.com/zo0r/react-native-push-notification
    userInfo?: {};
    ticker?: string;
    autoCancel?: boolean;
    largeIcon?: string;
    smallIcon?: string;
    bigText?: string;
    subText?: string;
    color?: string;
    vibrate?: boolean;
    vibration?: number;
    tag?: string;
    group?: string;
    ongoing?: boolean;
    priority?: "default" | "max" | "high" | "low" | "min";
    visibility?: "private" | "public" | "secret";
    importance?: "default" | "max" | "high" | "low" | "min" | "none" | "unspecified";
    allowWhileIdle?: boolean;
    ignoreInForeground?: boolean;
    alertAction?: string;
    title?: string;
    playSound?: boolean;
    soundName?: string;
    number?: string;
    actions?: string[];
    repeatType?: 'week' | 'day' | 'hour' | 'minute' | 'time' | undefined;
    // please do not add repeatType
    // changing repeat type would effect snooze logic
}