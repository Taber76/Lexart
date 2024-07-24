import colors from "colors"

class Print {
    constructor() {
        colors.enable()
    }

    public static error(message: string) {
        console.log(colors.red.underline(message))
    }

    public static critical(message: string) {
        console.log(colors.red(message))
    }

    public static warning(message: string) {
        console.log(colors.yellow(message))
    }

    public static http(message: string) {
        console.log(colors.blue(message))
    }

    public static info(message: string) {
        console.log(colors.cyan(message))
    }

    public static success(message: string) {
        console.log(colors.green(message))
    }

    public static debug(message: string) {
        console.log(colors.magenta(message))
    }

}

export default Print