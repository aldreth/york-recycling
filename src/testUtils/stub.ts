/**
 * https://stackoverflow.com/a/51365037
 */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, unknown> | undefined | null
    ? RecursivePartial<T[P]>
    : T[P];
};

export function stub<T>(a: RecursivePartial<T>): T {
  return a as T;
}
