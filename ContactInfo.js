    class ContactInfo {
        static id = 0;
    
        constructor(typeOfContact, valueOfContact) {
            this.typeOfContact = typeOfContact;
            this.valueOfContact = valueOfContact;
            this.id = ContactInfo.id++;
        }
    
        static create(typeOfContact, valueOfContact) {
            // Validation and error handling for typeOfContact and valueOfContact can be done here
            return new ContactInfo(typeOfContact, valueOfContact);
        }
    
    
        updateContactInfo(parameter, newValue) {
            // Validation of parameter and newValue can be done here
    
            switch (parameter) {
                case 'typeOfContact':
                    this.#updateTypeOfContact(newValue);
                    break;
                case 'valueOfContact':
                    this.#updateValueOfContact(newValue);
                    break;
                default:
                    throw new Error('Invalid parameter');
            }
        }
    
        #updateTypeOfContact(newValue) {
            // Update the typeOfContact
            this.typeOfContact = newValue;
        }
    
        #updateValueOfContact(newValue) {
            // Update the valueOfContact
            this.valueOfContact = newValue;
        }
    }
    
    

module.exports = ContactInfo