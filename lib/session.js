// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
  cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
  password: process.env.NEXT_PUBLIC_SECRET,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_ENV === "production",
  },
};