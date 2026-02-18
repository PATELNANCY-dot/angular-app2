import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', // must match index.html
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>` // renders all routed pages
})
export class AppComponent { }
