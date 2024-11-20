const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);



UserSchema.statics.register = async function(fname, lname, email, password) { 
    if(!fname || !lname || !email || !password) throw Error('All fields must be filled')

    
    const isExists = await this.findOne({ email }); 
    if(isExists) throw Error('Email is already in use')

    if(!validator.isEmail(email)) throw Error('Email is not valid')


    if(!validator.isStrongPassword(password)) throw Error('Password is not strong enough')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ fname, lname, email, password: hashedPassword})

    return user

}

UserSchema.statics.login = async function(email, password) {
    if(!email || !password) throw Error('All fields must be filled')

    const user = await this.findOne({ email })
    if(!user) throw Error('E-mail not found');

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw Error('Incorrect password');

    return user
}


const userModel = mongoose.model('Users', UserSchema)
module.exports = userModel


