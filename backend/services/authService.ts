import User, { IUser } from "../models/User";

export const registerUser = async (name: string, email: string, password: string): Promise<IUser> => {
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error("User already exists");
    }

    const user = new User({ name, email, password });
    await user.save();

    return user;
};

export const loginUser = async (email: string, password: string): Promise<IUser> => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return user;
};
