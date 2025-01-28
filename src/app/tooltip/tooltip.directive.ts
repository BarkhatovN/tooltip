import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { POSITION_INJECTION_TOKEN, TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltipText], [tooltipTemplate]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltipText') text: string | null = null;
  @Input('tooltipTemplate') tooltipTemplate: TemplateRef<any> | null = null;

  private tooltipVisible: boolean = false;
  private tooltipRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) { }

  ngOnDestroy() {
    this.hideTooltip();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (
      !this.tooltipVisible
    ) {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();

      const position = {
        x: rect.left + window.scrollX,
        y: rect.top + rect.height + window.scrollY
      };

      const injector = Injector.create({ providers: [{ provide: POSITION_INJECTION_TOKEN, useValue: position }] });

      this.tooltipRef = this.viewContainerRef.createComponent(TooltipComponent, { injector });

      if (this.text)
        this.tooltipRef.instance.text = this.text;
      if (this.tooltipTemplate)
        this.tooltipRef.instance.tooltipTemplate = this.tooltipTemplate;

      this.tooltipVisible = true;
    }
  }

  private hideTooltip() {
    if (this.tooltipVisible && this.tooltipRef) {
      this.tooltipRef.destroy();
      this.tooltipVisible = false;
    }
  }
}
