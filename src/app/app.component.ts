import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropListGroup,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;
  @ViewChildren(CdkDropList) children;
  public temdata!: any;
  public temelement: any;
  public temelementw: any;
  public draged!: number;
  public droped!: number;
  public items: Array<number> = [1, 2, 3, 4];

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number = 0;
  public dropIndex: number = 0;
  public activeContainer;

  public status: boolean = false;
  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  add() {
    this.items.push(this.items.length + 1);
  }

  shuffle() {
    this.items.sort(function () {
      return 0.5 - Math.random();
    });
  }
  constructor(private _render: Renderer2, private ref: ChangeDetectorRef) {}

  ngAfterViewInit() {}

  mouseEnter(event, index) {
    if (this.status) {
      let element = event.target;
      if (event.target.classList.value.includes('cdk-drag')) {
        element = event.target.parentElement;
      }
      let dragIndex = this.__indexOf(
        element.parentElement.children,
        this.source ? this.source : element
      );
      let dropIndex = this.__indexOf(element.parentElement.children, element);
      if (dragIndex !== dropIndex) {
        this.dragIndex = dragIndex;
        this.dropIndex = dropIndex;
      }
      this.source = element;
      if (!this.source) {
        this.sourceIndex = this.dragIndex;
        this.source = element;
      }
      this.activeContainer = Array.from(this.listGroup._items)[index];
      if (this.activeContainer) {
        let near = this._render.nextSibling(element);
        this._render.insertBefore(
          this.dropListContainer.nativeElement,
          this.temelement,
          this.dropIndex > this.dragIndex ? near : element
        );
      }
    }
  }

  cdkDragStarted(event) {
    this.dragIndex = event.source.data;
    this.draged = event.source.data;
    this.temelement = event.source.dropContainer.element.nativeElement;

    this._render.addClass(this.temelement, 'example-box');

    this.status = true;
  }
  cdkDragReleased(event) {
    this.status = false;
    this._render.removeClass(this.temelement, 'example-box');
    // if (Array.from(this.listGroup._items).length < this.draged + 2) {
    //   this._render.appendChild(
    //     this.dropListContainer.nativeElement,
    //     this.temelement
    //   );
    // } else {
    //   const currentElement = Array.from(this.listGroup._items)[this.draged + 1];
    //   this._render.insertBefore(
    //     this.dropListContainer.nativeElement,
    //     this.temelement,
    //     currentElement.element.nativeElement
    //   );
    // }
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return false;
  };

  dragDropped(event: CdkDragDrop<number>) {
    this.ref.detectChanges();
    moveItemInArray(this.items, this.draged, this.dropIndex);
    //this.array_move(this.items, this.draged, this.dropIndex);
  }

  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   return arr; // for testing
  // }
  // getPointerPositionOnPage(event: any) {
  //   // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
  //   const point = this.__isTouchEvent(event)
  //     ? event.touches[0] || event.changedTouches[0]
  //     : event;
  //   const scrollPosition = this.viewportRuler.getViewportScrollPosition();

  //   return {
  //     x: point.pageX - scrollPosition.left,
  //     y: point.pageY - scrollPosition.top,
  //   };
  // }
  // __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  //   return event?.type.startsWith('touch');
  // }

  // __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  //   const rect = dropList.element.nativeElement.getBoundingClientRect();
  //   return (
  //     y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right
  //   );
  // }
  __indexOf(collection, node) {
    return Array.prototype.indexOf.call(collection, node);
  }
}

/** Determines whether an event is a touch event. */
