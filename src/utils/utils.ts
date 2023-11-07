import {DateTime} from "luxon";

export function formatOrderTime(orderTime: string): string {
    const orderDate = DateTime.fromISO(orderTime);
    const now = DateTime.now();

    const diff = now.startOf('day').diff(orderDate.startOf('day'), 'day').toObject().days;

    if (diff === 0) {
        return `Cегодня, ${orderDate.toFormat('HH:mm')}`
    }

    if (diff === 1) {
        return `Вчера, ${orderDate.toFormat('HH:mm')}`
    }

    return `${diff} дня назад, ${orderDate.toFormat('HH:mm')}`

}

export function deepEqual(object1: object, object2: object) : boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key as keyof typeof object1];
        const val2 = object2[key as keyof typeof object1];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

function isObject(object: object) : boolean {
    return object != null && typeof object === 'object';
}