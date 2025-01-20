export function countdown(seconds: number, callback: (remainingTime: number) => void): void {
    let remainingTime: number = seconds;

    const timer = setInterval(() => {
        if (remainingTime >= 0) {
            callback(remainingTime);
            remainingTime--;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}
