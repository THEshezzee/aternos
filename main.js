const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 1; // 2 second movement interval
var maxrandom = 3; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]
var localbot = data["botname"]
var reconnectTime = data["ReconnectTime"] 
var chat = data["AutoReg"]
var AutoReconnect = data["AutoReconnect"]
var ChatOutPut = data["ReadChat"]


var rn = require('random-number'); //random values
var randomTime = {
    min:31054
 ,  max: 180000
 , integer: false
}
var c = {
  min: 0
, max: 190000
, integer: true
}  //shiro of NGNF o(*°▽°*)o
var f = {
  min:  0
, max:  10000
, integer: true  
}


var bot = mineflayer.createBot({     //bot live start here
  host: host,
  username: (username + rn(c))
});

function createBotty () {
    const bot = mineflayer.createBot({    //some wildsticks
  host: host,
  username: (username + rn(c)) }     //fucky me daddy `(*>﹏<*)′
    
)}; 

if (AutoReconnect == "true") {
setTimeout(function() {bot.on('end', createBotty)}, reconnectTime);   //auto reconnect  
}
	
setTimeout(function() {createBotty()}, rn(randomTime));  //second bot to safe        

function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){   //on login
    process.title = ("Worked on: " + host)
    console.log("Succsess joined: " + host)
    setTimeout(function() {console.log("Logged in as: " + bot.username)}, 1500);
    if(chat == "true"){
    bot.chat("/register 1234512 1234512");
    bot.chat("/login 1234512")};
});

bot.on('time', function(time) {
    if(nightskip == "true"){
    if(bot.time.timeOfDay >= 13000){
    bot.chat('/time set day')
    }}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});

bot.on('spawn',function() {
    bot.chat("/tp " + rn(f) + " " + rn(f) + " " + rn(f));
    setTimeout(function() {bot.chat("give @a acacia_stick 62")}, rn(f)); 
    connected=1;
    if (connected=1) {
        bot.chat("Love is shit! " + host + " " + rn(f))
    }
});

bot.on('death',function() {
    bot.emit("respawn")

});

bot.on('kicked', function(reason) {
    console.log("disconnected:", reason, );
    bot.emit("reconnect")
     
});


bot.on('chat', function(username, message) {  //idk lol
    if (username = (localbot))  //bot in chat name
        username == (("bot"))
    if(ChatOutPut == "true"){
	console.log(username + ": " + message)};
});


//wtf
