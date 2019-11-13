// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { concatMap, finalize } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';

/**
 * RxJS demo adding a finalizer handler in pipe chain
 */
export class Finalizer {

  static makeObservable(values: string[], ival: number): Observable<string> {
    const outer = from(values).concatMap(
      (vals) => {
        console.log('emit', vals);
        return of(vals).delay(ival);
      }
    );
    return outer;
  }

  static demo() {
    const event$ = this.makeObservable(['1', '2', '3', '4', '5'], 500);

    // finalize in the pipe chain
    event$.pipe(
      finalize(
        () => {
          console.log('finalize');
        }
      ),
      concatMap(
        (item) => {
          console.log(item);
          return item;
        }
      )
    ).take(1).subscribe();
  }
}
