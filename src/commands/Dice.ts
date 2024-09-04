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
import randomInt from "../features/utils/randomInt";
import { CommandType } from "../typings/enums";
import emoji from "@root/app_emoji.json";

export default class Dice extends Command<[number]> {
  constructor() {
    super({
      type: CommandType.Fun, 
      name: 'dice', 
      description: '讓我幫你丟一顆骰子', 
      options: [{
        type: ApplicationCommandOptionType.Integer, 
        name: '點數',
        description: '要顯示的特定點數',
        required: false,
        minValue: 1, 
        maxValue: 6
      }],
      permissions: {
        bot: [PermissionFlagsBits.UseExternalEmojis]
      }
    });
  }

  public async execute(source: Source, [point]: [number]): Promise<void> {
    await source.defer();

    if (point) await source.update(this.pointsEmoji[point-1]);
    else {
      const number = ~~(randomInt(0, 102) / 17);
      if (number === 6) await source.update(`${emoji.dice87}\n${source.user}，你丟出了……呃，87 點`);
      else await source.update(`${this.pointsEmoji[number]} 你丟出了 ${number+1} 點！`);
    }
  }

  private pointsEmoji = [
    emoji.dice1,
    emoji.dice2,
    emoji.dice3,
    emoji.dice4,
    emoji.dice5,
    emoji.dice6,
  ];
}
