/**
 * @file All app authentication using passport.js and its strategies
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const passport = require("passport");
const strategyGoogle = require("passport-google-oauth20").Strategy;
const strategyFacebook = require("passport-facebook").Strategy;
if(!process.env.moneasy){
    var keys = require("./config/keys");
}
const sql = require("./sql");
const randString = require("./utils/randString");
const userSetup = require("./usersetup");

//#region Checking if a user is logged through a variable (very fast) //REVIEW
var users; //REVIEW(DanoB) Real time changes in database are not reflected this way
sql.query(`SELECT * FROM users`, (res) => { //REVIEW(DanoB) Cannot deserialize right after server starts up until query is done
    users = res.rows;
    console.log("Users downloaded. Ready to deserialize.");    
})
passport.serializeUser((user, cb) => {
    users.push(user);
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    for (let user of users) {
        if (user.id == id){
            cb(null, user);
            break;
        }
    }
});
//#endregion

//#region Checking if a user is logged with an SQL query (very slow) //REVIEW
// passport.serializeUser((user, cb) => {
//     cb(null, user.id);
// });
// passport.deserializeUser((id, cb) => {
//     sql.query(`SELECT * FROM users WHERE id='${id}'`, (res) => {
//         cb(null, res.rows[0]);
//     });
// });
//#endregion

userFindOrCreate = (profile, cb) => {
    sql.query(`SELECT * FROM users WHERE ${profile.provider}id='${profile.id}'`, (res) => {
        if (res.rowCount > 0) { //NOTE(DanoB) Old user
            cb(null, res.rows[0]);
        }
        else {
            let id = randString(20);
            sql.query(`INSERT INTO users (id,username,${profile.provider}id, provider) VALUES ( '${id}', '${profile.displayName}', ${profile.id}, '${profile.provider}' );`, (res) => {
                profile = { 
                    id: id,
                    username: profile.displayName,
                    [profile.provider + "id"]: profile.id,
                    provider: profile.provider
                }
                cb(null, profile);
                userSetup.setup(profile.id);
            }, (err) => {
                if (err.code == 23505) {
                    //TODO(DanoB) Osetrit ked DEFAULT je taken
                } else {
                    throw err;
                }
            });
        }
    });
}

userAddAuthProvider = (profile, newprofile, cb) => {
    sql.query(`SELECT * FROM users WHERE id='${profile.id}'`, (res) => {
        curProviders = res.rows[0].provider.split(',');        
        if (curProviders.includes(newprofile.provider) || res.rows[0][newprofile.provider+"id"]) { //TODO(DanoB) TEST THIS
            cb("Already logged in with this auth provider", {});
        }
        else if (res.rowCount > 0) { //NOTE(DanoB) Old user
            if (JSON.stringify(res.rows[0]) === JSON.stringify(profile)) {
                //TODO(DanoB) Vymazat ostatne zaznamy v databaze daneho usera
                sql.query(`UPDATE users SET ${newprofile.provider}id='${newprofile.id}', provider=provider||','||'${newprofile.provider}' WHERE id='${profile.id}'`, (res2) => {
                    profile.provider += "," + newprofile.provider;
                    profile[newprofile.provider + "id"] = newprofile.id
                    cb(null, profile);
                });
            } else {
                cb("Wrong user profile data" + profile, {}); //NOTE(DanoB) Bad data
            }
        } else {
            cb("Wrong user profile data" + profile, {}); //NOTE(DanoB) Bad data
        }
    });
}

passport.use(
    new strategyGoogle(
        {
            callbackURL: process.env.googleCallbackUrl || keys.google.callbackUrl,
            clientID: process.env.googleClientID || keys.google.clientID,
            clientSecret: process.env.googleClientSecret || keys.google.clientSecret,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, cb) => {
            if (req.user) {
                if (req.user.provider === "google"){
                    cb(null, profile);
                } else {
                    userAddAuthProvider(req.user, profile, cb);
                }
            } else {
                userFindOrCreate(profile, cb);
            }
        }
    )
);

passport.use(
    new strategyFacebook(
        {
            callbackURL: process.env.facebookCallbackUrl || keys.facebook.callbackUrl,
            clientID: process.env.googleClientSecret || keys.facebook.clientID,
            clientSecret: process.env.googleClientSecret || keys.facebook.clientSecret,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, cb) => {
            if (req.user) {
                if (req.user.provider === "facebook"){
                    cb(null, profile);
                } else {
                    userAddAuthProvider(req.user, profile, cb);
                }
            } else {
                userFindOrCreate(profile, cb);
            }
        }
    )
);