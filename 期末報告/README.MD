# 期末報告

以本學期製作專題為例，就我負責之部分進行報告，我所負責之內容為voice kit、紅外線控制與其程式編寫。<br>

[專題網址](https://github.com/kalen2019/topic) <br>

因為還在製作階段，故也在持續整理中，內容只有這學期的部分。<br>

我們一開始並沒有在Github建立專案，因為我們三人一人負責一個設備，也還尚未做整合，加上自己沒有往Github上傳習慣，故都是透過備份方式留下舊版資料，我作筆記以免再發生錯誤。<br>

[筆記1](https://github.com/kalen2019/topic/blob/main/%E8%A8%AD%E7%BD%AE/one.md)<br>
[筆記2](https://github.com/kalen2019/topic/blob/main/%E8%A8%AD%E7%BD%AE/two.md)<br>

## 專題程式編寫
此程式75%原創，25%由AIY的範例檔案提供，如有雷同，純屬巧合。<br>
這個程式是由原來AIY所提供的範例程式所改寫的，除了函式庫的部份，其他部分幾乎是變成自己編寫的了，下列將一一講解。<br>
[cloudspeech_demo.py](https://github.com/kalen2019/topic/blob/main/cloudspeech_demo/cloudspeech_demo.py) <br>
以下是使用的函式庫
```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
   
import locale
import logging
import sys
import os
import time

from google.assistant.library.event import EventType
from aiy.assistant import auth_helpers
from aiy.assistant.library import Assistant

from aiy.board import Board, Led
from aiy.voice import audio
from gtts import gTTS
from pydub import AudioSegment
```
接下來是一些函式，這程式在傾聽階段時，會分辨是命令還是GOOGLE查詢，再來選擇是呼叫家電控制還是去幫你GOOGLE搜尋答案。
```
rc = ""     #將google助理想要回的話儲存起來(如果進入家電控制模式，助理功能會被關閉，避免兩個功能同時使用而報錯，但又希望諸如你好或再見等招呼可以由助理自己判斷如何回覆，故設此變數)
e = 0      #用來判斷是否關閉助理，如等於1，將關閉整個程式
def locale_language():        # 環境語言參數
    language, _ = locale.getdefaultlocale()
    return language

def say(text):               # 將文字轉成語音
    tts = gTTS(text, lang='zh-TW')
    tts.save('output.mp3')
    sound = AudioSegment.from_mp3('output.mp3')
    sound.export('output.wav', format='wav')
    audio.play_wav('output.wav')
def process_event(led, assistant, event):   #整個程式核心功能
    logging.info(event)                     #打印助理狀態與回覆內容
    remote_name = ['mbot', 'temp']          #設備名稱
    mbot = ['前進','後退','左轉','右轉','紅外線','超聲波','循線','轉圈圈']   #mbot遙控命令
    mbot_r = ['前進中','後退中','左轉','右轉','紅外線模式','超聲波模式','循線模式','轉圈圈'] #助理回覆
    mbot_m = ['FORWARD','BACK','LEFT','RIGHT','A','B','C'] #mbot按鈕名稱
    temp = ['開冷氣','關冷氣','上升溫度','下降溫度']   #冷氣遙控命令
    temp_r = ['開機','關機','上升了','下降了']    #助理回覆
    temp_m = ['POWER','CLOSE','UP','DOWN']    #冷氣按鈕命令
    if event.type == EventType.ON_START_FINISHED:  #開始程式
        led.state = Led.BEACON_DARK  # Ready. LED常暗
        logging.info('Say "OK, Google" then speak, or press Ctrl+C to quit...')

    elif event.type == EventType.ON_CONVERSATION_TURN_STARTED: #開始傾聽
        led.state = Led.ON  # Listening. LED會亮

    elif event.type == EventType.ON_END_OF_UTTERANCE:    #結束傾聽
        led.state = Led.PULSE_QUICK  # Thinking. LED閃爍

    elif event.type == EventType.ON_RECOGNIZING_SPEECH_FINISHED:   #解析聽到內容
        text = event.args['text']       #儲存聽到內容
        time.sleep(1)                   #要停等不然助理可能不等是否是家電控制指令就直接回覆google搜尋結果
        #assistant.stop_conversation() #停止助理功能
        time.sleep(1)
        if text in mbot:               #如果有在mbot中找到命令
            assistant.stop_conversation()
            s = mbot.index(text)       #尋找命令位置
            RmN = remote_name.index('mbot')  #尋找遙控器位置
            if text == "轉圈圈":
                lirc_command = "irsend send_start " + remote_name[RmN] + " KEY_" + mbot_m[2]   #開啟紅外線把mbot遙控器的左轉指令訊號發射
                print(lirc_command)
                say(mbot_r[s])  #讓助理回覆指令功能
                print("Assistant : " + mbot_r[s])
                os.system(lirc_command)  #發出開啟指令
                time.sleep(4)   #紅外線開啟時間
                lirc_command = "irsend send_stop " + remote_name[RmN] + " KEY_" + mbot_m[2]   #關閉紅外線
                print(lirc_command)
                os.system(lirc_command) #發出關閉指令
                lirc_command = "irsend send_start " + remote_name[RmN] + " KEY_" + mbot_m[3]   #開啟紅外線把mbot遙控器的右轉指令訊號發射
                print(lirc_command)
                #say(mbot_r[s])
                print("Assistant : " + mbot_r[s])
                os.system(lirc_command) #發出開啟指令
                time.sleep(4)
                lirc_command = "irsend send_stop " + remote_name[RmN] + " KEY_" + mbot_m[3]   #關閉紅外線
                print(lirc_command)
                os.system(lirc_command) #發出關閉指令
            else:
                lirc_command = "irsend send_start " + remote_name[RmN] + " KEY_" + mbot_m[s]
                print(lirc_command)
                say(mbot_r[s])
                print("Assistant : " + mbot_r[s])
                os.system(lirc_command)
                time.sleep(1)
                lirc_command = "irsend send_stop " + remote_name[RmN] + " KEY_" + mbot_m[s]
                print(lirc_command)
                os.system(lirc_command)
            assistant.start_conversation() #重新回到等待狀態
        elif text in temp:
            #assistant.stop_conversation()
            t = temp.index(text)
            RmN = remote_name.index('temp')
            lirc_command = "irsend send_once " + remote_name[RmN] + " KEY_" + temp_m[t]
            print(lirc_command)
            say(temp_r[t])
            print("Assistant : " + temp_r[t])
            os.system(lirc_command)
            time.sleep(1)
            assistant.start_conversation()
        elif '再見' in text:
            global rc  #呼叫全域變數rc
            rc = text  #儲存助理原本要回覆的內容
    elif event.type == EventType.ON_RENDER_RESPONSE:
        text = rc      #text是助理要說的內容
        if '再見' in text:   #聽到再見的話
            global e
            e = 1           #將退出變數變成true
    elif event.type == EventType.ON_RESPONDING_FINISHED:
        if e == 1 :
            sys.exit(1)        #退出程式
    elif (event.type == EventType.ON_CONVERSATION_TURN_FINISHED 
          or event.type == EventType.ON_CONVERSATION_TURN_TIMEOUT
          or event.type == EventType.ON_NO_RESPONSE):
        led.state = Led.BEACON_DARK
    elif event.type == EventType.ON_ASSISTANT_ERROR and event.args and event.args['is_fatal']:
        print(event.args)
        sys.exit(1)        #發生錯誤也會退出
```
以下是main的部分
```
def main():   #主要用途是透過API金鑰將助理功能載入

    logging.basicConfig(level=logging.INFO)

    credentials = auth_helpers.get_assistant_credentials()
    with Board() as board, Assistant(credentials) as assistant:
        for event in assistant.start():
            process_event(board.led, assistant, event)  #用來與助理交流的函式呼叫

if __name__ == '__main__':
    main()
```
在編寫過程都是寫好就直接執行測式，修修改改，因為還只是一支程式算不上軟體，所以只有大改動時會留下備份檔案，以免想要退回，而下學期要整合時，可能就要先做測試檔，而非每次都直接執行來看錯誤在哪。<br>
以下是執行過程的截圖與影片<br>

![](https://github.com/kalen2019/topic/blob/main/demo/messageImage_1640553513364.jpg)<br>
![](https://github.com/kalen2019/topic/blob/main/demo/messageImage_1640553541683.jpg)<br>
![](https://github.com/kalen2019/topic/blob/main/demo/messageImage_1640553572531.jpg)<br>
![mbot](https://github.com/kalen2019/topic/blob/main/demo/mbot_demo.mp4)<br>
![temp](https://github.com/kalen2019/topic/blob/main/demo/temp_demo.mp4)<br>
