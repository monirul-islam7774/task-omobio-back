var Pusher = require('pusher');

// pusher initializer
var pusher = new Pusher({
    appId: '948097',
    key: 'e473c6790a77055f3973',
    secret: '364045befecd2ebe4658',
    cluster: 'ap1',
    encrypted: true
});

// notification controller
exports.sendNotification = function (req, res) {
    console.log(req.files[0])
    pusher.trigger('my-channel', 'my-event', {
        file: 'http://localhost:1234/images/'+ req.files[0].filename,
        title: req.body.title
    });
    res.status(200).send({
        file: 'http://localhost:1234/images/'+ req.files[0].filename,
        title: req.body.title
    })
}
