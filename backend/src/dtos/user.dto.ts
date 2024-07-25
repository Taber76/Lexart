import * as bcrypt from 'bcrypt';

export default class UserDTO {
  private constructor() { }

  private static checkEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static checkPassword(password: string) {
    return password.length >= 8;
  }


  public static register(data: any) {
    const { username, email, password } = data;
    if (!username || !email || !password)
      return {
        error: {
          message: 'All fields are required: username, email and password'
        }
      }

    if (!this.checkEmail(email))
      return {
        error: {
          message: 'Invalid email'
        }
      }

    if (!this.checkPassword(password))
      return {
        error: {
          message: 'Invalid password, password must be at least 8 characters long'
        }
      }

    const hashPassword = bcrypt.hashSync(password, 10);

    return {
      error: null, value: {
        username,
        email,
        password: hashPassword,
      }
    }
  }


  public static login(data: any) {
    const { email, password } = data;
    if (!email || !password)
      return {
        error: {
          message: 'All fields are required: email and password'
        }
      }
    if (!this.checkEmail(email))
      return {
        error: {
          message: 'Invalid email'
        }
      }

    return {
      error: null, value: {
        email,
        password
      }
    }
  }

}