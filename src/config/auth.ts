export default {
  jwt: {
    secret: process.env.JWT_KEY as string,
    expiresIn: process.env.JWT_EXPIRESIN as string,
  },
};
