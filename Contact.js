const ContactInfo = require("./ContactInfo")

class Contact {
    static id = 0;

    constructor(name) {
        this.name = name;
        this.contactInfos = [];
        this.id = Contact.id++;
    }
    updateName(newValue) {
        this.name = newValue;
    }


    static newContact(name) { 
        if (typeof name !== 'string') {
            throw new Error('Invalid name');
        }
        return new Contact(name);

    }

    CreateContactInfo(typeOfContact, valueOfContact) {
        const newContactInfo = ContactInfo.create(typeOfContact, valueOfContact);
        this.contactInfos.push(newContactInfo);
        return newContactInfo;
    }

    updateContact(parameter, newValue) {
        switch (parameter) {
            case 'name':
                this.updateName(newValue);
                break;
            // Handle other parameters if needed
        }
    }

    getAllContactInfos() {
        return this.contactInfos;
    }

    updateContactInfo(contactInfoID, parameter, newValue) {
        const [foundContactInfo, indexOfFoundContactInfo] = this.findContactInfo(contactInfoID);
               //contactInfo obj
        if (foundContactInfo === null) {
            throw new Error('Contact Info not found');
        }

        foundContactInfo.updateContactInfo(parameter, newValue);
    }
    deleteContactInfo(contactInfoID) {
        const [foundContactInfo, indexOfFoundContactInfo] = this.findContactInfo(contactInfoID);
        if (foundContactInfo === null) {
            throw new Error('Contact Info not found');
        }

        // Use splice to remove the foundContactInfo from the contactInfos array
        this.contactInfos.splice(indexOfFoundContactInfo, 1);
        console.log('Contact Info deleted successfully');
    }

    findContactInfo(contactInfoID) {
        for (let index = 0; index < this.contactInfos.length; index++) {
            if (contactInfoID === this.contactInfos[index].id) {
                return [this.contactInfos[index], index];
            }
        }
        return [null, -1];
    }

   

}

module.exports = Contact;
