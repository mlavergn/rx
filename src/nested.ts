import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { mergeMap, switchMap, concatMap, exhaustMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

export class Nested {
  static outer$ = from(['A', 'B', 'C']);
  static inner$ = from(['a', 'b', 'c']);

  // do not do this
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

  // instead do this
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
    Nested.wrong();
  }
}
