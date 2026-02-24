import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiskyCard } from './whisky-card';

describe('WhiskyCard', () => {
  let component: WhiskyCard;
  let fixture: ComponentFixture<WhiskyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiskyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiskyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
