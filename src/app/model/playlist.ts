import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser/src/security/dom_sanitization_service";

export class Playlist {
    name: string;
    url: SafeResourceUrl;

    constructor(name: string, uri: string, sanitizer: DomSanitizer) {
        this.name = name;
        this.url = sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed?uri=" + uri);
    }
}