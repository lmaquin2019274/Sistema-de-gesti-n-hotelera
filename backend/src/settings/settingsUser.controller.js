import User from '../users/user.model.js'
import bcryptjs from 'bcryptjs'

export const getUserSetting = async (req, res) => {
    try {
        const { uid } = req.user

        const userData = await User.findById(uid)

        if (!userData) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.status(200).json({
            id: userData.uid,
            username: userData.username,
            email: userData.email
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send('Something went wrong')
    }
}

export const putUserSettings = async(req, res) => {
    try{
        const { uid } = req.user;
        const { username, email } = req.body
        
        const userData = await User.findByIdAndUpdate(uid,{
            username,
            email,
        }, {new:true})

        if (!userData) {
            return res.status(404).json({ error: 'User not found' })
        }

        console.log(userData)

        return res.status(200).json({
            userId: userData.uid,
            username: userData.username,
            email: userData.email
        })

    }catch(e){
        return res.status(500).send('Somthing went wrong')
    }
}

export const patchChangePassword = async (req, res) => {
    try{
        const { uid } = req.user
        const { password, newPassword} = req.body

        const userData = await User.findById(uid, {password: 1})

        const isPasswordCorrect = await bcryptjs.compare(password, userData.password)

        if(!isPasswordCorrect){
            return res.status(400).send('Invalid password. Please try again')
        }

        const encryptedPassword = await bcryptjs.hash(newPassword, 10)

        await User.updateOne({_id: uid},{password: encryptedPassword})

        return res.status(200).send('Password changed succesfully')
    }catch(e){
        return res.status(500).send('Somthing went wrong')
    } 
}