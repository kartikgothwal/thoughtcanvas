import mongoose, {Model} from "mongoose";
const UserSchema = new mongoose.Schema({
    firstname:{type:String, require:true},
    lastname:{type:String, require:true},
    email:{
        type:String,
        require:true,
        unique:true,
        validate:{
            validator:function (value:string):boolean{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message:"email is not valid"
        }
    },
    image: {
        type: String,
    },
    password:{
        type:String,
        require:true,
        unique:true,
        validate:{
            validator:function (value:string):boolean{
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    value
                );
            },
            message:"password is not valid"
        }
    },
    emailVerified:{type:Boolean},
    accessToken: {
        type: String,
    },
})
export const Users:Model<any> = mongoose.models.Users || mongoose.model("users", UserSchema);
