export function isEmail(value: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
}

export function isPhoneNumber(value: string) {
    const phoneRegex = /^01\d{9}$/; // Egyptian phone number
    return phoneRegex.test(value);
}

export function isValidPassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}
