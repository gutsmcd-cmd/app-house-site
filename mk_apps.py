import json
G="https://gutsmcd-cmd.github.io/"
# id, room, en, ja, url, tags, enBlurb, jaBlurb, steps_en, steps_ja, extra
A=[
("onsei-nyuryoku","study","Voice Typing","音声入力",G+"onsei-nyuryoku/","AU","Speak and it becomes text, even with no signal.","話すと文字になる。電波がなくても。",["Tap the mic and allow it once","Talk normally; text appears as you speak","Copy the text into LINE, mail or notes"],["マイクを押して、一度だけ許可","ふつうに話すと文字が出る","LINEやメールにコピー"],{"new":"2026-10-25"}),
("three-things","study","Three Things","Three Things",G+"three-things/","","At most three must-do tasks for today.","今日やることを、最大3つ。",["Type up to three tasks","Tick them off as you go","Tomorrow starts fresh"],["やることを3つまで書く","終わったらチェック","明日はまっさらから"],{}),
("satto-memo","study","Quick Memo","さっとメモ",G+"satto-memo/","","A quick note that stays on the device.","端末に残る、すばやいメモ。",["Open and type right away","It saves by itself","Nothing leaves your phone"],["開いてすぐ書く","自動で保存","外には出ない"],{}),
("teikei-bun","study","My Common Phrases","定型ぶん",G+"teikei-bun/","","Reusable phrases, ready to copy.","よく使う文を、すぐコピー。",["Save the lines you type often","Tap one to copy it","Paste anywhere"],["よく打つ文を保存","タップでコピー","どこにでも貼る"],{}),
("poco-a-poco","study","Poco a Poco","ポコ・ア・ポコ",G+"poco-a-poco/","U","Offline Spanish for Japanese speakers.","日本語話者向けの、オフラインスペイン語。",["Pick a lesson","Listen and repeat","Works on the train with no signal"],["レッスンを選ぶ","聞いてまねる","電車の中でも使える"],{}),
("tabi-no-phrase","study","Travel Phrases","旅のフレーズ",G+"tabi-no-phrase/","","Travel lines you can show to someone.","現地の人に見せる旅行フレーズ。",["Pick a situation","Show the big phrase to the person","Tap to hear it"],["場面を選ぶ","大きな文字を相手に見せる","タップで音声"],{}),
("osaka-takken","study","Osaka Real Estate Study","大阪宅建",G+"osaka-takken/","U","A companion for learning real-estate work in Osaka.","大阪の不動産仕事を学ぶための伴走。",["Pick a topic","Read the short card","Quiz yourself"],["テーマを選ぶ","短いカードを読む","自分でクイズ"],{}),
("moji-kazoeru","study","Character Count","文字数はかる",G+"moji-kazoeru/","","Count characters without an account.","アカウントなしで文字数をはかる。",["Paste or type text","See the count live","Copy it back"],["文を貼るか打つ","文字数がすぐ出る","そのままコピー"],{}),
("zairyu-reminder","study","Residence Reminder","在留リマインダー",G+"zairyu-reminder/","U","A reminder for residence-card dates.","在留カードの期限を忘れないために。",["Enter your card's expiry date","See how long is left","Get the renewal window"],["カードの期限を入れる","残り日数を見る","更新できる時期がわかる"],{}),
("ato-nannichi","study","Days Left","あと何日",G+"ato-nannichi/","","How many days until a date.","その日まで、あと何日。",["Pick a date","See the days left","Add more dates"],["日付を選ぶ","あと何日か見る","いくつでも追加"],{}),
("giji-memo","study","Meeting Notes","議事メモ",G+"giji-memo/","","Fast notes for a meeting, with decisions and to-dos.","会議のメモ、決定とやることを素早く。",["Start a meeting","Type notes, mark decisions","Copy the summary"],["会議を始める","メモを打って決定に印","まとめをコピー"],{}),
("kanban-kami","study","To-Do Board","かんばん紙",G+"kanban-kami/","","A simple drag-and-drop task board.","ドラッグで動かす、シンプルなタスクボード。",["Add a card","Drag it across the columns","Done goes to the right"],["カードを追加","列の間をドラッグ","終わったら右へ"],{}),
("wakariyasuku","study","Make It Clear","わかりやすく",G+"wakariyasuku/","U","Turns hard text into plain, easy words.","むずかしい文を、わかりやすく。",["Paste a hard sentence","Tap to simplify","Read the plain version"],["むずかしい文を貼る","ボタンで言いかえ","やさしい文を読む"],{}),
("spell-camera","study","Spell Check Camera","スペルチェックカメラ",G+"spell-camera/","AU","Point the camera at English writing and see the mistakes marked.","英語の文にカメラを向けると、まちがいに印。",["Point the camera at handwriting or print","Hold still for a second","See errors marked with fixes"],["英語の文にカメラを向ける","少し止める","まちがいと直しが出る"],{}),
("long-shot","workshop","Long Shot","Long Shot",G+"long-shot/","AU","Stitch screenshots you already took into one tall image.","撮ってある画面を、縦長の1枚につなぐ。",["Pick your screenshots","It finds the overlap","Save one tall image"],["スクショを選ぶ","重なりを自動で見つける","縦長の1枚を保存"],{}),
("gazou-shiboru","workshop","Shrink Image","画像しぼる",G+"gazou-shiboru/","A","Make an image smaller before you send it.","送る前に、画像を小さく。",["Pick a photo","Choose a size","Save the smaller copy"],["写真を選ぶ","サイズを選ぶ","小さい版を保存"],{}),
("douga-shiboru","workshop","Video Shrinker","動画しぼる",G+"douga-shiboru/","A","Shrink a video so it's easy to send by LINE or email.","動画を小さくして、LINEやメールで送りやすく。",["Pick a video","Choose a size","Save and send"],["動画を選ぶ","サイズを選ぶ","保存して送る"],{"new":"2026-10-25"}),
("kukkiri","workshop","Photo Sharpener","くっきり",G+"kukkiri/","A","Enlarge small or blurry photos 2x or 4x, sharper.","小さい写真やぼけた写真を2倍・4倍でくっきり。",["Pick a small photo","Choose 2x or 4x","Save the sharper one"],["小さい写真を選ぶ","2倍か4倍","くっきり版を保存"],{"new":"2026-10-25"}),
("moms-photo-studio","workshop","Mom's Photo Studio","ママのフォトスタジオ",G+"moms-photo-studio/","","A simple, free photo editor for the phone.","スマホ用のかんたん写真編集。",["Open a photo","Crop, brighten, add filters","Save it"],["写真を開く","切り取り・明るさ・フィルター","保存"],{"new":"2026-10-25"}),
("collage-chou","workshop","Photo Collage","コラージュ帳",G+"collage-chou/","","Two to six photos, one collage.","写真2〜6枚を、1枚のコラージュに。",["Pick 2 to 6 photos","Choose a layout","Save the collage"],["写真を2〜6枚選ぶ","レイアウトを選ぶ","保存"],{}),
("pdf-ippatsu","workshop","PDF Joiner","PDF一発",G+"pdf-ippatsu/","A","Photos into one PDF, or PDFs joined in your order.","写真もPDFも、1つのPDFにまとめる。",["Add photos or PDFs","Drag them into order","Save one PDF"],["写真やPDFを追加","順番を並べる","1つのPDFを保存"],{}),
("in-wo-osu","workshop","Stamp & Sign","印を押す",G+"in-wo-osu/","AU","Put a seal or signature on a PDF or photo.","PDFや写真に、はんこやサインを押す。",["Open a PDF or photo","Draw a signature or make a hanko","Place it and save"],["PDFか写真を開く","サインやはんこを作る","置いて保存"],{}),
("loupe","workshop","Magnifier","ルーペ",G+"loupe/","","A camera magnifier for small print.","小さい文字のための、カメラのルーペ。",["Allow the camera","Pinch to zoom","Tap to freeze the picture"],["カメラを許可","ピンチで拡大","タップで止める"],{}),
("qr-ippatsu","workshop","QR Make & Scan","QR一発",G+"qr-ippatsu/","","Make or scan a QR code, on the device.","QRコードを、その場で作る・読む。",["Type a link or text","Get the QR code","Or scan one with the camera"],["リンクや文を入れる","QRができる","カメラで読むことも"],{}),
("mosaic-ippatsu","workshop","Blur Out","モザイク一発",G+"mosaic-ippatsu/","A","Blur part of a photo before it leaves the phone.","出す前に、写真の一部をぼかす。",["Open a photo","Rub over faces or numbers","Save the blurred copy"],["写真を開く","顔や番号をなぞる","ぼかした版を保存"],{}),
("yajirushi-ippatsu","workshop","Screenshot Arrows","矢印一発",G+"yajirushi-ippatsu/","","Drop an arrow on a picture.","写真に、矢印をひとつ。",["Open a screenshot","Drag to draw an arrow","Save and share"],["スクショを開く","ドラッグで矢印","保存して送る"],{}),
("moji-nose","workshop","Text on Photo","文字のせ",G+"moji-nose/","","Put words on a photo.","写真に文字をのせる。",["Open a photo","Type your words","Move, size and save"],["写真を開く","文字を打つ","動かして保存"],{}),
("keshigomu","workshop","Eraser","消しゴム",G+"keshigomu/","A","Rub out things you don't want in a photo.","写真の中の、いらないものを消す。",["Open a photo","Paint over the thing","It disappears; save"],["写真を開く","消したい所を塗る","消えたら保存"],{}),
("kirinuki","workshop","Cutout","切り抜き",G+"kirinuki/","A","Cut a person or thing out of the background.","人や物を、背景から切り抜く。",["Open a photo","It removes the background","Save a transparent PNG"],["写真を開く","背景が消える","透明PNGで保存"],{}),
("iroawase","workshop","Color Mix","色あわせ",G+"iroawase/","","Find and match colours.","色を見つけて、あわせる。",["Pick or snap a colour","See matching colours","Copy the codes"],["色を選ぶか撮る","合う色が出る","コードをコピー"],{}),
("black-screen","workshop","Black Screen","ブラック画面","https://github.com/gutsmcd-cmd/black-screen/releases","U","Black out the screen while video keeps playing. Android app.","動画はそのまま、画面だけ黒く。Androidアプリ。",["Download the APK on Android","Start your video, then tap Black","Tap twice to come back"],["AndroidでAPKをダウンロード","動画を流してブラックを押す","2回タップで戻る"],{"kind":"android"}),
("warikan","kitchen","Split Bill","わりかん",G+"warikan/","A","Split a bill without an account.","アカウントなしで、割り勘。",["Enter the total","Add people","See who pays what"],["合計を入れる","人数を入れる","一人いくらか出る"],{}),
("gomi-touban","kitchen","Trash Duty","ごみ当番",G+"gomi-touban/","","Whose turn it is to take the trash out.","ごみ出しは、誰の番か。",["Add the people","Set the days","See whose turn it is"],["メンバーを入れる","曜日を決める","今日の当番がわかる"],{}),
("tabi-no-mochimono","kitchen","Trip Packing","旅の持ち物",G+"tabi-no-mochimono/","","A packing list that works with the signal off.","電波がなくても使える、持ち物リスト。",["Pick a trip type","Tick items as you pack","Reuse it next time"],["旅の種類を選ぶ","詰めたらチェック","次回も使える"],{}),
("kaimono-memo","kitchen","Shopping List","買い物メモ",G+"kaimono-memo/","","A shopping list, nothing else.","買い物メモだけ。",["Add items","Tick them in the shop","Clear when done"],["品物を追加","店でチェック","終わったら消す"],{}),
("kitchen-timer","kitchen","Kitchen Timer","キッチンタイマー",G+"kitchen-timer/","","Several timers at once for cooking.","料理用の、いくつも同時タイマー。",["Set a time","Start more timers","It rings when done"],["時間を決める","いくつも動かせる","終わると鳴る"],{}),
("hakaru-dake","kitchen","Just Time","はかるだけ",G+"hakaru-dake/","","A stopwatch, nothing else.","ストップウォッチだけ。",["Tap start","Tap stop","Lap if you like"],["スタート","ストップ","ラップも"],{}),
("count-ippatsu","kitchen","Count Once","カウント一発",G+"count-ippatsu/","","A big tap counter.","大きなタップカウンター。",["Tap the big button","Watch the number","Reset any time"],["大きなボタンをタップ","数が増える","いつでもリセット"],{}),
("u74-picture-todo","kitchen","Picture To-Do","絵でやること",G+"u74-picture-todo/","U","A to-do list made of pictures, great for kids.","絵でつくるやることリスト。子どもにも。",["Pick a picture for each job","Put them in order","Tap when done"],["やることに絵を選ぶ","順番に並べる","できたらタップ"],{}),
("ask-all","lounge","Ask All","Ask All",G+"ask-all/","AU","Ask several free AIs at once and line the answers up.","いくつかの無料AIに同時に聞いて、答えを並べる。",["Type one question","It goes to several AIs","Compare the answers side by side"],["質問をひとつ打つ","いくつものAIに届く","答えを並べて比べる"],{}),
("ask-all-extension","lounge","Ask All (PC)","Ask All（PC）","https://github.com/gutsmcd-cmd/ask-all-extension","U","A Chrome extension that asks the AIs open in your tabs.","開いているタブのAIに、まとめて聞くChrome拡張。",["Download and load it in Chrome","Open your AI tabs","Ask once, all answer"],["ダウンロードしてChromeに入れる","AIのタブを開く","一度聞けば全部答える"],{"kind":"extension"}),
("one-tap-ask","lounge","One-Tap Ask","ワンタップ質問",G+"one-tap-ask/","U","Save a question, ask it with one tap.","質問を保存して、ワンタップで聞く。",["Save your favourite questions","Tap one","It opens the answer"],["よく聞く質問を保存","タップ","答えが開く"],{}),
("camera-honyaku","lounge","Camera Translator","カメラ翻訳",G+"camera-honyaku/","AU","Snap Japanese signs and papers and read them in English.","日本語の看板や書類を撮って、英語で読む。",["Point the camera at Japanese text","Snap","Read it in English"],["日本語にカメラを向ける","撮る","英語で読む"],{"new":"2026-10-25"}),
("deka-moji","lounge","Lyrics Enlarger","でか文字",G+"deka-moji/","U","Show lyrics or words huge across the screen.","歌詞や言葉を、画面いっぱいに大きく。",["Paste the words","It fills the screen","Scroll along"],["言葉を貼る","画面いっぱいに","スクロール"],{}),
("yomiage-ita","lounge","Simple Teleprompter","読み上げ板",G+"yomiage-ita/","","A scrolling script for talks and videos.","話す・撮るための、流れる原稿。",["Paste your script","Set the speed","Read as it scrolls"],["原稿を貼る","速さを決める","流れる文を読む"],{}),
("iki-wo-suu","lounge","Breathe","息を吸う",G+"iki-wo-suu/","","A calm breathing guide.","落ち着く呼吸ガイド。",["Press start","Breathe with the circle","Stop when calm"],["スタート","円に合わせて呼吸","落ち着いたら終わり"],{}),
("me-no-taisou","lounge","Eye Rest","目の体操","https://gutsmcd-cmd.github.io/dashboard/apps/me-no-taisou/index.html","U","A short eye exercise for screen breaks.","画面休憩の、短い目の体操。",["Press start","Follow the dot with your eyes","Done in a minute"],["スタート","点を目で追う","1分で終わり"],{}),
("u74-garden","game","Sakura Matcha Garden","桜抹茶ガーデン",G+"u74-garden/","U","A calm little garden to grow.","育てる、小さなおだやかな庭。",["Plant a seed","Water and wait","Watch it bloom"],["種をまく","水をやって待つ","咲くのを見る"],{}),
("offline-browser","attic","Offline Browser","オフラインブラウザ","","U","Android app: save web pages and read them with no signal.","Androidアプリ。ページを保存して電波なしで読む。",["Save a page while online","Open it later offline","Coming soon"],["電波がある時に保存","あとでオフラインで開く","近日公開"],{"soon":True,"kind":"android"}),
("redline","attic","Redline","赤ペン","","U","One photo, red proofreading marks, three suggested fixes.","写真1枚から、赤入れと直し案3つ。",["Snap a page","See red marks","Pick a fix"],["ページを撮る","赤い印が出る","直し案を選ぶ"],{"soon":True}),
("night-audit","attic","Night Audit","ナイト・オーディット","","U","A dark listening game.","暗い、聴く系のゲーム。",["Lights off","Headphones on","Listen"],["電気を消す","ヘッドホン","聴く"],{"soon":True}),
("koro-corgi","attic","Koro Corgi","コロ・コーギー","","","Short corgi films for your pocket.","ポケットサイズのコーギー短編。",["Coming soon"],["近日公開"],{"soon":True}),
]
apps=[]
for i,r,en,ja,url,tags,be,bj,se,sj,x in A:
  d={"id":i,"room":r,"name":{"en":en,"ja":ja},"blurb":{"en":be,"ja":bj},"url":url,
     "awesome":"A" in tags,"unique":"U" in tags,"steps":{"en":se,"ja":sj},"kind":x.get("kind","web")}
  if x.get("new"): d["added"]=x["new"]
  if x.get("soon"): d["soon"]=True
  apps.append(d)
json.dump({"updated":"2026-10-26","apps":apps},open("public/apps.json","w"),ensure_ascii=False,indent=1)
print(len(apps))
