import mongoose from 'mongoose';

export const validateMongoId = async (id) => {
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error('You must provide a valid ID')
    }
};