// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { map } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';

/**
 * RxJS demo map to transform the return type
 */
export class Transform {

  static makeObservable(values: string[], ival: number): Observable<string> {
    const outer = from(values).concatMap(
      (val) => {
        return of(val).delay(ival);
      }
    );
    return outer;
  }

  static demo() {
    const outer = this.makeObservable(['A', 'B', 'C', 'D'], 100);

    outer.pipe(
      map(
        (item) => {
          return '_' + item;
        }
      )
    ).subscribe(
      (item) => {
        console.log(item);
      }
    );
  }
}

