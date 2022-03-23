import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <!-- dummy for the the toolbar and navivation space-->
        <div class="wrapper">
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

        .wrapper {
            padding-left: 75px;
            padding-top: 50px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    `]
})
export class AppComponent {
}
