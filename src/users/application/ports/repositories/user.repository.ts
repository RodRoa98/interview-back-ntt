import { Model } from 'mongoose';
import { UserDTO } from '../../../../core/domain/dtos';

export class UserRepository {

    constructor(private userModel: Model<UserDTO>) {}

    async exists(user: Partial<UserDTO>) {
        const exists = await this.userModel.exists(user).exec();
        return !!exists;
    }

    async findBy(user: Partial<UserDTO>) {
        return this.userModel.findOne(user).exec();
    }

    async create(user: UserDTO) {
        const _user = new this.userModel(user);
        return _user.save();
    }

    async findAll() {
        return this.userModel.find({}).exec();
    }
}