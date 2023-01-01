import { Component, OnInit } from '@angular/core'
import { FakeService } from '../services/fake.service'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  serviceData: any
  errorMessage: any
  greeting: string = ''

  constructor(private fakeService: FakeService) {}

  ngOnInit(): void {
    this.getServiceData()
  }

  getServiceData() {
    this.fakeService.getDataV1().subscribe(
      (data) => {
        this.serviceData = data
        this.setGreeting()
      },
      (error) => {
        this.errorMessage = error.statusText
      },
      () => {
        console.log('finished')
      }
    )
  }

  setGreeting() {
    if (this.serviceData.time < 10) {
      this.greeting = 'Good Morning'
    } else if (this.serviceData.time < 20) {
      this.greeting = 'Good Day'
    } else {
      this.greeting = 'Good Evening'
    }
  }
}
