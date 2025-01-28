import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltipText], [tooltipTemplate]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltipText') text: string | null = null;
  @Input('tooltipTemplate') tooltipTemplate: TemplateRef<any> | null = null;

  private overlayRef: OverlayRef | null = null;
  private tooltipVisible: boolean = false;

  constructor(private overlay: Overlay, private elementRef: ElementRef) { }

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
      !this.tooltipVisible &&
      !this.overlayRef &&
      (!!this.text || !!this.tooltipTemplate)
    ) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.elementRef)
          .withPositions([
            {
              panelClass: 'tooltip-location-top',
              originX: 'center',
              originY: 'top',
              overlayX: 'center',
              overlayY: 'bottom',
            },
            {
              panelClass: 'tooltip-location-top',
              originX: 'center',
              originY: 'bottom',
              overlayX: 'center',
              overlayY: 'top',
            },
          ]),
      });

      const tooltipRef: ComponentRef<TooltipComponent> =
        this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      if (this.text)
        tooltipRef.instance.text = this.text;
      if (this.tooltipTemplate)
        tooltipRef.instance.tooltipTemplate = this.tooltipTemplate;

      this.tooltipVisible = true;
    }
  }

  private hideTooltip() {
    if (this.tooltipVisible && this.overlayRef) {
      this.overlayRef.detach();
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
      this.tooltipVisible = false;
    }
  }
}
