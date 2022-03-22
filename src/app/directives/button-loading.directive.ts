import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Directive({
    selector:
        `button[mat-button][loading],
             button[mat-raised-button][loading],
             button[mat-icon-button][loading],
             button[mat-fab][loading],
             button[mat-mini-fab][loading],
             button[mat-stroked-button][loading],
             button[mat-flat-button][loading]`
})
export class ButtonLoadingDirective implements OnChanges {

    @Input() loading: boolean;
    @Input() disabled: boolean;
    @Input() color: ThemePalette;

    private spinner: ComponentRef<MatProgressSpinner> | undefined;

    constructor(private matButton: MatButton,
                private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef,
                private renderer: Renderer2) {
    }

    get nativeElement(): HTMLElement {
        return this.matButton._elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const loading = changes["loading"];

        if (!loading) {
            return;
        }

        if (loading.currentValue) {
            this.nativeElement.classList.add('mat-loading');
            this.matButton.disabled = true;
            this.createSpinner();
        } else if (!loading.firstChange) {
            this.nativeElement.classList.remove('mat-loading');
            this.matButton.disabled = this.disabled;
            this.destroySpinner();
        }
    }

    private createSpinner(): void {
        if (!this.spinner) {
            this.spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
            this.spinner.instance.color = this.color;
            this.spinner.instance.diameter = 20;
            this.spinner.instance.mode = 'indeterminate';
            this.renderer.appendChild(this.nativeElement, this.spinner.instance._elementRef.nativeElement);
        }
    }

    private destroySpinner(): void {
        if (this.spinner) {
            this.spinner.destroy();
            this.spinner = undefined;
        }
    }
}
