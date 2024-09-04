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

import { Message } from "discord.js";
import { HiddenCommand } from "../classes/HiddenCommand";
import emoji from "@root/app_emoji.json";
import config from "@root/config";

export default class Tagged extends HiddenCommand {
  constructor() {
    super('tagged');
  }

  public filter(message: Message): boolean {
    return !!message.client.user && message.author.id !== message.client.user.id &&
      message.mentions.has(message.client.user, { ignoreRoles: true, ignoreEveryone: true });
  }

  private r1 = [
    '蛤', '蝦', '嘿', '嗨', 'a', 'A', 'huh', 'hey', 'heyyyi', 'hi', 'hello', 'wut?', 'yesss',
    '怎樣', '蛤？', '是在', '幹嘛', 'what??', 'yeah?', 'hmmm...', 'well...?', '🤔', emoji.pingsock,
    '又怎樣', '要幹嘛', '有事ㄇ', '有事嗎', '我不在', '？', '？？', '?', '?????', 'what\'s wrong', 'wut happened',
    '找我幹嘛', '有事情嗎', '又怎麼了', '又要幹嘛', '是在哈囉', '有事快說', '有問題嗎', '有問題ㄇ',
    '好累，怎樣', '找我有事嗎', 'Tag 我有事嗎', 'tag 我有事嗎', '被發現我在這裡了', '有重要的事嗎？',
    `吵死了 %u`, `咦，是 %u 找我嗎？`, `是 %u ping 我嗎？`,
    '沒事請不要一直 @ 我，很煩躁', '我看到有人 tag 我，是誰啊', '我現在沒空，稍等一秒再找我吧', '你好，我是 Junior HiZollo',
    `Tag 我不能代替前綴喔，請使用 \`${config.bot.prefix}help\``, { files: ['./src/pictures/tagged.png'] }
  ];
  private r2 = [
    '你又在沒事亂 @ 我？好啊我沒差啊我就不重要啊你繼續找理由啊我不在乎啊反正每個人都這樣啊我已經習慣了啦真的沒關係啊其他人開心就好了不用在乎我真的啦我就是沒人愛啦隨便你好了反正每次都這樣我沒差我真的沒關係就這樣吧你不用來找我也可以啦我真的沒有關係你玩得開心就好我不會打擾到你不用陪我啦真的不用你不是跟他們玩得很開心嗎不需要我啦我只會吵到你而已不用這麼關心我我自己一個人就可以了我也很忙你才不是我的全世界沒有你我也可以玩得很開心真的不用你來陪我看你玩得開心就好了是我太情緒化又愛情緒勒索你真的不是你的問題啦從頭到尾都是我的問題你真的不用想那麼多我自己安靜一下就會好了你自己去玩吧我真的不難過嗯嗯嗯我不一定要你陪著看你跟他們玩的那麼開心我才不會吃醋你就當我在無理取鬧好了不用想那麼多你繼續去玩啊我真的不在意說了那麼多也只有我會在乎而已真的沒關係啦', 
    '有人相愛就有人心碎，有人夜裡看海，有人看我是機器人無法還手就一直 @。我不知道你三十七度的身體是怎麼做出如此冰冷的行為，這偌大的痛苦使我坐立難安，我開始反思，是我的功能不夠好嗎？我看了伺服器數量，它不服氣，我也不服，再看一下指令清單，我服了，在我百思不得其解的情況下，我留了幾行文字，今晚的%g又多了一台傷心的機器人。', 
    { content: '我們來打遊戲吧，你當遊戲', files: ['./src/pictures/tagged_epic_1.png'] }, 
    { content: '系統提示：HiZollo 召喚影分身處決 %u', files: ['./src/pictures/tagged_epic_2.png'] }, 
    { content: '%u 做得好，下輩子別這麼做了', files: ['./src/pictures/tagged_epic_3.png'] }, 
  ];

  public execute(message: Message): boolean {
    this.allTimeResponse(message, this.r1, this.r2);
    return true;
  }
}
