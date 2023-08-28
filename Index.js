const User = require('./User');

//admin 
let a1 = User.newAdmin('allen' , 22 , 'M')
let a2 = User.newAdmin('alex' , 33 , 'M')
console.log(a1)
console.log(a2)

//user 
let u1 = new User('abc' , 44 , 'F')
console.log(u1)

let u2 = new User('xyz' , 46 , 'M')
console.log(u2)

//all users printing
console.log((a1.getAllUsers()))


//finduser : admin will find user
let finduser = User.findUser(1)
console.log(" user found" , finduser)

//update user by admin
a1.updateUser(1 , 'name' , 'lll')
console.log(a1)

//delete user by admin
a1.deleteUser(1)
console.log(a1)


//------------------------------------------------------------------------------
//create contact
let contact1 = u1.createContact('Mike');
let contact2 = u1.createContact('Rock');
let contact3 = u2.createContact('John');
let contact4 = u2.createContact('Doe');

// Display contacts for user1
console.log( u1.getAllContact());
console.log(u2.getAllContact());


// Delete a contact for user1
u1.deleteContact(contact1.id);
console.log('After deleting contact:', u1.getAllContact());

// Update a contact for user2
u2.updateContact(contact3.id, 'name', 'Johnny');
console.log('After updating contact:', u2.getAllContact());


//find contact
// Example:
// Let's assume that this.contacts holds the following contacts:

// Contact: { id: 1, name: 'Mike' }
// Contact: { id: 2, name: 'John' }
// Contact: { id: 3, name: 'Doe' }
// Now, if you call #findContact(2), the method will find that the contact with ID 2 corresponds to the second contact in the list. Therefore, it will return [ { id: 2, name: 'John' }, 1 ], where the first element is the contact object, and the second element is the index where the contact is found in the list (0-based indexing).

//-------------------------------------------------------------------------------
// Creating contact info
("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
u1.createContactInfo("Email", "john@example.com", 1);
console.log(u1)
//read
console.log(u1.getAllContactInfoOfContactID(1))
//update
console.log(u1.updateContactInfoByContactID( 1 , 0 , 'typeOfContact' , "lana"))
//del
console.log(u1.deleteContactInfoByContactID(1 , 0))
