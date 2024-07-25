export function unifySessionUser(req, res, next) {
  if (req.user && !req.session.user) {
    req.session.user = req.user;
  }
  req.user = null; //TODO remove this if needed
  next();
}
