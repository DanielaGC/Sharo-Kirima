module.exports = class VoiceStateUpdateReceive {
    constructor(client) {
        this.client = client
    }

    async run(oldMember, newMember) {

        let voiceChannel = newMember.guild.voiceStates.get(newMember.id).channelID
        if (voiceChannel !== null) {
            let vc = newMember.guild.channels.get(voiceChannel)
            if (vc.id !== "481843365055430659") return
            if (vc.members.size >= 1) {
                vc.join().then(v => {
                    this.client.user.setPresence({ activity: { name: "Animu FM Radio Station - The Most Moe Radio of Brazil!", type: "LISTENING" } })
                    v.play("http://cast.animu.com.br:9021/stream", { volume: 0.5 })
                })
            }
        }
        let oldVoiceChannel = oldMember.guild.voiceStates.get(this.client.user.id).channelID
        if (oldVoiceChannel !== null) {
            let oldVc = oldMember.guild.channels.get(oldVoiceChannel)
            if (oldVc.members.get(this.client.user.id) && oldVc.members.size === 1) {
                oldVc.leave()
                this.client.emit("ready")
            }
        }
    }
}