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
const { kyun, clockString, fetchJson, fetchText, jsonformat, randomNomor, sleep, getBuffer, getGroupAdmins, getRandom } = require("./lib/funct")
const { color, bgcolor } = require("./lib/color")
const simple = require("./lib/simple")

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
		const m = await simple.smsg(rzx, mek)
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
		
		/*
        mimetype for sending message type document

        PDF : "application/pdf"
        DOCX : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        XLSX : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        DOC : "application/msword"
        EXCEL : "application/msexcel"
        */
		async function sendButDocument (id, content, footer, img, but = [], opt = {}) {
			rzx.sendMessage(id, {
               contentText: content,
               footerText: footer,
               buttons: but,
               "headerType": "DOCUMENT", 
               "documentMessage": { 
               "url": "https://mmg.whatsapp.net/d/f/Ano5cGYOFQnC51uJaqGBWiCrSJH1aDCi8-YPQMMb1N1y.enc", 
               "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
               "title": "@Rzxbot", 
               "fileSha256": "8Xfe3NQDhjwVjR54tkkShLDGrIFKR9QT5EsthPyxDCI=", 
               "fileLength": 50000000000, 
               "pageCount": 1000, 
               "mediaKey": "XWv4hcnpGY51qEVSO9+e+q6LYqPR3DbtT4iqS9yKhkI=", 
               "fileName": "Rzx Bot Whatsapp", 
               "fileEncSha256": "NI9ykWUcXKquea4BmH7GgzhMb3pAeqqwE+MTFbH/Wk8=", 
               "directPath": "/v/t62.7119-24/35160407_568282564396101_3119299043264875885_n.enc?ccb=11-4&oh=d43befa9a76b69d757877c3d430a0752&oe=61915CEC", 
               "mediaKeyTimestamp": "1634472176",
               "jpegThumbnail": img}}, 
               MessageType.buttonsMessage,
               opt)
		}
		
		async function sendProduct (id, title, desc, opt = {}) {
			rzx.sendMessageFromContent(id, {
		        productMessage: {
			    product: {
				productId: "123456789",
				productImage: { "url": "https://mmg.whatsapp.net/d/f/AtXv_6lCycn2XXbP9ZhrkuWAun8Tu5o4oETLhEd4sgu7.enc","mimetype": "image/jpeg","fileSha256": "tUCeLtJd7G5jjj7Gs/kRG5OYqD+9AGnMPNe52600uLI=","fileLength": "31583","height": 1067,"width": 1280,"mediaKey": "kobAdSBDUu+29cbRXJ/del6INP7/qPtXJNal693trR8=","fileEncSha256": "a+0Q3wlUIgGeLZbks4pfF5W4u0tJ65VcsvdV9hoZHHo=","jpegThumbnail": "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" },
				title: title,
				description: desc,
				currencyCode: "USD",
				priceAmount1000: "50000000",
				salePriceAmount1000: "5000",
				productImageCount: 5,
				url: "https://github.com/RzxGamz",
				retailerId: "@RzxBot"
				},
				businessOwnerJid: "0@s.whatsapp.net"
				}}, opt)
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
		
		
		
		
		
		
		
		
		
		