interface Trigger {
    subscribe(fn: () => void): void;
}

export default Trigger;
