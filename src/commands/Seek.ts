import {command, Command, CommandContext, MessageChannel, Utils} from "@lib";
import {SpotifyItemType} from "@lavaclient/spotify";

import type {Addable} from "@lavaclient/queue";
import {ApplicationCommandOptionType} from "discord.js";
import {Seek as SeekFn} from "../functions";

@command({
    name: "seek",
    description: "Seeks a position in current song",
    options: [
        {
            name: "position",
            description: "The position to seek to.",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ]
})
export default class Seek extends Command {
    async exec(ctx: CommandContext, {position}: { position: string }) {
        await SeekFn({
            vc: ctx.guild?.voiceStates?.cache?.get(ctx.user.id)?.channel,
            client: ctx.client,
            channel: ctx.channel,
            send: (t: string) =>
                ctx.reply(Utils.embed({
                    description: t,
                }),),
            sendIfError: (t: string) => ctx.reply(Utils.embed(t), {ephemeral: true}),
            guildId: ctx.guild!.id,
            position,
        })
    }
}