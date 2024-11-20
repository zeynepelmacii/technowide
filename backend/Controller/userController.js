const createToken = require('../Middleware/createToken')
const Users = require('../Model/userModel')

const getAllUsers = async (req,res) =>{
    try {
        const users = await Users.find({})
        res.status(500).json({msg:"All users are listed below", users:users})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

const getUserById = async (req,res) =>{
    const {id:userId} = req.params
    try {
        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({msg:'User not found'})

        res.status(500).json({msg:"User by specified ID", user:user})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

const register = async (req,res) =>{
    const {fname, lname, email, password} = req.body
    try {
        const user = await Users.register(fname, lname, email, password)
        const token = createToken(user._id)

        res.status(500).json({msg:"User registered", user: user, token: token})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

const login = async (req,res) =>{
    const {email, password} = req.body
    try {
        const user = await Users.login(email,password)
        const token = createToken(user._id)
        res.status(500).json({msg:"User logged in", user: user, token: token})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

const updateUser = async (req,res) =>{
    const {id:userId} = req.params
    try {
        const user = await Users.findOneAndUpdate({_id:userId},req.body,{
            new:true,runValidators:true,
        })
        if(!user) return res.status(404).json({msg:'User not found'})

        res.status(500).json({msg:"User info updated", user:user})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

const deleteUser = async (req,res) =>{
    const {id:userId} = req.params
    try {
        const user = await Users.findOneAndDelete({_id:userId});
        if(!user) return res.status(404).json({msg:'User not found'})

        res.status(500).json({msg:"User deleted", user:user})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports = {getAllUsers,getUserById,register,login,updateUser,deleteUser}