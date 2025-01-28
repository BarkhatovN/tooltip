import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
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
  @HostBinding('style.left') left: string = '0px';
  @HostBinding('style.top') top: string = '0px';

  setPosition({ x, y }: { x: number, y: number }) {
    this.left = `${x}px`;
    this.top = `${y}px`;
  }
}
