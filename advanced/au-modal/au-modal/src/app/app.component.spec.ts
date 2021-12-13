import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { DebugElement } from '@angular/core'
import { AuTabPanelComponent } from 'au-tab-panel/src/app/au-tab-panel/au-tab-panel.component'
import { AuModalModule } from './au-modal/au-modal.module'
import { AuInputModule } from 'au-input'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    modal: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AuInputModule,
        AuTabPanelComponent,
        AuModalModule.forRoot()
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    el = fixture.debugElement
    modal = el.query(By.css('#testModal'))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
