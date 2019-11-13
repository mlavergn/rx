// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { mergeMap, switchMap, concatMap, exhaustMap, map } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';

/**
 * RxJS demo of map operators
 */
export class Map {
  static makeObservable(values: string[], ival: number): Observable<string> {
    const outer = from(values).concatMap(
      (val) => {
        return of(val).delay(ival);
      }
    );
    return outer;
  }

  static demo() {
    // outer observable events quickly
    const outer = this.makeObservable(['A', 'B', 'C'], 500);
    // inner observable events slowly
    const inner = this.makeObservable(['a', 'b', 'c'], 1000);

    outer.mergeMap(
      // outer.switchMap(
      // outer.concatMap(
      // outer.exhaustMap(
      (val) => {
        console.log('outer', val);
        return inner;
      }
    ).take(15).subscribe(
      (val) => {
        console.log('inner', val);
      }
    );
  }
}
