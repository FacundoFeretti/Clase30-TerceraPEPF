import passport from 'passport';
import jwt from 'passport-jwt';
import config from '../config.js'

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies[config.COOKIE_NAME]
    }
    return token
};

export const initializePassportJWT = () => {
    passport.use('jwt', 
    new JWTStrategy(
        {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.COOKIE_SIGN
        },
        async (jwtPayload, done) => {
            try{
                return done(null,jwtPayload)
            }catch(e){
                return done(e)
            }
        }
    ));
};

