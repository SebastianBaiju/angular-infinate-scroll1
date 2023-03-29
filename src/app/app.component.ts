import { Component, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;
  public data = [
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },

    {
      emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
      name: 'sdsfsf',
      bio: 'dedede',
    },
  ];

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  constructor() {
    const batchMap = this.offset.pipe(
      throttleTime(100),
      mergeMap((n) => this.getBatch(n)),
      scan((acc, batch: any) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infinite = batchMap.pipe(map((v) => Object.values(v)));
  }

  getBatch(offset) {
    console.log(offset, 'ded');
    const data = [
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },

      {
        emoji: 'https://static.npmjs.com/255a118f56f5346b97e56325a1217a16.svg',
        name: 'sdsfsf',
        bio: 'dedede',
      },
    ];
    this.data.push(...data);
    return of(this.data).pipe(
      tap((arr) => (arr.length ? null : (this.theEnd = true))),
      map((arr) => {
        return arr;
      })
    );
    // return this.db
    //   .collection('people', ref =>
    //     ref
    //       .orderBy('name')
    //       .startAfter(offset)
    //       .limit(this.batch)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     tap(arr => (arr.length ? null : (this.theEnd = true))),
    //     map(arr => {
    //       return arr.reduce((acc, cur) => {
    //         const id = cur.payload.doc.id;
    //         const data = cur.payload.doc.data();
    //         return { ...acc, [id]: data };
    //       }, {});
    //     })
    //   );
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }
}
