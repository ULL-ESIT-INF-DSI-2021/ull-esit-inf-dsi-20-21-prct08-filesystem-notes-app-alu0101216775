export class Note {
    title: string;
    body: string;
    color: string;
    user: string;
    route: string;

    constructor(title: string = "", body: string = "", user: string = "", color: string = "white", route: string = "") {
        this.title = title;
        this.route = route;
        this.body = body;
        this.color = color;
        this.user = user;
    }
}