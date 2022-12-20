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

  constructor(private fakeService: FakeService) {}

  ngOnInit(): void {
    this.getServicedata()
  }

  private getServicedata() {
    this.fakeService.getDataV1().subscribe(
      (data) => {
        this.serviceData = data
      },
      (error) => {
        this.errorMessage = error.statusText
      },
      () => {
        console.log('finished')
      }
    )
  }
}
