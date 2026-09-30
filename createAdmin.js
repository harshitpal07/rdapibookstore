const User = require('./models/User')
const bcrypt = require('bcrypt')
async function createAdmin(){
    try {
        let user = await User.findOne({email:'palharshit0077@gmail.com'});
        if(user){
            console.log('user updated successfully...');
        }else{
            user = new User();
            user.firstName='Harshit';
            user.lastName='Pal';
            user.mobileNo='9105007720'
            user.email='palharshit0077@gmail.com';
            let password = bcrypt.hashSync('1234567890',10);
            user.password = password;
            user.userType = 'admin';
            await user.save();
            console.log('user created successfully...');
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = createAdmin