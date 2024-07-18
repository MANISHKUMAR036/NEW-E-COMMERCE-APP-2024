import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
      name:{
        type:String,
        required: true,
        trim: true // it remove all white spaces
      },
      email:{
        type: String,
        required: true,
        unique:true // here we added unique becoz there is only one email for one user
      },
      password:{
        type: String,
        required: true,
      },
      phone:{
        type: String,
        required: true,
      },
      address:{
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true
      },
      role:{
        type: Number,
        default:0
      }
}, 
{timestamps:true} // this is another object. hence when new user will be created then its created time will be added there.
)

export default mongoose.model('users', userSchema)

//This imports the mongoose library, which is used to interact with MongoDB databases in a more structured and organized way.
/*
line 2
const userSchema = new mongoose.Schema({
This creates a new Mongoose schema named userSchema. A schema in Mongoose defines the structure of the documents within a collection (like a table schema in SQL databases).
*/
/*
line 3
name: { type: String, required: true, trim: true }
type: String: Specifies that the name field should be a string.
required: true: Specifies that the name field is mandatory.
trim: true: Automatically removes leading and trailing white spaces from the name field.
*/
/*
line 25
role: { type: Number, default: 0 }
type: Number: Specifies that the role field should be a number.
default: 0: Sets the default value of the role field to 0. This could be used to distinguish between different user roles, such as 0 for regular users and 1 for administrators.
*/
/*
line 30
{ timestamps: true }
This is an options object passed to the Schema constructor. When timestamps is set to true, Mongoose will automatically add createdAt and updatedAt fields to the schema. These fields will store the creation and last update times of the documents.
*/

/*
line 33
export default mongoose.model('users', userSchema);
This creates a Mongoose model named users based on the userSchema and exports it. The model provides an interface to interact with the users collection in the MongoDB database. Through this model, you can create, read, update, and delete user documents.
*/

