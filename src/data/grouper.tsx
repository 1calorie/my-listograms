export interface IGrouping {
    [value: string]: Set<number>
}

function sanitizeValue(key: string): string {
    return "__" + key;
}

export function normalizeValue(key: string): string {
    return key.slice(2);
}

export interface IGroup {
    [key: string]: IGrouping;
}

export function grouper(list: {[index: string]: any}[]): IGroup {
    let group: IGroup = {};
    for (let i = 0; i < list.length; i ++) {
        const object = list[i];
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                const grouping = group[key] ?? {};
                const value = sanitizeValue(object[key]);
                grouping[value] ??= new Set<number>();
                grouping[value].add(i);
                group[key] = grouping;
            }
        }
    }

    return group;
}
