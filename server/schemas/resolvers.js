const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findOne({ _id: context.User._id }).populate('books');
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.User._id },
                { $push: { savedBooks: [ args.bookId, args.description, args.title, args.image, args.link, args.authors ]  } },
                { new: true }
            );
            return updatedUser;
        },

        removeBook: async (parent, { bookId }) => {
            return book.findOneAndDelete({ bookId: bookId });
        }
    }
}

module.exports = resolvers;