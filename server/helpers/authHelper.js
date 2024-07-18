import bcrypt from 'bcrypt'

export const hashPassword = async(password)=>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }catch (error){
        console.log(error);
    }
};

export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}

/*
line 1
import bcrypt from 'bcrypt';
This imports the bcrypt library, which is used for hashing and comparing passwords. bcrypt is a popular library for password hashing because it incorporates a salt to protect against rainbow table attacks and uses a computationally expensive hashing algorithm to slow down brute force attacks.
*/