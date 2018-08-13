/**
 * AfVkKeyEvent
 *
 * Event emitted by pressing any key on virtual keyboard except shift, alt and caps-lock
 */
export interface AfVkKeyEvent {
    key: string;
    position: number;
}

/**
 * AfVkEnterEvent
 *
 * Event emitted pressing enter key on virtual keyboard.
 * Should have input value, and object with value before/after caret and caret position
 */
export interface AfVkEnterEvent {
    value: any;
    event: { before: string, after: string, position: number };
}
