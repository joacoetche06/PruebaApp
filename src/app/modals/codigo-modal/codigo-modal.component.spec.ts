import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoModalComponent } from './codigo-modal.component';

describe('CodigoModalComponent', () => {
  let component: CodigoModalComponent;
  let fixture: ComponentFixture<CodigoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
