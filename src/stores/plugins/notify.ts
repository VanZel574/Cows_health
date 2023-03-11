import 'pinia';
import type { Notify } from 'quasar';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    Notify: Notify
  }
}
