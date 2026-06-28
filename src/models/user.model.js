const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    
    // createdAt:{
    //     type: Date
    // },
    // updatedAt:{
    //     type: Date
    // }

});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return ;
       

});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;