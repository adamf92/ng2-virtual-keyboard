/**
 * Ng2VkKeyEvent
 *
 * Event emitted by pressing any key on virtual keyboard except shift, alt and caps-lock
 */
export interface Ng2VkKeyEvent {
    key: string;
    position: number;
}

/**
 * Ng2VkEnterEvent
 *
 * Event emitted pressing enter key on virtual keyboard.
 * Should have input value, and object with value before/after caret and caret position
 */
export interface Ng2VkEnterEvent {
    value: any;
    event: { before: string, after: string, position: number };
}
