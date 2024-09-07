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

import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../classes/Command";
import { Source } from "../classes/Source";
import randomElement from "../features/utils/randomElement";
import { CommandType } from "../typings/enums";

export default class Choose extends Command<string[]> {
  constructor() {
    super({
      type: CommandType.Utility, 
      name: 'choose', 
      description: '讓我來拯救你的選擇困難症', 
      extraDescription: '可以使用 `權重:選項名稱` 的語法來控制選項的權重，預設的權重是 `1`',
      options: [{ 
        type: ApplicationCommandOptionType.String, 
        name: '選項%i', 
        description: '要抽出的選項', 
        required: false, 
        repeat: true
      }]
    });
  }

  private weightMatch: RegExp = /^(?:(\d+(?:\.\d+)?):)?(.+)$/

  public async execute(source: Source, options: string[]): Promise<void> {
    options = options.filter(o => o != null);

    if (options.length < 2) {
      await source.defer({ ephemeral: true });
      await source.update('請給我兩個以上的選項，不然我是要怎麼選');
      return;
    }


    const option = this.weightedRandomElement(options);
    const answer = randomElement(this.replys).replace('<>', option)
    await source.defer();
    await source.update({
      content: answer,
      allowedMentions: { parse: [] }
    })
  }

  private getWeight(input: string): [number, string] {
    let weight: number = 1, option: string = input;
    const match = this.weightMatch.exec(input);
    if (match && match[1]) {
      weight = parseFloat(match[1]);
      option = match[2]
    }
    
    return [weight, option];
  }

  private weightedRandomElement(items: string[]) {
    const parsedItems = [];
    let totalWeight = 0;

    for (const item of items) {
      const [weight, name] = this.getWeight(item);
  
      parsedItems.push({
        name: name,
        weight: weight
      });
      totalWeight += weight;
    }
  
    const randomWeight = Math.random() * totalWeight;
  
    let currentWeight = 0;
    for (const item of parsedItems) {
      currentWeight += item.weight;
      if (currentWeight >= randomWeight) {
        return item.name;
      }
    }
  
    return parsedItems[parsedItems.length - 1].name;
  }

  private replys = [
    '我選 <>', '我的話會選 <>', '我想選 <>' ,  '我選擇 <>', '選 <> 好了',
    '<>，我選這個', '<>，如何', '也許 <> 是 ok 的', '<>？', '我認為 <> 是最好的',
    '<> 好像比較好，你覺得呢？', '<> 吧'
  ];
}
