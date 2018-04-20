export class AfVkKeyEvent {

    public static keyboardEvent(key: string): KeyboardEvent {
        const init = keys.find(k => k.key === key);
        return new KeyboardEvent('keypress', init);
    }

    public static shiftEvent() {
        return new Event('any');
    }
}

export const keys: KeyboardEventInit[] = [
    {
        key: '',
        code: '',
        location: 0,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
        repeat: false,
    }
];
