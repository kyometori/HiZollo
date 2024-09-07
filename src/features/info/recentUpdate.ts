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

export default `
- 修復了一些 bug
  - 有漏洞可以拿來 @\u200beveryone
  - \`react\` 無法使用特定表情
  - 隱藏指令的回應機率不正確
  - \`buttonrole\` 指令遇到 Unicode 表情時會出問題
  - \`gomoku\` 指令的英文字母在某些手機裝置會被合併成國旗
- \`getmsg\` 指令獲得的訊息不包含指令本身
- HZNetwork 支援貼圖和訊息回覆連結
- \`choose\` 指令支援權重
- \`server\` 指令現在會顯示更詳細的頻道資料
- \`vote\` 指令現在使用時會跳出即將下架的提示，預計在下次更新中正式下架
- 新增一些隱藏指令的回應
- 修改一些隱藏指令的判斷標準
- 改變 \`calc\` 指令運算結果的顯示方式
- 關閉可以控制機器人的相關指令
  - 包含 \`say\`、\`repeat\`、\`hznetwork\`、\`guildrop\`、和 HZNetwork 本身
  - 這項更動會是暫時的
`;
