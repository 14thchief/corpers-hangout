const bcrypt = require('bcrypt');


// check for existing username
const findUserInRecord =  async (key, value, Model, joinModel)=> {
    try {
        const isRecordExist = await Model.findOne({
            where: { [key]: value },
            include: joinModel? joinModel : false,
            attributes: {
                exclude: ['singleToken'],
            },
        })
    
        if (!isRecordExist){
            return false;
        }
    
        return isRecordExist.dataValues;
    } catch(e){
        console.log(e);
    }
}

const updateUserRecord = async (columnToUpdate, updateValue, rowID, Model) => {
    const updated = await Model.update({
        [columnToUpdate]: updateValue
    }, {
        where: {
            id: rowID
        }
    });

    return updated;
}


// hash user password
const hashPassword = async (password) => {
    const rounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(rounds);
    const hashPass = await bcrypt.hash(password, salt);

    return hashPass;
}

// compare user password
const comparePassword = async (password, userPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, userPassword);
    
    return isPasswordMatch;
}

module.exports = {
    findUserInRecord,
    hashPassword,
    comparePassword,
    updateUserRecord
}