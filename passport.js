const passport = require("passport");
const strategyGoogle = require("passport-google-oauth20").Strategy;
const strategyFacebook = require("passport-facebook").Strategy;
const keys = require("./config/keys");
const sql = require("./sql");
const randString = require("./utils/randString");

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    console.log("deserialize");

    client = sql.connect();
    client.query(`SELECT * FROM users WHERE id='${id}'`, (err, res) => {
        if (err) throw err;
        console.log(res.rows[0]);
        cb(null, res.rows[0]);
        client.end();
    });
});

userFindOrCreate = (data, cb) => {
    client = sql.connect();
    console.log(data);

    client.query(`SELECT * FROM users WHERE ${data.strategy}id='${data.profile.id}'`, (err, res) => {
        if (err) throw err;
        if (res.rowCount > 0) { //NOTE(DanoB) Old user
            client.end();
            cb(null, res.rows[0]);
        }
        else {
            let id = randString(20);
            client.query(`INSERT INTO users (id,username,${data.strategy}id) VALUES ( '${id}', '${data.profile.displayName}', ${data.profile.id} );`, (err, res) => {
                if (err) { //NOTE(DanoB) New user
                    if (err.code == 23505) {
                        //TODO(DanoB) Osetrit ked DEFAULT je taken
                    }
                    throw err;
                }
                client.end();
                cb(null, { 
                        id: id,
                        username: data.profile.displayName,
                        [data.strategy + "id"]: data.profile.id
                    }
                );
            });
        }
    });
}

passport.use(
    new strategyGoogle(
        {
            callbackURL: `http://moneasy.net/auth/google/redirect`,
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
        },
        (accessToken, refreshToken, profile, cb) => {
            userFindOrCreate({ strategy: "google", profile: profile }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

passport.use(
    new strategyFacebook(
        {
            callbackURL: `http://moneasy.net/auth/facebook/redirect`,
            clientID: keys.facebook.clientID,
            clientSecret: keys.facebook.clientSecret
        },
        (accessToken, refreshToken, profile, cb) => {
            userFindOrCreate({ strategy: "facebook", profile: profile }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);