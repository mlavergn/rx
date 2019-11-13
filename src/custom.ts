// RxJS objects
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

const close = new Subject<boolean>();

export class CustomObservable extends Observable<boolean> {
  public constructor() {
    super(observer => {
      console.log('Custom NEW SUB');
      observer.next(true);
      // teardown
      return () => {
        console.log('Custom COMPLETE');
        observer.complete();
      };
    });
  }
}

/**
 * RxJS demo of custom subsclass of Observable
 */
export class Custom {
  static demo() {
    const obs = new CustomObservable();

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
  }
}
