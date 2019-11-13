// RxJS objects
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { finalize } from 'rxjs/operators';
import { share } from 'rxjs/operators';

const close = new Subject<boolean>();

/**
 * RxJS demo of custom subsclass of Observable
 */
export class Unsubscribe {
  static demo() {
    const _obs = new Subject<boolean>();
    const obs = _obs.pipe(
      finalize(
        () => {
          console.log('SUBJECT finalize');
        }
      ),
      share()
    );

    obs.takeUntil(close).subscribe(
      (value) => {
        console.log('EVENT_A', value);
      },
      (error) => {
        console.log('ERROR_A', error);
      },
      () => {
        console.log('COMPLETE_A');
      }
    );

    obs.takeUntil(close).subscribe(
      (value) => {
        console.log('EVENT_B', value);
        close.next(true);
      },
      (error) => {
        console.log('ERROR_B', error);
      },
      () => {
        console.log('COMPLETE_B');
      }
    );

    // uncommenting prevents the SUBJECT finalize since 1 subscriber would remain
    // obs.subscribe(
    //   (value) => {
    //     console.log('EVENT_C', value);
    //   },
    // );

    _obs.next(true);
  }
}
