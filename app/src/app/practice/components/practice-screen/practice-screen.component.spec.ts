import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeScreenComponent } from './practice-screen.component';

describe('PracticeScreenComponent', () => {
  let component: PracticeScreenComponent;
  let fixture: ComponentFixture<PracticeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeScreenComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


