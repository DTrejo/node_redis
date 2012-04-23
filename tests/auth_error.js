/*  
    # set a password, leave all else as default
    echo "requirepass password" >> tests/auth_error.conf

    # start redis server
    redis-server tests/auth_error.conf

    # run this script
    node tests/auth_error.js
*/

var redis = require('../index');
var assert = require('assert');

// redis.debug_mode = true;

var options = { no_ready_check: false };

var client = redis.createClient(6379, '0.0.0.0', options);

console.log('This is printed out');

// without this, can't talk to redis and an error is thrown.
// client.auth('password');

client.on('ready', function(){
    console.log('==Test succeeded==');
    console.log('This would not get printed if the bug existed');
    client.auth('password', function() {
        process.exit(0);
    });
});

client.on('error', function(e) {
    console.log('==Test failed==');
    console.log(e);
    process.exit(1);
});
