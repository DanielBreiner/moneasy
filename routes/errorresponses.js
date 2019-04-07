/**
 * @file Responses to http error codes
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

module.exports = (errCode, req, res) => {
    switch (errCode) {
        case 403:
            res.sendStatus(403);
            break;
        case 404:
            res.sendStatus(404);
            break;
        default:
            res.sendStatus(errCode);
            console.log("Default error response to error code " + errCode);
    }
}