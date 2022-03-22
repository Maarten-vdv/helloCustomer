import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <!-- dummy for the the toolbar and navivation space-->
        <div style="padding-left: 75px; padding-top: 50px">
            <app-add-user-page></app-add-user-page>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
        }
    `]
})
export class AppComponent {
}
