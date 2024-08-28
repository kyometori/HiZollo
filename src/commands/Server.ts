/*
 * 
 * Copyright 2022 HiZollo Dev Team <https://github.com/hizollo>
 * 
 * This file is a part of Junior HiZollo.
 * 
 * Junior HiZollo is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Junior HiZollo is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Junior HiZollo. If not, see <https://www.gnu.org/licenses/>.
 */

import { ChannelType, Collection, GuildBasedChannel } from "discord.js";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import type { Source } from "../classes/Source";
import { Command } from "../classes/Command";
import { CommandType } from "../typings/enums";

export default class Server extends Command<[]> {
  constructor() {
    super({ 
      type: CommandType.Utility, 
      name: 'server', 
      description: '取得這個伺服器的相關資訊', 
      aliases: ['guild'], 
      permissions: {
        bot: [PermissionFlagsBits.EmbedLinks]
      }
    });
  }

  public async execute(source: Source): Promise<void> {
    const { client, guild } = source;

    if (!guild) {
      await source.defer({ ephemeral: true });
      await source.update('這個指令只能在伺服器中使用');
      return;
    }
    
    await source.defer();

    const info = new EmbedBuilder()
      .applyHiZolloSettings(source.member, `${guild.name} 的伺服器資訊`)
      .setThumbnail(guild.iconURL({ extension: 'png', size: 4096, forceStatic: false }))
      .addFields(
        { name: '伺服器 ID', value: guild.id },
        { name: 'HiZollo 分支編號', value: client.shard?.ids[0] === undefined ? '查無資訊' : `${client.shard?.ids[0]}`},
        { name: '擁有者', value: `<@${guild.ownerId}>` },
        { name: '成員數量', value: `${guild.memberCount}` },
        { name: '頻道數量', value: this.parseChannelCount(guild.channels.cache) },
        { name: '創立時間', value: `<t:${~~(guild.createdTimestamp/1000)}>` }
      );
    await source.update({ embeds: [info] });
  }

  private parseChannelCount(channels: Collection<string, GuildBasedChannel>): string {
    let text = 0, voice = 0, stage = 0, announcement = 0, forum = 0, thread = 0;
    channels.forEach(({ type, name }) => {
      switch (type) {
        case ChannelType.GuildText:
          console.log(name);
          text++;
          break;
        
        case ChannelType.GuildVoice:
          voice++;
          break;
        
        case ChannelType.GuildStageVoice:
          stage++;
          break;

        case ChannelType.GuildAnnouncement:
          announcement++;
          break;
        
        case ChannelType.GuildForum:
          forum++;
          break;
        
        case ChannelType.PublicThread:
        case ChannelType.AnnouncementThread:
          thread++;
          break;
      }
    });

    let result = '';
    if (text) result += `文字頻道：${text}\n`;
    if (voice) result += `語音頻道：${voice}\n`;
    if (stage) result += `舞台頻道：${stage}\n`;
    if (announcement) result += `公告頻道：${announcement}\n`;
    if (forum) result += `論壇頻道：${forum}\n`;
    if (thread) result += `公開討論串：${thread}\n`;
    if (!result) result = "本伺服器沒有任何頻道";
    return result;
  }
}
