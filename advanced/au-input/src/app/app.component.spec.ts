import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { AuFaInputComponent } from './lib/au-fa-input/au-fa-input.component'
import { InputRefDirective } from './lib/common/input-ref.directive'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
    let component: AuFaInputComponent,
        fixture: ComponentFixture<AppComponent>,
        el: DebugElement,
        auInputEmail

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    AppComponent,
                    AuFaInputComponent,
                    InputRefDirective,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent)
        component = fixture.debugElement.componentInstance
        el = fixture.debugElement
        auInputEmail = el.query(By.css('au-fa-input[elemid="email"]'))
    })

    it(
        'should create the app',
        waitForAsync(() => {
            expect(component).toBeTruthy()
        })
    )

    describe('test for generation of au input compinent', () => {

      beforeEach(() => {
        fixture.detectChanges()
      })

      it(
        'should create a font awesome email au input component',
        waitForAsync(() => {
          expect(auInputEmail).toBeTruthy()
        })
      )

      it(
        'should create a font awesome email input element',
        waitForAsync(() => {
          const emailComp = auInputEmail.query(By.css('#email'))
          expect(emailComp).toBeTruthy()
          const icon = auInputEmail.query(By.css('i.icon.fa.fa-envelope'))
          expect(icon).toBeTruthy()
        })
      )
    })
})
