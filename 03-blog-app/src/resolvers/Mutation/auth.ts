import { Context } from "../../index"
import validator from "validator"
import bcrypt from "bcryptjs"

interface SignupArgs {
  email: string;
  name: string;
  bio: string;
  password: string
}

interface UserPayload {
  userErrors: {
    message: string
  }[];
  user: null
}

export const authResolver = {
  signup: async (_: any, { email, name, password, bio }: SignupArgs, { prisma }: Context): Promise<UserPayload> => {

    const isEmail = validator.isEmail(email);

    if(!isEmail) {
      return {
        userErrors: [{
          message: "Invalid email"
        }],
        user: null
      }
    }

    const isValidPassoword = validator.isLength(password, {
      min: 5
    });

    if(!isValidPassoword) {
      return {
        userErrors: [{
          message: "Invalid password"
        }],
        user: null
      }
    }

    if(!name || !bio) {
      return {
        userErrors: [{
          message: "Invalid name or bio"
        }],
        user: null
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return {
      userErrors: [],
      user: null
    }

    // return prisma.user.create({
    //   data: {
    //     email, name, password
    //   }
    // })
  }
}