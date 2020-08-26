const crypto = require('crypto')
var usersList = [];
var id = 1;

// funções usadas na aplicação

function registerNewUser(password, email){
    if(!emailExists(email)){
        var newUser = {
            'email':email,
            'password':returnHash(password),
            'id': id
        }
        id++;
        usersList.push(newUser)
        return newUser // retornando usuario para ser usado em outra tela.
    }
    return "Email already exists";
}


function logUser(password, email){
    if(emailExists(email)){
        let user = getUserByEmail(email);
        if(user.password == returnHash(password)){
            return true;
        }
    }
    return "Invalid Email or Invalid Password";
}

function updateUser(id, newPassword, newEmail){
    const user = getUserById(id);
    if(user){
        if(!emailExists(newEmail)){
            user.email = newEmail;
            user.password = returnHash(newPassword);
            return user // retornando usuario para ser usado em outra tela.
        }
        return "Email already exists";
    }
    return "Id not found";
}


// ----------------------------------------------


// -----Funções testes do administrador---
function getUserById (id){
    for(let user of usersList){
        if (user.id == id){
            return user;
        };
    }
    return false;
}



function getAllUsers(){
    return usersList;
}

// function deleteUser

// -------------------------------------------



// -----Funções usadas dentro de outras funções----
function returnHash(password){
    let hash = crypto.createHash('md5').update(password).digest("hex");
    return hash;
}


function emailExists (email){
    for(let user of usersList){
        console.log(user);
        if (user.email == email){
            return true;
        };
    }
    return false;
}


function getUserByEmail (email){
    for(let user of usersList){
        console.log(user);
        if (user.email == email){
            return user;
        };
    }
    return false;
}
//--------------------------------------

export {registerNewUser, logUser,updateUser, getUserById, getAllUsers}  ;


