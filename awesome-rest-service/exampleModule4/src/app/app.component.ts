import { Component, OnInit, OnDestroy } from '@angular/core';
import { AwesomeService } from './service/awesome.service';
import { Subscription } from 'rxjs';
import { Awesome } from './models/awesome.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(public awesomeServices: AwesomeService) { };
  awesomes: Awesome[] = [];
  tag!: string;
  url!: string;
  descriptions!: string;
  awesome!: Awesome;

  ngOnInit() {
    this.loadData()
  };
  loadData() {
    this.subscription = this.awesomeServices.getAllAwesome().subscribe((data: any) => {
      this.awesomes = data
    }, error => {
      this.awesomeServices.handleError(error);
    })
  };

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  onEditAwesome(awesome: Awesome) {
    this.awesome = awesome;
  }

  onAddAwesome() {
    let product = new Awesome(this.tag, this.url, this.descriptions);
    this.subscription = this.awesomeServices.addAwesome(this.awesome).subscribe(data => {
      this.awesomes.push(data);
    }, error => {
      this.awesomeServices.handleError(error)
    });
  }

  onDeleteAwesome(awesome : Awesome){
    this.subscription = this.awesomeServices.deleteAwesome(this.awesome).subscribe(data => {

    }, error => {
      this.awesomeServices.handleError(error)
    });
  }
  onUpdateAwesome() {
    this.subscription = this.awesomeServices.updateAwesome(this.awesome).subscribe(data => {
      console.log(data)
    }, error => {
      this.awesomeServices.handleError(error)
    });
  }
}