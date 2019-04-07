module.exports = (errCode, req, res) => {
    switch (errCode) {
        case 403:
            res.sendStatus(403);
            break;
        case 404:
            res.sendStatus(404);
            break;
    
        default:
            throw Error("Unknown / not implemented http error code.");
    }
}