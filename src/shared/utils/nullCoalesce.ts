export const argsCoalesce: any = (args: any[]) => {
    return args.find(arg => arg !== undefined && arg !== null);
}

export const objectCoalesce: any = (obj: any, args: string[]) => {
    let firstKey = args.find(arg => obj.hasOwnProperty(arg));
    if(firstKey !== undefined)  {
        return obj[firstKey];
    }
    return undefined;
}