// TODO: Improve this function
function onstar<T extends typeof EventTarget>(class_: T, type: string): void {
  const handler = new WeakMap<any, ((event: Event) => any) | null>()

  Object.defineProperty(class_.prototype, "on" + type, {
    get(): ((event: Event) => any) | null {
      return handler.get(this) ?? null;
    },
    set(value: ((event: Event) => any) | null): void {
      if (handler.get(this)) {
        this.removeEventListener(type, handler)
      }
      if (typeof value === "function") {
        this.addEventListener(type, value)
        handler.set(this, value)
      }
    },
    configurable: true,
  })
}

export default onstar;
