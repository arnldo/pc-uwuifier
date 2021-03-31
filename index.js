const { Plugin } = require('powercord/entities')

const { get } = require('powercord/http')

module.exports = class Uwuifier extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'uwuify',
            description: 'Translate and send uwufied text',
            usage: '{c} [text]',
            executor: async (args) => {
                let uwufiedText = await this.uwuify(args.join(' '))
                return {
                    send: uwufiedText,
                    result: uwufiedText ? uwufiedText : 'Couldn\'t uwuify message',
                }
            }
        })
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('uwuify')
    }

    async uwuify(text) {
        return await get(`https://uwuifier-nattexd.vercel.app/api/uwuify/${text}`).then(r => r.body.message)
    }
}