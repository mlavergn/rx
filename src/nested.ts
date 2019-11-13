import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { mergeMap, switchMap, concatMap, exhaustMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

/**
 * RxJS demo of nested subscribe vs mapped inner observable
 */
export class Nested {
  static outer$ = from(['A', 'B', 'C']);
  static inner$ = from(['a', 'b', 'c']);

  // nested subscribe, do not do this, this (can) create race conditions
  // and it's unclear when the outer subscription will complete
  // NOTE: nested subscribes are effectively mergeMaps
  static wrong() {
    this.outer$.subscribe(
      (oval) => {
        // output path A
        this.inner$.subscribe(
          (ival) => {
            // output path B
            const vals = [oval, ival];
            console.log(vals);
          }
        );
      }
    );
  }

  // instead pipe the observable into a map operator
  static correct() {
    this.outer$.pipe(
      concatMap(
        (oval) => {
          return this.inner$.map(
            (ival) => {
              return [oval, ival];
            }
          );
        }
      )
    ).subscribe(
      (vals) => {
        // single output path
        console.log(vals);
      }
    );
  }

  static demo() {
    // this.wrong();
    this.correct();
  }
}
