import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipDirective, OverlayModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tooltip';
}
