type Mods = Record<string, string | boolean>

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        //...additional.filter((className) => Boolean(className)),
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_className, value]) => Boolean(value))
            .map(([className]) => className)
    ].join(' ');
}

//classNames('some-btn', {hovered: true, selectable: false}, ['add', 'few']);
