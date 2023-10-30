type TSetCookie = {
    expires?: string,
    path?: string,
    secure?: boolean
};

export function setCookie(name: string, value: string, expires?: number, props?: TSetCookie) {
    props = {...{path: '/', secure: true}, ...props};
    if (expires) {
        const exp = new Date(Date.now() + expires * 1000);
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = `${name}=${value}`;
    for (const propName in props) {
        updatedCookie += `; ${propName}`;
        const propValue = props[propName as keyof typeof props];
        if (propValue !== true) {
            updatedCookie += `=${propValue}`;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function eraseCookie(name: string) {
    document.cookie = name+'=; Max-Age=-99999999;';
}