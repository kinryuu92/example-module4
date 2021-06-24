export class Awesome {
    id?: number;
    tag?: string;
    url?: string;
    descriptions?: string;
    constructor(tag: string, url: string, descriptions: string) {
        this.tag = tag;
        this.url = url;
        this.descriptions = descriptions;
    }
}