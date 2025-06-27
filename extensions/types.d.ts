declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T = unknown> {
      toMatchArrayId<U = T>(expected: U[]): R;
      toMatchSchema?(expected: T): R;
    }
  }
}

export {};