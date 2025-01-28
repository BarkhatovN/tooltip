import { ChangeDetectionStrategy, Component, HostBinding, inject, InjectionToken, Input, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';

export const POSITION_INJECTION_TOKEN = new InjectionToken<{ x: number, y: number }>('POSITION_INJECTION_TOKEN');

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
  @HostBinding('style.left')
  get left() {
    return `${this.position.x}px`;
  }
  @HostBinding('style.top')
  get top() {
    return `${this.position.y}px`;
  }

  position: { x: number, y: number } = inject(POSITION_INJECTION_TOKEN);
}
