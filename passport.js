const passport = require("passport");
const strategyGoogle = require("passport-google-oauth20").Strategy;
const strategyFacebook = require("passport-facebook").Strategy;
if(!process.env.moneasy){
    var keys = require("./config/keys");
}
const sql = require("./sql");
const randString = require("./utils/randString");

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    client = sql.connect();
    client.query(`SELECT * FROM users WHERE id='${id}'`, (err, res) => {
        if (err) throw err;
        cb(null, res.rows[0]);
        client.end();
    });
});

userFindOrCreate = (profile, cb) => {
    client = sql.connect();

    client.query(`SELECT * FROM users WHERE ${profile.provider}id='${profile.id}'`, (err, res) => {
        if (err) throw err;
        if (res.rowCount > 0) { //NOTE(DanoB) Old user
            client.end();
            cb(null, res.rows[0]);
        }
        else {
            let id = randString(20);
            client.query(`INSERT INTO users (id,username,${profile.provider}id) VALUES ( '${id}', '${profile.displayName}', ${profile.id}, '${profile.provider}' );`, (err, res) => {
                if (err) { //NOTE(DanoB) New user
                    if (err.code == 23505) {
                        //TODO(DanoB) Osetrit ked DEFAULT je taken
                    }
                    throw err;
                }
                client.end();
                cb(null, { 
                        id: id,
                        username: profile.displayName,
                        [profile.provider + "id"]: profile.id,
                        provider: profile.provider
                    }
                );
            });
        }
    });
}

userAddAuthProvider = (profile, newprofile, cb) => {
    client = sql.connect();
    client.query(`SELECT * FROM users WHERE id='${profile.id}'`, (err, res) => {
        if (err) throw err;
        curProviders = res.rows[0].provider.split(',');        
        if (curProviders.includes(newprofile.provider) || res.rows[0][newprofile.provider+"id"]) { //TODO(DanoB) TEST THIS
            client.end();
            cb("Already logged in with this auth provider", {});
        }
        else if (res.rowCount > 0) { //NOTE(DanoB) Old user
            if (JSON.stringify(res.rows[0]) === JSON.stringify(profile)) {
                client.query(`UPDATE users SET ${newprofile.provider}id='${newprofile.id}', provider=provider||','||'${newprofile.provider}' WHERE id='${profile.id}'`, (err, res2) => {
                    profile.provider += "," + newprofile.provider;
                    profile[newprofile.provider + "id"] = newprofile.id
                    client.end();
                    cb(null, profile)
                });
            } else {
                client.end();
                cb("Wrong user profile data" + profile, {}); //NOTE(DanoB) Bad data
            }
        } else {
            client.end();
            cb("Wrong user profile data" + profile, {}); //NOTE(DanoB) Bad data
        }
    });
}

passport.use(
    new strategyGoogle(
        {
            callbackURL: `http://moneasy.net/auth/google/redirect`,
            clientID: process.env.googleClientID || keys.google.clientID,
            clientSecret: process.env.googleClientSecret || keys.google.clientSecret,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, cb) => {
            if (req.user) {
                userAddAuthProvider(req.user, profile, cb)
            } else {
                userFindOrCreate(profile, cb);
            }
        }
    )
);

passport.use(
    new strategyFacebook(
        {
            callbackURL: `http://moneasy.net/auth/facebook/redirect`,
            clientID: process.env.googleClientSecret || keys.facebook.clientID,
            clientSecret: process.env.googleClientSecret || keys.facebook.clientSecret,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, cb) => {
            if (req.user) {
                userAddAuthProvider(req.user, profile, cb)
            } else {
                userFindOrCreate(profile, cb);
            }
        }
    )
);