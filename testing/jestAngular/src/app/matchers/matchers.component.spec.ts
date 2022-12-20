import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MatchersComponent} from './matchers.component'

describe('MatchersComponent', () => {
  let component: MatchersComponent
  let fixture: ComponentFixture<MatchersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchersComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(MatchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('2 + 2', () => {
    expect(2 + 2).toBe(4)
  })

  it('Object values', () => {
    const obj = {name: 'Massi'}
    expect(obj).toEqual({name: 'Massi'})
  })

  it('null', () => {
    const n = null
    expect(n).toBeNull()
    expect(n).toBeDefined()
    expect(n).not.toBeUndefined()
    expect(n).not.toBeTruthy()
    expect(n).toBeFalsy()
  })

  it('zero', () => {
    const n = 0
    expect(n).not.toBeNull()
    expect(n).toBeDefined()
    expect(n).not.toBeUndefined()
    expect(n).not.toBeTruthy()
    expect(n).toBeFalsy()
  })

  it('2 + 2 = 4', () => {
    const four = 2 + 2
    expect(four).toBeGreaterThan(3)
    expect(four).toBeGreaterThanOrEqual(3.5)
    expect(four).not.toBeLessThan(3)
    expect(four).toBeLessThanOrEqual(4.5)
    expect(four).toBe(4)
    expect(four).toEqual(4)
  })

  it('adding floating point number', () => {
    const val = 0.1 + 0.2
    //expect(val).toBe(0.3) // won´t work because of rounding error
    expect(val).toBeCloseTo(0.3)
  })

  it('no D in Massi', () => {
    expect('Massi').not.toMatch(/D/)
  })

  it('there´s a assi in Massi', () => {
    expect('Massi').toMatch(/assi/)
  })

  it('list contains milk', () => {
    const list = [
      'burger',
      'milk',
      'beer'
    ]
    expect(list).toContain('milk')
    expect(new Set(list)).toContain('milk')
  })

it('compiling works as expected', () => {
  expect(() => component.compile()).toThrow();
  expect(() => component.compile()).toThrow(Error);
  expect(() => component.compile()).toThrow('old Angular version');
  expect(() => component.compile()).toThrow(/angular/i);
})

})
