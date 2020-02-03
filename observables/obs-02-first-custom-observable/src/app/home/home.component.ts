import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription, Observable, Observer } from "rxjs";
import { map, filter } from 'rxjs/operators';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 10) {
          observer.complete();
        }

        if (count == 5) {
          observer.error(new Error("Count is greater than 10!"));
        }
        count++;
      }, 1000);
    });

    customObservable.pipe(map( (data: number) => {
      return 'Round: ' + (data + 1);
    }));

    this.firstObsSubscription = customObservable.pipe(
      filter(data => {
          return data > 0;
      }),
      map( (data: number) => {
      return 'Round: ' + (data + 1);
    }))
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log("completed...");
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
