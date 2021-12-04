import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { DebugElement } from '@angular/core'
import { AuTabPanelComponent } from './au-tab-panel/au-tab-panel.component'
import { AuTabComponent } from './au-tab/au-tab.component'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    tabPanel: DebugElement

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent, AuTabPanelComponent, AuTabComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.debugElement.componentInstance
    el = fixture.debugElement
    tabPanel = el.query(By.css('#tab-panel'))

    fixture.detectChanges()
  })

  it(
    'should create the app',
    waitForAsync(() => {
      const app = fixture.debugElement.componentInstance
      expect(app).toBeTruthy()
    })
  )

  it(
    'should find only one tab inside the tab container',
    waitForAsync(() => {
      const tabs = tabPanel.queryAll(By.css('.tab'))
      expect(tabs).toBeTruthy()
      expect(tabs.length).toBe(1)
    })
  )

  it(
    'should find the Login tab marked as selected',
    waitForAsync(() => {
      const selectedTab = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement
      expect(selectedTab).toBeTruthy()
      expect(selectedTab.textContent).toContain('Login')
    })
  )

  it(
    'should display the correct email input field',
    waitForAsync(() => {
      const loginEmail = tabPanel.query(By.css('.test-login-email-input'))
      expect(loginEmail).toBeTruthy()
    })
  )

  it('should switch to the Contact tab', waitForAsync(() => {
    const tabButtons = tabPanel.queryAll(By.css('.tab-panel-buttons li'))
    tabButtons[2].nativeElement.click()
    fixture.detectChanges()
    const contactEmail = tabPanel.query(By.css('.test-contact-email-input'))
    expect(contactEmail).toBeTruthy()

    const selectedTab = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement
    expect(selectedTab).toBeTruthy()
    expect(selectedTab.textContent).toContain('Contact')
  }))
})
