// Augment React's HTML attributes to include the `inert` attribute,
// which is not yet in React 18's type definitions.
import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: "" | boolean;
  }
}
