const
	{
	    WAConnection: _WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WAMessageProto,
		ProxyAgent,
		ChatModification,
		GroupSettingChange,
		WA_MESSAGE_STUB_TYPES,
		WA_DEAFULT_EPHEMERAL,
		waChatKey,
		mentionedJid,
		processTime,
		prepareMessageFromContent, 
		relayWAMessage
	} = require("@adiwajshing/baileys")
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const moment = require("moment-timezone")
const fs = require("fs")
const axios = require("axios")
const request = require('request')
const util = require('util')
const ms = require('parse-ms')
const speed = require('performance-now')
const fetch = require('node-fetch')
const toMs = require('ms')

const { kompas, inews, youtube, facebook, quotes, igdl, igdl2, igstalk, igstory, tiktok, twitter, joox, covid, pin, pinterest, wallpaper, wikimedia, porno, hentai, quotesAnime, listsurah, surah, tafsirsurah, film, manga, anime, character, jadwalbola, jadwaltv, jadwalsholat, drakor, otakudesu, ongoing, komiku, tebakgambar, sholat, lirik, chara, wattpad, playstore, linkwa, telesticker, stickersearch, webtoon, surah2, fbdown, twitter2, upload } = require("./lib/scrape")
const { kyun, clockString, fetchJson, fetchText, jsonformat, isUrl, randomNomor, sleep, getBuffer, getGroupAdmins, getRandom } = require("./lib/funct")
const { color, bgcolor } = require("./lib/color")

const ownerNumber = ["62882250664733@s.whatsapp.net","6283894905341@s.whatsapp.net"]
const imgRzx3d = fs.readFileSync('./media/rzxbot3d.jpg')
const imgRzxneon = fs.readFileSync('./media/rzxbotneon.jpg')
const imgRzxtw = fs.readFileSync('./media/rzxbottw.jpg')

public = false

module.exports = rzx = async(rzx, mek) => {
	try {
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, buttonsMessage, listMessage } = MessageType
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const type = Object.keys(mek.message)[0]
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		const salam = "Selamat "+ moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const chats = (type === 'conversation') ? mek.message.conversation : (type === 'imageMessage') ? mek.message.imageMessage.caption : (type === 'videoMessage') ? mek.message.videoMessage.caption : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : (type === 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type === 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId : ''
        const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα¦|/\\©^]/.test(chats) ? chats.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα¦|/\\©^]/gi) : '/'
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = chats.split(' ')
        const isCmd = chats.startsWith(prefix)
        const botNumber = rzx.user.jid
		const isGroup = from.endsWith('@g.us')
		const isPrivate = from.endsWith('@s.whatsapp.net')
		const isStatus = from.endsWith('status@broadcast')
		const groupChat = rzx.chats.array.filter(v => v.jid.endsWith('g.us'))
        const privatChat = rzx.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
		const sender = mek.key.fromMe ? rzx.user.jid : isGroup ? mek.participant : mek.key.remoteJid
		const senderNumber = sender.split("@")[0] 
		const conts = mek.key.fromMe ? rzx.user.jid : rzx.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? rzx.user.name : conts.notify || conts.vname || conts.name || '-'
		const totalchat = await rzx.chats.all()
		const groupMetadata = isGroup ? await rzx.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const isOwner = ownerNumber.includes(sender)
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const isBotAdmins = groupAdmins.includes(botNumber) || false
		const more = String.fromCharCode(8206)
		const readmore = more.repeat(4001)
		
		//=======================================================================================//
		
		async function sendButMessage (id, content, footer, but = [], opt = {}) {
			rzx.sendMessage(id, { 
				contentText: content,
				footerText: footer,
				buttons: but,
				headerType: 1
				}, MessageType.buttonsMessage, opt)
		}
		
		async function sendButImage (id, content, footer, img, but = [], opt = {}) {
			images = await rzx.prepareMessage(id, img, image)
			rzx.sendMessage(id, { 
				imageMessage: images.message.imageMessage,
				contentText: content,
				footerText: footer,
				buttons: but,
				headerType: 4
				}, MessageType.buttonsMessage, opt)
		}
		
		async function sendButVideo (id, content, footer, vid, but = [], opt = {}) {
			videos = await rzx.prepareMessage(id, vid, video)
			rzx.sendMessage(id, { 
				videoMessage: videos.message.videoMessage,
				contentText: content,
				footerText: footer,
				buttons: but,
				headerType: 5
				}, MessageType.buttonsMessage, opt)
		}
		
		async function sendButLocation (id, content, footer, loc, but = [], opt = {}) {
			locations = await rzx.prepareMessage(id, loc, location)
			rzx.sendMessage(id, { 
				locationMessage: locations.message.locationMessage,
				contentText: content,
				footerText: footer,
				buttons: but,
				headerType: 6
				}, MessageType.buttonsMessage, opt)
		}
		
        //=======================================================================================//
		
		const reply = (teks) => {
			rzx.sendMessage(from, teks, text, { quoted: mek, sendEphemeral: 'chat', thumbnail: imgFake2, contextInfo: { mentionedJid: [sender] }})
		}
		const sendMess = (hehe, teks, option) => {
			rzx.sendMessage(hehe, teks, text, option)
		}
		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? rzx.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : rzx.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
		}
		const sendFileFromUrl = async(link, type, options) => {
        hasil = await getBuffer(link)
        rzx.sendMessage(from, hasil, type, options).catch(e => {
        fetch(link).then((hasil) => {
        rzx.sendMessage(from, hasil, type, options).catch(e => {
        rzx.sendMessage(from, { url : link }, type, options).catch(e => {
        reply
        console.log(e)
        })
        })
        })
        })
        }
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
				if(mids.length > 0){
					text = normalizeMention(to, text, mids)
				}
				const fn = Date.now() / 10000;
				const filename = fn.toString()
				let mime = ""
				var download = function (uri, filename, callback) {
					request.head(uri, function (err, res, body) {
						mime = res.headers['content-type']
						request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					});
				};
				download(url, filename, async function () {
					console.log('done');
					let media = fs.readFileSync(filename)
					let type = mime.split("/")[0]+"Message"
					if(mime === "image/gif"){
						type = MessageType.video
						mime = Mimetype.gif
					}
					if(mime.split("/")[0] === "audio"){
						mime = Mimetype.mp4Audio
					}
					rzx.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
					
					fs.unlinkSync(filename)
				});
			}
           const sendAudio = async(from, url) => {
           	await rzx.sendMessage(from, { url: url }, // can send mp3, mp4, & ogg
               MessageType.audio, 
               { mimetype: Mimetype.mp4Audio } // some metadata (can't have caption in audio)
                )
           }
		   const sendFakeThumb = async function(from, url, title, desc){
				var anoim = {
					detectLinks: false
				}
				var qul = await rzx.generateLinkPreview(url)
				qul.title = title
				qul.description = desc
				qul.jpegThumbnail = imgFake2
				rzx.sendMessage(from, qul, MessageType.extendedText, anoim)
			}
			function Json(objectPromise) {
            var objectString = JSON.stringify(objectPromise, null, 2)
            var parse = util.format(objectString)
            if (objectString == undefined) {
            parse = util.format(objectPromise)
            }
            return reply(parse)
            }
		
//=======================================================================================//
		
		if (budy.startsWith('>')){
        if (!isOwner)return 
        function _(rem) {
        ren = JSON.stringify(rem,null,2)
        pes = util.format(ren)
        reply(pes)
        }
        try{
        reply(require('util').format(eval(`(async () => { ${q} })()`)))
        } catch(err) {
        e = String(err)
        reply(e)
        }
        }
        if (budy.startsWith('$')){
        if (!mek.key.fromMe && !isOwner) return
        exec(q, (err, stdout) => {
        if (err) return reply(`${err}`)
        if (stdout) {
        reply(stdout)
        }
        })
        }
        if (budy.startsWith('=>')){
        if (!isOwner && !mek.key.fromMe) return
        Return = (sul) => {
        var sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined){
        bang = util.format(sul)
        }
        return reply(bang)
        }
        try {
        reply(util.format(eval(`;(async () => { ${q} })()`)))
        } catch(e){
        reply(String(e))
        }
        }
		
		//=======================================================================================//
		
		if (!public) {
			if (!isOwner && !mek.key.fromMe) return
		}
		
		/*
		available = 'available', // "online"
        composing = 'composing', // "typing..."
        recording = 'recording', // "recording..."
        paused = 'paused' // stopped typing, back to "online"
        */
		if (chats) rzx.updatePresence(from, Presence.composing), console.log(color("Recevied Message {\n", "green"), color(`• Time : ${time}\n`, "green"), color(`• From : ${from}\n`, "green"), color(`• Type : ${type}\n`, "green"), color(`• Message : ${chats}\n`, "green"), color("}", "green"))
		
		switch (command) {
			
			case 'owner':
            ini_list = []
            for (let i of ownerNumber) {
            vname = rzx.contacts[i] != undefined ? rzx.contacts[i].vname || rzx.contacts[i].notify : undefined
            ini_list.push({ "displayName": `Kontak`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Kontak;;;\nFN:${vname ? `${vname}` : `${choco.user.name}`}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:rzxgamz123@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL;Web: https://github.com/RzxGamz\nitem3.X-ABLabel:Github\nEND:VCARD` })
            }
            rzx.sendMessage(from, { "displayName": `Creator Choco Bot`, "contacts": ini_list }, 'contactsArrayMessage', { quoted: mek, contextInfo: { forwardingScore: 999, isForwarded: true }})
			break
			
		}
		    } catch (e) {
			console.log(color(e, 'red'))
			}
		}
		
		
		
		
		
		
		
		
		
		
