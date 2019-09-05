// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { mergeMap, switchMap, concatMap, exhaustMap, map } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';

/**
 * Demo of RxJS map operators
 */
export class Demo {
    static makeObservable(values: string[], ival: number): Observable<string> {
        const outer = from(values).concatMap(val => {
            return of(val).delay(ival);
        });
        return outer;
    }

    static demo() {
        // outer observable events quickly
        const outer = Demo.makeObservable(['A', 'B', 'C'], 500);
        // inner observable events slowly
        const inner = Demo.makeObservable(['a', 'b', 'c'], 1000);

        outer.pipe(
            mergeMap(
            // switchMap(
            // concatMap(
            // exhaustMap(
                (val) => {
                    console.log(val);
                    return inner;
                }
            )
        ).take(15).subscribe(
            (val) => {
                console.log(val);
            }
        );
    }
  }
