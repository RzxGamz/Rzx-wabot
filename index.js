const { WAConnection: _WAConnection, MessageType } = require('@adiwajshing/baileys')
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const fs = require('fs')
const cfonts = require('cfonts')
const { exec } = require('child_process')
const { color, bgcolor } = require('./lib/color')
const rzx = new WAConnection()

require('./rzxgamz.js')
nocache('./rzxgamz.js', module => console.log(`${module} is now updated!`))

async function starts() {
	rzx.logger.level = 'warn'
    rzx.version = [2, 2142, 12]
    rzx.browserDescription = [ 'RzxGamz', 'EDGE', '3.0' ]
    console.log(color("Start running rzx bot...", "blue"))
    cfonts.say('Rzx Bot', {
        colors: ['#f2aa4c'],
        font: 'block',
        align: 'center',
    })
    
    rzx.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' SCAN THIS QR CODE!'))
    })
    
    fs.existsSync('./session.json') && rzx.loadAuthInfo('./session.json')
    
    rzx.on('connecting', () => {
        console.log('Connecting...')
    })
    
    rzx.on('open', () => {
        console.log('Connected')
    })
    
    rzx.on('close', () => {
    	console.log('Closed connection')
    })
    
    await rzx.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(rzx.base64EncodedAuthInfo(), null, '\t'))
    
    rzx.on('chat-update', async (mek) => {
    	if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        require('./rzxgamz.js')(rzx, mek)
    })
    
    rzx.on('group-update', async (anu) => {
		const metdata = awaitrzx.groupMetadata(anu.jid)
    	const fkontakk = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(anu.jid ? { remoteJid: '6283136505591-1604595598@g.us' } : {})}, message: { "contactMessage":{"displayName": `${metdata.subject}`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;Denz;;;\nFN:Denz\nitem1.TEL;waid=6285866295942:6285866295942\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
        if(anu.announce == 'false'){
        teks = `- [ Group Opened ] -\n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`
        rzx.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
  }
        else if(anu.announce == 'true'){
        teks = `- [ Group Closed ] -\n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`
        rzx.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
  }
        else if(!anu.desc == ''){
        tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
        teks = `- [ Group Description Change ] -\n\nDeskripsi Group telah diubah oleh Admin @${anu.descOwner.split('@')[0]}\n• Deskripsi Baru : ${anu.desc}`
        rzx.sendMessage(metdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [tag]}, quoted: fkontakk})
  }
        else if(anu.restrict == 'false'){
        teks = `- [ Group Setting Change ] -\n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`
        rzx.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
  }
        else if(anu.restrict == 'true'){
        teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`
        rzx.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
  }
})

    rzx.on('CB:action,,call', async json => {
        const callerId = json[2][0][1].from;
        rzx.sendMessage(callerId, "*CALL DETECTED*\n\n_Anda Akan Di Block Karena Telah Melanggar Peraturan Bot Yaitu Menelfon Bot_", MessageType.text)
        await sleep(5000)
        await rzx.blockUser(callerId, "add")
        })
        
	rzx.on('message-delete', async (m) => {
        if (!m.key.fromMe && antidelete) {
        if (!m.key.remoteJid == 'status@broadcast') return
        m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
        const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        let d = new Date
        let c = rzx.chats.get(m.key.remoteJid)
        let a = c.messages.dict[`${m.key.id}|${m.key.fromMe ? 1 : 0}`]
        let co3ntent = rzx.generateForwardMessageContent(a, false)
        let c3type = Object.keys(co3ntent)[0]
        let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
        let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
        let week = d.toLocaleDateString('id', { weekday: 'long' })
        let calender = d.toLocaleDateString('id', {
           day: 'numeric',
           month: 'long',
           year: 'numeric'
        })
       rzx.copyNForward(m.key.remoteJid, m.message)
       rzx.sendMessage(m.key.remoteJid, `_*ANTI DELETE*_\n\n▢ Nama : @${m.participant.split("@")[0]}\n▢ Tipe : ${c3type}\n▢ Tanggal : ${jam} - ${week} ${weton} - ${calender}`, MessageType.text, {quoted: m.message, contextInfo: {"mentionedJid": [m.participant]}})
}
})

}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()