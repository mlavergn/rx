# Rx

Reactive Programming (Rx) Playgrounds

## Trend

The industry is slowly embracing reactive programming paradigm. This model is being use by Apple, Google, and Microsoft. If the trend holds, we should continue to see increased adoption.

## What is Rx

In a simple generalization, Rx is functional programming. Events "flow" (or pipe) through a chain of handlers to produce a result.

## Overview

Rx represents a significant shift from traditional imperitive programming. Comparisons between Rx and imperitive approaches are tricky, but it helps to think of Rx as a call chain comprised solely of static methods (no external mutations). When using Rx, developers should think in terms of data pipes, similar to Unix pipes. In Rx, input flows unidirectionally through handlers. The coupling between handlers is a series of async pipes, as opposed to a sequence of API calls.

## Observables / Subjects (aka Pub / Sub)

Rx is underpinned by a PubSub model. Some functions wait for data via a subscription, and other functions publish data. This can be either unicast 1:1 (ie. Observable) or multicast 1:many (ie. Subject). Observables and Subjects are dormant on creation created, they only become "hot" or "active" when a consumer subscribes to them. In other words, in order to start the data flow, the object must be called with subscribe.

## Nested Subscriptions

Nested subscriptions are an anti-pattern in Rx. The reason is that if an observable nested within an observable handler recieves a nested subscribe call, it establishes a new "data path", at that point, there is one input but two potential outputs. A corellary is to think of nested subscribes as spawning a new thread, which thread becomes the true output? This can lead to hard to detect race-like conditions where the outer observable is not reflective of the state of the inner obserable.

```typescript
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
      concatMap( // or mergeMap / switchMap / exhaustMap
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
```

## Mapping between outer and inner observables

- mergeMap = when the outer observable events, immediately spawn a concurrent inner observable (complete but unordered)
- switchMap = when the outer observable events, stop the running inner observable and create a new one (ordered but inner incomplete)
- concatMap = queue outer observable events until the running inner observable completes, then continue (ordered and complete)
- exhaustMap = ignore outer observable events until the running inner observable completes (ordered but outer incomplete)
