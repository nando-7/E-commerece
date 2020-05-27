const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth_c");
const { userById } = require("../controllers/user_c");
const { generateToken, processPayment } = require("../controllers/braintree_c");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
    "/braintree/payment/:userId",
    requireSignin,
    isAuth,
    processPayment
);

router.param("userId", userById);

module.exports = router;