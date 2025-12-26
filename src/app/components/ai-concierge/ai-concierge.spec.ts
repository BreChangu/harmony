import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiConcierge } from './ai-concierge';

describe('AiConcierge', () => {
  let component: AiConcierge;
  let fixture: ComponentFixture<AiConcierge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiConcierge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiConcierge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
