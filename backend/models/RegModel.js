import  mongoose  from "mongoose";


const RegSchema = mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    dob: {
      type: Number,
      required: true,
      default: 0,
    },
    hobbies: {
      type: [String], 
      required: true,
      default: [],
    },
    state: {
      type: String,
      required: true,
      
    },
    address: {
      type: String,
      required: true,
    },
    
  }

);

const Reg = mongoose.model("Reg", RegSchema);
export default Reg;
