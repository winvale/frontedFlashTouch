import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeFooterComponent } from './practice-footer.component';

describe('PracticeFooterComponent', () => {
  let component: PracticeFooterComponent;
  let fixture: ComponentFixture<PracticeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeFooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


