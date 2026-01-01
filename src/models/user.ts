import mongoose from 'mongoose';

const schema = mongoose.Schema;
//schema
const userSchema = new schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: true //agr ye nahi true krenge to agr koi chij nahi diye to vo bhi database  me save ho jayega 
            
        }
    },
    {timestamps: true}
)


const User = mongoose.model("User", userSchema);
//model

export default User;