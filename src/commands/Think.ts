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

import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../classes/Command";
import { Source } from "../classes/Source";
import randomElement from "../features/utils/randomElement";
import { CommandType } from "../typings/enums";
import emoji from "@root/app_emoji.json";

export default class Think extends Command<[string]> {
  constructor() {
    super({ 
      type: CommandType.Fun, 
      name: 'think', 
      description: '讓我幫你送出一個 thinking 表情符號', 
      options: [{
        type: ApplicationCommandOptionType.String, 
        name: '表情', 
        description: '指定一種要送出的🤔', 
        required: false, 
        choices: Object.keys(thinks).map(choice => ({ name: choice, value: choice }))
      }], 
      permissions: {
        bot: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.UseExternalEmojis, PermissionFlagsBits.ViewChannel], 
        user: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
      }
    });
  }

  public async execute(source: Source, [think]: [string]): Promise<void> {
    await source.hide();

    if (!think) {
      const array = Object.keys(thinks);
      think = randomElement(array);
    }

    await source.channel?.send(thinks[think as keyof typeof thinks]);
    await source.editReply(`${think} 傳送成功`);
  }
}

const thinks = Object.freeze({
  'normal': '🤔',
  'monocle': '🧐',
  '10': emoji["10think"],
  'attano': emoji.attanoThink,
  'distortion': emoji.distortionThink,
  'super': emoji.superthonk,
  'thonk': emoji.thonk,
  'hyper': emoji.hyperthonk,
  'rainbow': emoji.rainbowthonk,
  'smile': emoji.smilethink,
  'sinking': emoji.sinking,
  'blue': emoji.bluethink,
  'thong': emoji.thongk,
  'jojo': emoji.jojothink,
  'lazer': emoji.lazerthink
});
