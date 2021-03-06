// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { mergeMap, switchMap, concatMap, exhaustMap, repeat } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';

/**
 * RxJS demo repeat to create a timed loop
 */
export class Loop {

  static makeObservable(values: string[][], ival: number): Observable<string[]> {
    const outer = from(values).concatMap(
      (val) => {
        return of(val).delay(ival);
      }
    );
    return outer;
  }

  static demo() {
    // outer observable events quickly
    const outer = this.makeObservable([['A', 'B', 'C', 'D'], ['a', 'b', 'c', 'd'], ['1', '2', '3', '4', '5']], 2500);

    outer.switchMap(
      (items) => {
        return from(items).concatMap(
          item => {
            return of(item).delay(1000);
          }
        ).pipe(repeat(100000));
      }
    ).subscribe(
      (item) => {
        console.log(Date.now(), item);
      }
    );
  }
}

