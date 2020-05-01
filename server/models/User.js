const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchmea=new mongoose.Schema({
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

});

UserSchmea.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
UserSchmea.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};
module.exports=mongoose.model('User',UserSchmea);