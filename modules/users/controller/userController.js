const crypto = require('crypto')
const usersList = [];

function createNewUser(password, email){
    if(!userExists(email)){
        const newUser = {
            'email':email,
            'password':password,
        }
        usersList.push(newUser)
        return "User Registered";
    }
    return "User already exists"
}

function logUser(password, email){
    if(!userExists(email)){
        let user = getUser(email);
        if(user.email == returnHash(password)){
            return true;
        }
    }
    return "Invalid Email or Invalid Password";
}

function userExists (email){
    for(let user in userExists){
        if (user.email == email){
            return true;
        };
    }
    return false;
}

function getUser (email){
    for(let user in userExists){
        if (user.email == email){
            return user;
        };
    }
    return false;
}

function getAllUsers(){
    return usersList;
}

function returnHash(password){
    let hash = crypto.createHash('md5').update(password).digest("hex");
    console.log(hash)
}

export default createNewUser;




