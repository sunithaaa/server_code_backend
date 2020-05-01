const User=require('../../models/User')
const UserSession=require('../../models/UserSession')
module.exports = (app) => {
    
    app.post('/api/account/signup',(req,res,next)=>{
        const {body}=req;
        const{
            firstname,
            lastname,
           
            password
        }=body;
        let={
            email
        }=body;

        if(!firstname){
           return res.send({
                success:false,
                message:"error:first name cannot be blank."

            });
        }
        
        if(!lastname){
            return res.send({
                success:false,
                message:"error:last name cannot be blank."

            });
        }
        
        if(!email){
           return res.send({
                success:false,
                message:"error:email cannot be blank."

            });
        }
        
        if(!password){
            return res.send({
                success:false,
                message:"error:password cannot be blank."

            });
        }

        console.log('');

        email=email.toLowerCase();

        //1.verifying email doesnt exist
        //2.save
       
        User.find({
            email:email
        },(err,previousUsers)=>{
            if(err){
                 return res.send({
                    success:false,
                    message:"error:server error"
                });
            }else if(previousUsers.length>0){
                 return res.send({
                    success:false,
                    message:"error:account already exists."
                
                });
            }
            //saving user
            const newUser=new User();

            newUser.email=email,
            newUser.firstname=firstname,
            newUser.lastname=lastname,
            newUser.password=newUser.generateHash(password);
            newUser.save((err,user)=>{
                if(err){
                     return res.send({
                        success:false,
                        message:"error:server error"
                    });
                }
                 return res.send({
                    success:true,
                    message:"Signed up"
                });
            })
        })
    })
    app.post('/api/account/signin',(req,res,next)=>{
        const {body}=req;
        const{
            firstname,
            lastname,
           
            password
        }=body;
        let={
            email
        }=body;

        if(!email){
            return res.send({
                 success:false,
                 message:"error:email cannot be blank."
 
             });
         }
         
         if(!password){
             return res.send({
                 success:false,
                 message:"error:password cannot be blank."
 
             });
         }
 
        email=email.toLowerCase();

        User.find({
            email:email
        },(err,users)=>{
            if(err){
                console.log('error:' ,err);
                return res.send({
                    success:false,
                    message:"Error:server error"
                })
            }
            if(users.length!=1){
                return res.send({
                    success:false,
                    message:"Error:invalid"
                })
            }
            const user=users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success:false,
                    message:'Error:Invalid'
                })
            }
            new UserSession=new UserSession();
            UserSession.userId=user._id;
            UserSession.save((err,doc)=>{
                if(err){
                    console.log(err);
                    return res.send({
                       success:false,
                       message:"error:server error"
                   });
               }
               return res.send({
                   success:true,
                   message:'Valid sign in',
                   token:doc._id
               })
            })
        })
    });
    app.get('/api/account/verify',(req,res,next)=>{
        const{query}=req;
        const{token}=query;

        UserSession.find({
            _id:token,
            isDeleted:false
        },(err,sessions)=>{
            if(err){
               
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
            if(sessionStorage.length!=1){
            
                return res.send({
                    success:false,
                    message:'invalid'
                });
            }
            else{
                return res.send({
                    success:true,
                    message:'good'
                })
            }
        })
    })
    app.get('/api/account/logout',(req,res,next)=>{
        const{query}=req;
        const{token}=query;

        UserSession.findOneAndUpdate({
            _id:token,
            isDeleted:false
        },
            {$set:{isDeleted:"suni"}}
        , null, (err,sessions)=>{
            if(err){
               console.log(err)
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
           
          
                return res.send({
                    success:true,
                    message:'good'
                })
            
        })
    })
}
