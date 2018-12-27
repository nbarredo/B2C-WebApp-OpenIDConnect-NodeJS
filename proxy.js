const getLoginPage = (passport, resourceURL) => (req, res, next) => {
  return setTimeout(() => {
    return passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        resourceURL: resourceURL,    // optional. Provide a value if you want to specify the resource.
        customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
        failureRedirect: 'http://localhost:5000/'
      }
    )(req, res, next)
  }, 1000)
}

module.exports = {
  getLoginPage
}
