export function isAuthorised(req) {
  return req.isAuthenticated() && req.user && req.user.roles && req.user.roles[0] === 'admin';
}
export function getName(req) {
  return req.user && req.user.email ? req.user.email : "";
}