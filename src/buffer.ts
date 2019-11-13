// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { bufferTime, map, repeatWhen } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';

/**
 * Demo of RxJS buffer
 */
export class Buffer {

  static makeObservable(values: string[], ival: number): Observable<string> {
    const outer = from(values).concatMap(
      (vals) => {
        console.log('emit', vals);
        return of(vals).delay(ival);
      }
    );
    return outer;
  }

  static demoA() {
    const event$ = this.makeObservable(['1', '2', '3', '4', '5'], 500);

    // take 3 max and unsubscribes
    event$.take(3).mergeMap(
      (item) => {
        console.log('merge', item);
        return of(item);
      }
    ).pipe(
      // all we receive in 1 second
      bufferTime(1100),
      map(
        (items) => {
          console.log(items);
          items.push('3');
          return items;
        }
      )
      // only the first event is to be processed
    ).take(1).subscribe(
      (items) => {
        console.log(Date.now(), items);
      }
    );
  }

  static demoB() {
    const event$ = this.makeObservable(['1', '2', '3', '4', '5', '6', '7'], 500);

    // take 3 max
    event$.take(3).mergeMap(
      (item) => {
        console.log('merge', item);
        return of(item);
      }
    ).pipe(
      // all we receive in 1 second
      bufferTime(1100),
      map(
        (items) => {
          console.log(items);
          return items;
        }
      ),
      repeatWhen(
        (notifs) => {
          return notifs;
        }
      )
      // only the first event is to be processed
    ).subscribe(
      (items) => {
        console.log(Date.now(), items);
      }
    );
  }

  static demo() {
    this.demoA();
    this.demoB();
  }
}

