interface Credentials {
    email: string;
    password: string;
}
  
//convert to string
export function convertToString(value: FormDataEntryValue | null): string {
    return value !== null ? value.toString() : "";
}
  
//validation
export function validateCredentials(email: string, password: string): Credentials {
    const errors: Credentials = {email: "", password: ""};
  
    if (!email) {
      errors["email"] = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors["email"] = 'Invalid email format.';
    }
  
    if (!password) {
      errors["password"] = 'Password is required.';
    } else if (password.length < 4) {
      errors["password"] = 'Password must be at least 8 characters.';
    }
  
    return errors;
}
  