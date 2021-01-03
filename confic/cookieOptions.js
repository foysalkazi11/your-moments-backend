// Set the options for the cookie
let cookieOptions = {
  // Delete the cookie after 7 days
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  // Set the cookie's HttpOnly flag to ensure the cookie is
  // not accessible through JS, making it immune to XSS attacks
  // httpOnly: true,
  sameSite: "none"
};
// In production, set the cookie's Secure flag
// to ensure the cookie is only sent over HTTPS
// if (process.env.NODE_ENV === "production") {
//   cookieOptions.secure = true;
// }

module.exports = cookieOptions;

// app.use(cors({
//   origin: 'https://assistcar-client.herokuapp.com',
//   credentials: true
// }));
// app.options('*', cors());

//sameSite: "none",
//heroku-ssl-redirect node package
