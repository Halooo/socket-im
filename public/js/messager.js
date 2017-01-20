/**
 * Created by haos on 03/01/2017.
 */

let socket = io().connect("http://localhost:4080");
$('form').submit(function () {
    socket.emit('message', $('#msgbar').val());
    $('#msgbar').val('');
    return false;
});

socket.on('chat', function (msg) {
    $('#msger').append($('<li>').text(msg.msg));
});