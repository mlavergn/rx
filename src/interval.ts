import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';

export class Interval {
  private close$ = new Subject<boolean>();

  public static demo() {
    const demo = new Interval();
    demo.run();
    interval(5000).take(1).subscribe(
      () => {
        // must call next for unsubscribe to happen via takeUnit
        demo.close$.next(true);
        demo.close$.complete();
      }
    );
  }

  public run() {
    interval(2000).takeUntil(this.close$).subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log('ERROR', error);
      },
      () => {
        console.log('COMPLETE');
      }
    );
  }
}
