import passport from "passport";

const pathsNoAuth = [
  {
    path: "/auth/login",
    method: "POST",
  },
  {
    path: "/users",
    method: "POST",
  },
];
const authenticateJWT = passport.authenticate("jwt", {
  session: false,
});

const applyJWTAuthentication = (req, res, next) => {
  if (
    pathsNoAuth.some(
      (element) => element.path === req.path && element.method === req.method
    )
  ) {
    return next();
  }
  authenticateJWT(req, res, next);
};

export { applyJWTAuthentication };
