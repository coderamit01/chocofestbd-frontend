export const hasBengali = (value: string | null | undefined) => !!value && /[\u0980-\u09FF]/.test(value);
