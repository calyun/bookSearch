const { login, saveBook } = require('../controllers/user-controller');
const { Book, User } = require('../models');

const resolvers = {
    Query: {
        user: async ( parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')

                return userData;
            }
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            //if no user, err
            // const correctPassword = await user.isCorrectPassword(password);
            //err

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user_id },
                    { $addToSet: { savedBooks: args.input } },
                    { new: true }
                );
                return updatedUser;
            }
        },
        deleteBook: async (parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user_id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            //err
        }
    }
}

module.exports =  resolvers;