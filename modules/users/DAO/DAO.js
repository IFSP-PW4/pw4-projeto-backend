import mongoose from '../../../database/index';
import userSchema from './Schema';
var User = mongoose.model('User', userSchema);

function create(json){

    var newUser = new User(json);
    newUser.save(function (error){
        if(error){
            return error;
        }
        else{
            console.log("User created");
            console.log(newUser._id);
            return newUser._id;
            
        }
    });

    
}

function findAll(){

    User.find({}).lean().exec(function(error,result){
        if(error){
            return error;
        }
        else{
            console.log(result);
            return result;
        }
    });
    
}

function findByEmail(email){

    User.find({email: email}).lean().exec(function(error,result){
        if(error){
            return error;
        }
        else{
            if(result.length == 0){
                return null;
            }
            console.log(result[0]);
            return result[0]; // sempre possuirá só um elemento, pois não permito ele possuir 2 emails iguais.
           
        }
    });
}

function emailExists(email){

    User.find({email: email}).lean().exec(function(error,result){
        if(error){
            return error;
        }
        else{
            console.log("result = "+result);
            console.log("result.length = "+result.length);
            if(result.length == 0){
                return false;
            }
            return true;
           
        }
    });
}


function findById(id){
    User.findById(id).lean().exec(function(error,result){
        if(error){
            return error;
        }
        else{
            return result;
        }
    });
}

function deleteAll(){
    User.deleteMany({},function (error){
        if(error){
            return error;
        }
        else{
            console.log("All Users removed");
        }
    });
}

function deleteOne(id){
    User.deleteOne({_id:id},function (error){
        if(error){
            return error;
        }
        else{
            console.log("User removed"); 
        }
    });
}

module.exports = {create,findAll,findByEmail,emailExists,findById,deleteAll,deleteOne}
