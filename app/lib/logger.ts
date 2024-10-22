export function LOG_ERROR(message:string, error: any) {
    
    console.log(message,error);
}
export function LOG_DIAGNOSTIC(message:string, error: any) {
    
    const styles = [
        `background:darkred}`,
        `border-radius: 0.5em`,
        `color: white`,
        `font-weight: bold`,
        `padding: 2px 0.5em`,
    ];
    // When in a group, the workbox prefix is not displayed.
    const logPrefix = ['%cworkbox', styles.join(';')];

    console.error(message, error);
}