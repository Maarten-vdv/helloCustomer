import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {I18nModule} from "./i18n/transloco.module";
import {MaterialModule} from "./material/material.module";
import {PersonalInfoComponent} from './components/add-user/personal-info/personal-info.component';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {AddUserComponent} from './components/add-user/add-user.component';
import {UserRoleComponent} from './components/add-user/user-role/user-role.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserPermissionsComponent } from './components/add-user/user-permissions/user-permissions.component';
import {ButtonLoadingDirective} from "./directives/button-loading.directive";
import { AddUserPageComponent } from './components/add-user/add-user-page.component';

@NgModule({
    declarations: [
        AppComponent,
        PersonalInfoComponent,
        AddUserComponent,
        UserRoleComponent,
        UserPermissionsComponent,
        ButtonLoadingDirective,
        AddUserPageComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        I18nModule,
        MaterialModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
