const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require("enmap");
const fs = require("fs");
const token = /*process.env.token*/'NTA5NzkyNTQzNjMwODE5MzQ4.XaDhPQ.UbY1iOTaRE426Wn1EcjuEhBRaPs';
//var mysql = require('mysql');
/*var db_handle = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crazytings'
    });*/

/*db_handle.connect(error => {
    if(error) throw error;
    console.log("Connection to database successful!");
    });*/

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (message.content === '!ping') {
            message.channel.send('Pong.');            
    }
});

const config = require('./config.json');
client.config = config;

client.once('ready', () => {
	console.log('Ready!');
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

/*client.on('message', message => {
	if (message.content === '!calculateplayers') {
            if(!message.member.roles.find(r => r.name === 'Staff')) return message.channel.send("Sorry, you aren't allowed to use this command.");
            message.channel.send('Check console.'); 
            //let optime = [];
            let ptimearray1 = [];
            let ptimearray2 = [];
            let refills1 = [];
            let refills2 = [];
            let refills3 = [];
            let Idx = 0;
            let Idx2 = 0;
            let Idx3 = 0;
            let readerBool = false;
            let readerBool2 = false;
            let readerBool3 = false;
            lineReader.eachLine('oldrefills.txt', function(line) {
                let string = line.replace(/\s+/g,' ').trim();
                let splittedstring = string.split(" ");
                let rfill = parseInt(splittedstring[2]);
                refills1[Idx3] = splittedstring[0];
                refills2[Idx3] = rfill;
                Idx3++;
                if (line.includes('STOP')) {
                    readerBool2 = true;
                }
                if(readerBool2 === true) {
                    lineReader.eachLine('refills.txt', function(line) {
                        let _string = line.replace(/\s+/g,' ').trim();
                        let _splittedstring = _string.split(" ");
                        let rindex = refills1.indexOf(_splittedstring[0]);
                        refills1[rindex] = _splittedstring[0];
                        refills2[rindex] = _splittedstring[2] - refills2[rindex];
                        refills3[rindex] = parseInt(_splittedstring[2]);
                        if (line.includes('STOP')) {
                            readerBool3 = true;
                        }
                    });
                }
            });
            if(readerBool3 === true) {
                lineReader.eachLine('oldplaytime.txt', function(line) {
                    let string = line.replace(/\s+/g,' ').trim();
                    let splittedstring = string.split(" ");
                    let calcPlaytime2;
                    if(string.includes('day(s)')) {
                        calcPlaytime2 = (splittedstring[2] * 1440) + (splittedstring[4] * 60) + (parseInt(splittedstring[6]));
                    }
                    else if(!string.includes('days(s)') && string.includes('hour(s)')) {
                        calcPlaytime2 = (splittedstring[2] * 60) + (parseInt(splittedstring[4]));
                    }
                    else if(!string.includes('days(s)') && !string.includes('hour(s)')) {
                        calcPlaytime2 = parseInt(splittedstring[2]);
                    }
                    if (line.includes('STOP')) {
                        readerBool = true;
                    }
                    ptimearray1[Idx2] = splittedstring[0];
                    ptimearray2[Idx2] = calcPlaytime2;
                    Idx2++;
                    if(readerBool === true && readerBool2 === true) {
                        lineReader.eachLine('test.txt', function(line) {
                            let string2 = line.replace(/\s+/g,' ').trim();
                            let splittedstring = string2.split(" ");
                            let name = splittedstring[0];
                            let rank = splittedstring[1];
                            let pindex = ptimearray1.indexOf(name);
                            let calcPlaytime;
                            let calcPlaytimeN;
                            if(string2.includes('day(s)')) {
                                calcPlaytime = ((splittedstring[2] * 1440) + (splittedstring[4] * 60) + (parseInt(splittedstring[6]))) - ptimearray2[pindex];
                                calcPlaytimeN = (splittedstring[2] * 1440) + (splittedstring[4] * 60) + (parseInt(splittedstring[6]));
                            }
                            else if(!string2.includes('days(s)') && string2.includes('hour(s)')) {
                                calcPlaytime = ((splittedstring[2] * 60) + (parseInt(splittedstring[4]))) - ptimearray2[pindex];
                                calcPlaytimeN = (splittedstring[2] * 60) + (parseInt(splittedstring[4]));
                            }
                            else if(!string2.includes('days(s)') && !string2.includes('hour(s)')) {
                                calcPlaytime = (parseInt(splittedstring[2])) - ptimearray2[pindex];
                                calcPlaytimeN = (parseInt(splittedstring[2]));
                            }
                            let _rindex = refills1.indexOf(name);
                            let currentplayer;
                            if(isNaN(refills2[_rindex])) {
                                currentplayer = `${name} - ${rank} - ${calcPlaytime} - ${refills3[_rindex]}`;
                                console.log(_rindex);
                            }
                            else {
                                currentplayer = `${name} - ${rank} - ${calcPlaytime} - ${refills2[_rindex]}`;
                                console.log('bbbbb');
                            }
                            if(pindex === -1) {
                                if(isNaN(refills2[_rindex])) {
                                    console.log(`(namechanged/corrupted)${name} - ${rank} - ${calcPlaytimeN} - ${refills3[_rindex]}`);
                                    message.channel.send(`(namechanged/corrupted)${name} - ${rank} - ${calcPlaytimeN} - ${refills3[_rindex]}`);
                                }
                                else {
                                    console.log(`(namechanged/corrupted)${name} - ${rank} - ${calcPlaytimeN} - ${refills2[_rindex]}`);
                                    message.channel.send(`(namechanged/corrupted)${name} - ${rank} - ${calcPlaytimeN} - ${refills2[_rindex]}`);  
                                }
                                console.log(pindex);
                                //console.log(refills2);
                                //console.log(refills3);
                            }
                            else if(line.includes('STOP')) {
                                optime = [];
                                ptimearray1 = [];
                                ptimearray2 = [];
                                refills1 = [];
                                refills2 = [];
                                refills3 = [];
                                Idx = 0;
                                Idx2 = 0; 
                                Idx3 = 0;
                                readerBool = false; 
                                readerBool2 = false;
                                readerBool3 = false;
                                console.log('done!');
                                return false; // stop reading
                            }
                            else {
                                console.log(currentplayer);
                                message.channel.send(currentplayer);
                            }
                            Idx++;
                        });  
                    }
                }); 
            }
        
    }
});*/


client.login(token);

