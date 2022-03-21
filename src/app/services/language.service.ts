import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LanguageService {

    private languages = [{
        id: "en",
        name: "English"
    },
        {
            id: "fr",
            name: "French"
        },
        {
            id: "nl",
            name: "Dutch"
        }];

    getLanguages$() {
        return of(this.languages);
    }
}
