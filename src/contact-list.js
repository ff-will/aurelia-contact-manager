import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from './web-api';
import { ContactUpdated, ContactViewed } from './messages';

export class ContactList {
    //static inject() { return [WebAPI] };
    static inject = [WebAPI, EventAggregator];

    constructor(api, ea) {
        this.api = api;
        this.contacts = [];

        ea.subscribe(ContactViewed, msg => this.select(msg.contact));
        ea.subscribe(ContactUpdated, msg => {
            let id = msg.contact.id;
            let found = this.contacts.find(x => x.id === id);
            Object.assign(found, msg.contact);
        });
    }

    created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
        if (contact) {
            this.selectedId = contact.id;
        } else {
            this.selectedId = null;
        }
        return true;
    }
}