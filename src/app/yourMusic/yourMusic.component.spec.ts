import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMusicComponent } from './yourMusic.component';

describe('YourMusicComponent', () => {
  let component: YourMusicComponent;
  let fixture: ComponentFixture<YourMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
