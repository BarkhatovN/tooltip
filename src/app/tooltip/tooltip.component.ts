import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TooltipComponent {
  @Input() text = '';
  @Input() tooltipTemplate: TemplateRef<any> | null = null;
}
