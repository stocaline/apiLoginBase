module.exports = (app) => {
    const userControllers = require("../controllers/user.controller");
    
    app.get("/getUsers", userControllers.getUsers)
    app.post("/signup", userControllers.signup)
    app.post("/login", userControllers.login)
}