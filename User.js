const Contact = require("./Contact");

class User {
    static id = 1; //shared among all objs so inorder to update
    static allUsers = []; // stores all obj of user class(admin and user both) , static so make this property as shared among all classes so as to update it 

    constructor(name, age, gender, isAdmin) {
        this.name = name;
        this.isAdmin = isAdmin;
        this.age = age;
        this.gender = gender;
        this.id = User.id++;
        this.contacts = []; // an array to store users contact(mike)(john)
        User.allUsers.push(this); // Add both admin and user to the list

    }
    
    //this is the method to create new admin for new admin isadmin set to true 
    static newAdmin(name, age, gender) {
        //validate all 3 parameters(name , age , gender):here these three paramerts will come from driver code(index.js)so we have to validate those things coming from driver code)
        if (typeof name !== 'string') {
            throw new Error("Invalid Name");
        }
        if (typeof age !== 'number') {
            throw new Error("Invalid age");
        }
        if (gender !== 'M' && gender !== 'F' && gender !== 'O') {
            throw new Error("Invalid gender");
        }
        return new User(name, age, gender, true);  // new user:creates obj of user class calls user class constructor to pass name, age,gender ,trueorfalse
        //returning obj of user class from newadmin method which is adminuser by setting isadmin to true
        //inshort creating admin obj
    }

    newUser(name, age, gender) {
        try {
            if (typeof name !== 'string') {
                throw new Error("Invalid Name");
            }
            if (typeof age !== 'number') {
                throw new Error("Invalid age");
            }
            if (gender !== 'M' && gender !== 'F' && gender !== 'O') {
                throw new Error("Invalid gender");
            }
            return new User(name, age, gender, false); //user so isadmin set to false //user obj
        } catch (error) {
            console.log(error.message);
        }
    }

    // method to get all users(which are not admin)
    getAllUsers() {
        try {
            if (!this.isAdmin) { // we dont want user to access allusers list so
                throw new Error("Not an admin");
            } // else if admin then return all users list
            return User.allUsers; //list of allUsers
            // this property is declared earlier , as property is static we used class name to access
        } catch (error) {
            console.log(error.message);
        }
    }

    static findUser(userId) {      //userlist i.e iterating through userlist
        for (let index = 0; index < User.allUsers.length; index++) {
            if (userId === User.allUsers[index].id) { //from all user sel user whos id is given to be find
                return [User.allUsers[index], index];
                //checking at index 0 is id 1(if user given 1 id to be found) // return userobj itself(id;1 , name:john) and index
            }
        }
        return [null, -1]; 
    }

    // Update private methods : admin can update 
    #updateName(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error("Invalid Name Value");
        }
        this.name = newValue;
    }

    #updateAge(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error("Invalid age value");
        }
        this.age = newValue;
    }

    #updateGender(newValue) {
        if (newValue !== 'M' && newValue !== 'F' && newValue !== 'O') {
            throw new Error("Invalid gender");
        }
        this.gender = newValue;
    }

    updateUser(userId, parameter, newValue) { //admin updating user
        try {
            if (!this.isAdmin) {
                throw new Error("Not an admin");
            }
            let[userToBeUpdated , indexOfUserToBeUpdated] = User.findUser(userId)
               // array first val is obj of user to be updated , index
            for (let index = 0; index < User.allUsers.length; index++) {
                if (userId == User.allUsers[index].id) {
                    userToBeUpdated = User.allUsers[index];
                    break;
                }
            }
            if (userToBeUpdated === null) {
                throw new Error('User not found');
            }

            switch (parameter) { // which parameter to update like user name , age or gender
                case 'name':
                    userToBeUpdated.#updateName(newValue);
                    break;
                case 'age':
                    userToBeUpdated.#updateAge(newValue);
                    break;
                case 'gender':
                    userToBeUpdated.#updateGender(newValue);
                    break;
                default:
                    throw new Error('Invalid parameter');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    deleteUser(userId) { // this method is also only accesible by admins
        try {
            if (!this.isAdmin) {
                throw new Error("Not an admin");
            }
    
            let [userToBeDeleted, indexOfUserToBeDeleted] = User.findUser(userId);
                  // arr first val is user obj to be deleted , index of user to be deleted 
            if (userToBeDeleted === null) {
                throw new Error('User not found');
            }
    
            // Delete the user from the array
            User.allUsers.splice(indexOfUserToBeDeleted, 1);
                                //index , 1:remove only one user obj at specified index

    
            console.log('User deleted successfully');
        } catch (error) {
            console.log(error.message);
        }
    }
//----------------------------------------------------------------------------------
// Users CRUD on contact and contact info
createContact(name) {
    try {
        if (this.isAdmin) {
            throw new Error("Admin cannot create contacts");
        }
        if (typeof name !== "string") { //validate name parameter
            throw new Error("Invalid name");
        }
        //creating new contact obj of contact class  , which will actually create contact obj containing contact info from contact class constructor
        const newContact = new Contact(name); //u1 contact(mike) , u2 contact(john)
        // adding new contact to users contact array(declred above)
        this.contacts.push(newContact); // We're adding the newly created Contact object to the user's contacts array(this.contacts list declared above)
        return newContact;// The method returns the newly created Contact object to the caller.
    } catch (error) {
        console.log(error.message);
    }
}


        getAllContact(){ //The getAllContact method is defined in the User class. It doesn't take any parameters. Its purpose is to retrieve and return all the contacts that belong to the current user (instance of User).
            return this.contacts //user john : get all contacts : mike , rock( all his contacts)(which are created using craetecontact method)
        }  // this here : referring to current  user i.e userobj 

    
        deleteContact(contactID) {
            try {
                if (this.isAdmin) {
                    throw new Error('Admin cannot delete contacts');
                }
        
                if (typeof contactID !== 'number') {
                    throw new Error('Invalid contact ID');
                }
        
                const [foundContact, indexOfContact] = this.#findContact(contactID);
        
                // Remove the contact from the contacts array
                if (foundContact !== null) {
                    this.contacts.splice(indexOfContact, 1);
                    console.log('Contact deleted successfully');
                } else {
                    throw new Error('Contact not found');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        
        
        
          
        #findContact(contactID){ //aims to find a contact in the user's contact list.
            for(let index =0 ; index< this.contacts.length ; index++){
            if(contactID == this.contacts[index].id){
                return[this.contacts[index] , index] //this = user
                      //contact obj i.e that particular contact(found) , index
                // found contact , index of contact
            }
            return[null , -1]
        }
    }

    updateContact(contactID, parameter, newValue) {
        try {
            if (this.isAdmin) {
                throw new Error('Admin cannot read contact');
            }
            
            if (typeof contactID !== "number" || contactID < 0) {
                throw new Error('Invalid contact ID');
            }
            
            let [foundContact, indexOfContact] = this.#findContact(contactID);
                 //contact obj i.e contact according to passed id  
    
            if (foundContact === null) {
                throw new Error('Contact not found');
            }
    
            switch (parameter) {
                case 'name':
                    foundContact.updateName(newValue);
                    break;
                default:
                    throw new Error('Invalid parameter');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
//-------------------------------------------------------------- contactinfo
    
    createContactInfo(typeofContact ,valueOfContact, contactID) //only user can create contactinfo
    { 

        try {
            if (this.isAdmin) {
                throw new Error('Admin cannot create contact Info');
            }
            let[foundContact , indexOfContact] = this.#findContact(contactID)
            if(foundContact== null){
                throw new Error('contact not found')
            }
            let newContactInfo = foundContact.CreateContactInfo(typeofContact , valueOfContact)
          //  let john = new User("John", 30, "M", false); // Creating user
// ... Assume John has a contact named "Mike" with ID 0 ...

//const newContactInfo = john.CreateContactInfo("Email", "john@example.com", 0);
//console.log(newContactInfo); // Output: A new ContactInfo object with typeOfContact: "Email", valueOfContact: "john@example.com"

            return newContactInfo
           
        }catch(error){
            console.log(error.message)
        }
    }
    getAllContactInfoOfContactID(contactID) {
        try {
            if (this.isAdmin) {
                throw new Error('Admin cannot read contact Info');
            }
            let [foundContact, indexOfContact] = this.#findContact(contactID)
            if (foundContact == null) {
                throw new Error('Contact not found');
            }
            return foundContact.getAllContactInfos();
        } catch (error) {
            console.log(error.message);
        }
    }
    updateContactInfoByContactID(contactID, contactInfoID, parameter, newValue) {
        try {
            if (this.isAdmin) {
                throw new Error('Admin cannot update contact Info');
            }
            let [foundContact, indexOfContact] = this.#findContact(contactID); //user.findcontact
                //contact class obj
            if (foundContact == null) {
                throw new Error('Contact not found');
            }
            foundContact.updateContactInfo(contactInfoID, parameter, newValue); // issue maybe

        } catch (error) {
            console.log(error.message);
        }
    }
        deleteContactInfoByContactID(contactID, contactInfoID) {
            try {
                if (this.isAdmin) {
                    throw new Error('Admin cannot delete contact Info');
                }
        
                let [foundContact, indexOfContact] = this.#findContact(contactID);
                if (foundContact == null) {
                    throw new Error('Contact not found');
                }
        
                foundContact.deleteContactInfo(contactInfoID);
        
            } catch (error) {
                console.log(error.message);
            }
        }
        
    
        }
    



module.exports = User;










        

    

module.exports = User;





