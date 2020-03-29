export class Pin {
    constructor(data) {
        this._id = data._id;
        this.title = data.title;
        this.description = data.description;
        this.creatorEmail = data.creatorEmail;
        this.public = data.public;
        this.closed = data.closed;
    }
}