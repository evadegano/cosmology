import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ ok: true });
  },
  {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
    password: process.env.NEXT_PUBLIC_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NEXT_PUBLIC_ENV === "production",
    },
  },
);