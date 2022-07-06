export const argsCoalesce: any = (args: any[]) => {
    return args.find(arg => arg !== undefined && arg !== null);
}

export const objectCoalesce: any = (obj: any, args: string[]) => {
    return obj[`${args.find(arg => obj.hasOwnProperty(arg))}`];
}