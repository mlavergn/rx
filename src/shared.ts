// RxJS objects
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

// RxJS operators
import { mergeMap, concatMap, map } from 'rxjs/operators';

// RxJS inlines
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/share';

/**
 * RxJS demo of map operators
 */
export class Shared {
  static makeObservable(values: string[], ival: number): Observable<string> {
    const outer = from(values).concatMap(
      (val) => {
        return of(val).delay(ival);
      }
    );
    return outer;
  }

  static demo() {
    const observable = this.makeObservable(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 500);

  const shared = observable.take(4).share();

    shared.subscribe(
      (val) => {
        console.log('sub1', val);
      }
  );

    shared.subscribe(
    (val) => {
      console.log('sub2', val);
    }
    );
  }
}
