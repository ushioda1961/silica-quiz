'use client'
import{useState,useEffect,useRef}from'react'
import{createClient}from'@supabase/supabase-js'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const MAX_SETS=2
const QS=[
{q:'ケイ素（シリカ）は体内でどんな役割をしますか？',o:['骨を硬くするだけ','コラーゲンを結びつけて弾力を作る','カルシウムを補給する','水分を排出する'],a:1,e:'ケイ素はコラーゲン・エラスチン・ヒアルロン酸を接着剤のように結びつけ、お肌や血管の弾力を保ちます。',d:'easy'},
{q:'日本人の何割がミネラル不足と言われていますか？',o:['約3割','約5割','約7割','約9割'],a:3,e:'日本人の約9割がミネラル不足と言われています。これが美容・健康の悩みにつながっています。',d:'easy'},
{q:'健康な人の血液のpH値として正しいものはどれですか？',o:['pH6.0（弱酸性）','pH7.0（中性）','pH7.4（弱アルカリ性）','pH8.0（アルカリ性）'],a:2,e:'健康な人の血液はpH7.4±0.05の弱アルカリ性に保たれています。',d:'easy'},
{q:'体温が1℃下がると免疫力はどのくらい低下しますか？',o:['約10%','約20%','約30%','約50%'],a:2,e:'体温が1℃下がると免疫力は約30%、代謝は約12%低下します。',d:'hard'},
{q:'ホワイトシリカを飲む場合の推奨希釈倍率は？',o:['10〜20倍','50倍','100〜200倍','500倍以上'],a:2,e:'ホワイトシリカは100〜200倍に希釈して飲むのが推奨されています。1日の目安は10〜20ccです。',d:'easy'},
{q:'水溶性ケイ素の精菌力とはどんな力ですか？',o:['菌を全部殺す力','菌のバランスを整える力','菌を増やす力','体を守るバリア'],a:1,e:'精菌力は菌を殺すのではなく、腸や肌の菌バランスを整える力です。殺菌力とは異なります。',d:'hard'},
{q:'美肌のために毎日心がけたい生活習慣として最も効果的なものはどれですか？',o:['長時間の日光浴','十分な睡眠・水分補給・バランスの良い食事','激しい運動のみ','高カロリーな食事'],a:1,e:'美肌の基本は十分な睡眠・こまめな水分補給・バランスの良い食事です。',d:'easy'},
{q:'腸内環境を整えるために効果的な食品はどれですか？',o:['加工食品・インスタント食品','発酵食品（味噌・醤油・納豆）・食物繊維','炭酸飲料・甘い菓子','脂っこい揚げ物'],a:1,e:'発酵食品や食物繊維は腸内の善玉菌を増やし腸内環境を整えます。腸は免疫の約70%を担う重要な臓器です。',d:'easy'},
{q:'ケイ素の抗酸化力を示す実験として正しいものはどれですか？',o:['ケイ素を加えると水が早く沸騰する','水道水にケイ素を10%加えると腐らず鉄も錆びない','ケイ素を加えると水が甘くなる','ケイ素で植物が早く育つ'],a:1,e:'水道水にケイ素を10%加えると水自体が腐らなくなり鉄も錆びません。5年・10年経っても酸化しない強力な抗酸化力があります。',d:'hard'},
{q:'体を温める陽性食品に分類されるものはどれですか？',o:['きゅうり・ナス・トマト','梅干し・発酵食品・根菜類','アイスクリーム・冷たい飲み物','生野菜サラダ'],a:1,e:'梅干し・発酵食品（味噌・醤油）・根菜類（ごぼう・れんこん）は体を温める陽性食品です。',d:'easy'},
{q:'爪がボコボコしたり縦筋が入る主な原因はどれですか？',o:['爪の切りすぎ','ケイ素不足による弾力低下','紫外線の浴びすぎ','水の飲みすぎ'],a:1,e:'爪のボコボコ・縦筋はケイ素不足のサインのひとつです。ケイ素は爪の弾力を支えています。',d:'easy'},
{q:'日焼け後の肌ケアとして正しいものはどれですか？',o:['すぐに熱いお風呂に入る','アルコール入り化粧水をたっぷりつける','冷やして炎症を抑えた後しっかり保湿する','放置してよい'],a:2,e:'日焼けは軽いやけどです。まず冷やして炎症を落ち着かせ、その後しっかり保湿することが大切です。',d:'easy'},
{q:'水分補給として最も体に良い飲み物はどれですか？',o:['砂糖入りジュース','カフェイン入りコーヒー','清潔な水（白湯や常温水）','炭酸飲料'],a:2,e:'体の約60%は水分でできています。こまめに清潔な水を飲むことが代謝・血流・肌の調子を整える基本です。',d:'easy'},
{q:'睡眠が不足すると肌に起こりやすいことはどれですか？',o:['肌が明るくなる','くすみ・乾燥・ニキビが起きやすくなる','毛穴が引き締まる','シミが薄くなる'],a:1,e:'睡眠中は成長ホルモンが分泌され肌の修復が行われます。睡眠不足は新陳代謝を妨げます。',d:'easy'},
{q:'ホワイトシリカを加熱するとどうなりますか？',o:['毒素が発生する','性質が変わらないので料理にも使える','効果がなくなる','色が変わる'],a:1,e:'ホワイトシリカは加熱しても性質が変わりません。料理に加えて加熱調理することもできます。',d:'easy'},
{q:'シリカゲル（乾燥剤）はどんな物質でできていますか？',o:['炭素','カルシウム','ケイ素（シリカ）','マグネシウム'],a:2,e:'お菓子などに入っている乾燥剤シリカゲルはケイ素（Silica）でできています。ケイ素の無数の穴に水分を吸着します。',d:'hard'},
{q:'血液を弱アルカリ性に保つために効果的な食品はどれですか？',o:['砂糖・白米・お肉','大根・にんじん・根菜類','コーヒー・お酒・チョコレート','牛乳・乳製品'],a:1,e:'大根・にんじん・れんこんなどの根菜類はアルカリ性食品で血液をきれいにする働きがあります。',d:'easy'},
{q:'ケイ素の脂肪溶解力の実験で確認できることはどれですか？',o:['水と脂が完全に分離する','ケイ素を加えると水と脂が乳化して長期間固まらない','脂がより固まる','水が蒸発する'],a:1,e:'ケイ素を加えると水と脂が乳化（エマルジョン化）し1ヶ月経っても固まりません。血管内のプラーク防止にも期待されます。',d:'hard'},
{q:'食物繊維やケイ素が特に多く含まれる食材の部位はどこですか？',o:['果肉の中心','種の部分','皮の部分','根の先端'],a:2,e:'食物繊維やケイ素は主に皮の部分に多く含まれています。現代食では皮を除くことが多く不足しがちです。',d:'easy'},
{q:'髪の毛を健康に保つために特に重要なミネラルはどれですか？',o:['ナトリウム','塩素','ケイ素（シリカ）','リン'],a:2,e:'ケイ素は髪・爪・肌の弾力を作る重要なミネラルです。不足すると白髪・脱毛・爪のトラブルが起きやすくなります。',d:'hard'},
{q:'1日の適切な水分摂取量として正しいものはどれですか？',o:['約500ml','約1〜1.5L','約2〜2.5L','約4L以上'],a:2,e:'成人の1日の推奨水分摂取量は約2〜2.5Lです。食事からの水分も含みますが、飲み水として1.5〜2L程度を目安にしましょう。',d:'easy'},
{q:'肌の主な構造として正しいものはどれですか？',o:['表皮・真皮・皮下組織の3層','表皮・皮下組織の2層','真皮のみの1層','表皮・真皮・骨の3層'],a:0,e:'肌は外側から表皮・真皮・皮下組織の3層で構成されています。ケイ素は真皮のコラーゲンを支える働きがあります。',d:'hard'},
{q:'コラーゲンの主成分はどのアミノ酸ですか？',o:['グリシン・プロリン・ヒドロキシプロリン','バリン・ロイシン・イソロイシン','トリプトファン・フェニルアラニン・チロシン','リジン・アルギニン・ヒスチジン'],a:0,e:'コラーゲンの約30〜35%はグリシン、10〜15%はプロリンとヒドロキシプロリンで構成されています。ケイ素はこれらを繋ぎ止める役割があります。',d:'hard'},
{q:'ターンオーバー（肌の生まれ変わり）のサイクルは約何日ですか？',o:['約7日','約28日','約60日','約100日'],a:1,e:'健康な成人の肌ターンオーバーは約28日です。年齢とともに遅くなり、乱れるとくすみや乾燥の原因になります。',d:'easy'},
{q:'紫外線で引き起こされる肌ダメージとして正しいものはどれですか？',o:['肌が厚くなる','シミ・シワ・たるみ・皮膚がんリスク増加','肌の保湿力が上がる','コラーゲンが増える'],a:1,e:'紫外線（特にUVA・UVB）は肌のコラーゲンを破壊し、シミ・シワ・たるみ・皮膚がんリスクを高めます。日焼け止めが重要です。',d:'easy'},
{q:'乾燥肌対策として最も効果的なスキンケアの順番はどれですか？',o:['化粧水→美容液→乳液→クリーム','クリーム→化粧水→乳液','乳液→化粧水→美容液','クリーム→美容液→化粧水'],a:0,e:'スキンケアは水分から油分へ、化粧水→美容液→乳液→クリームの順が基本です。水分を閉じ込める順番が大切です。',d:'easy'},
{q:'ヒアルロン酸の特徴として正しいものはどれですか？',o:['水分を全く保持しない','自重の約6000倍の水分を保持できる','油分のみを保持する','体内では作られない'],a:1,e:'ヒアルロン酸は自重の約6000倍の水分を保持できる保湿成分です。ケイ素はこのヒアルロン酸を体内で繋ぎ止める働きがあります。',d:'hard'},
{q:'白髪が増える主な原因はどれですか？',o:['水の飲みすぎ','メラノサイトの機能低下と栄養不足','睡眠が多すぎること','運動不足'],a:1,e:'白髪はメラニン色素を作るメラノサイトの機能低下が主因です。ケイ素・亜鉛・ビタミンBなどの栄養不足も関係します。',d:'easy'},
{q:'頭皮の健康を保つために重要な生活習慣はどれですか？',o:['毎日シャンプーを大量に使う','バランスの良い食事と頭皮マッサージ','ドライヤーを使わず自然乾燥のみ','帽子を常時着用する'],a:1,e:'頭皮の健康にはバランスの良い食事でミネラルを補給することと、血行を促進する頭皮マッサージが効果的です。',d:'easy'},
{q:'セラミドの主な働きはどれですか？',o:['肌に色をつける','肌のバリア機能を保ち水分の蒸発を防ぐ','皮脂を増やす','コラーゲンを分解する'],a:1,e:'セラミドは肌の角質層に存在し、細胞間の隙間を埋めてバリア機能を保ちます。肌から水分が逃げるのを防ぐ重要な成分です。',d:'hard'},
{q:'抗酸化作用を持つ食材として正しいものはどれですか？',o:['砂糖・白い小麦粉','ブルーベリー・緑茶・トマト','揚げ物・加工食品','アルコール飲料'],a:1,e:'ブルーベリー（アントシアニン）・緑茶（カテキン）・トマト（リコピン）などは強力な抗酸化作用を持ちます。活性酸素から体を守ります。',d:'easy'},
{q:'骨の主成分として正しいものはどれですか？',o:['コラーゲンのみ','カルシウム・リン・コラーゲン・ケイ素'],a:1,e:'骨はカルシウム・リン・コラーゲン・ケイ素など複数の成分で構成されています。ケイ素はコラーゲンの骨格を作る重要な役割があります。',d:'hard'},
{q:'活性酸素が体内で増えすぎると何が起こりますか？',o:['免疫力が上がる','老化・炎症・生活習慣病リスクが高まる','肌のツヤが増す','骨が強くなる'],a:1,e:'活性酸素が過剰になると細胞や遺伝子を傷つけ、老化・炎症・生活習慣病（がん・動脈硬化など）のリスクが高まります。',d:'easy'},
{q:'免疫細胞の約70%が存在する臓器はどこですか？',o:['肺','心臓','腸','肝臓'],a:2,e:'免疫細胞の約70%は腸に集まっています。腸内環境を整えることが免疫力強化の最重要ポイントです。',d:'easy'},
{q:'体内時計（サーカディアンリズム）のサイクルは約何時間ですか？',o:['12時間','24時間','36時間','48時間'],a:1,e:'体内時計は約24時間のサイクルで動いています。規則正しい生活習慣でリズムを整えることが健康・美容の基本です。',d:'easy'},
{q:'ストレスが肌に与える影響として正しいものはどれですか？',o:['肌のターンオーバーが促進される','コルチゾール分泌増加でニキビ・乾燥・くすみが悪化する','肌の保湿力が上がる','シワが減る'],a:1,e:'ストレスでコルチゾール（ストレスホルモン）が増加すると皮脂分泌が乱れ、ニキビ・乾燥・くすみ・炎症が悪化します。',d:'hard'},
{q:'血行を促進して肌荒れを改善する方法として最も効果的なものはどれですか？',o:['冷水のみで洗顔する','適度な運動・入浴・温かい食事を取り入れる','長時間の断食をする','室内で全く動かない'],a:1,e:'適度な運動・入浴・生姜や根菜など温める食事は血行を促進し、肌の栄養と酸素の供給を増やして肌荒れ改善に効果的です。',d:'easy'},
{q:'ケイ素が特に豊富に含まれている食材はどれですか？',o:['白米・精製小麦','全粒穀物・玄米・竹・ひえ・あわ','お菓子・インスタント食品','肉類・乳製品'],a:1,e:'ケイ素は全粒穀物・玄米・竹・ひえ・あわなどの未精製食品に豊富です。精製加工で失われるため、現代食では不足しがちです。',d:'hard'},
{q:'肌の保湿に欠かせない天然保湿因子（NMF）の主成分はどれですか？',o:['カルシウム','アミノ酸・乳酸・尿素など','ビタミンC','鉄分'],a:1,e:'天然保湿因子（NMF）はアミノ酸（約40%）・乳酸・尿素・ミネラルなどで構成され、肌内部から水分を保持します。',d:'hard'},
{q:'腸内の善玉菌を増やすためにとると良い食品（プレバイオティクス）はどれですか？',o:['肉類・卵','食物繊維・オリゴ糖を多く含む食品','砂糖・添加物の多い食品','アルコール'],a:1,e:'善玉菌のエサとなるプレバイオティクスは食物繊維（野菜・豆・全粒穀物）やオリゴ糖（バナナ・玉ねぎ）に豊富です。',d:'easy'},
{q:'良質な睡眠のために就寝前に避けるべきことはどれですか？',o:['ぬるめのお風呂','軽いストレッチ','スマートフォンやパソコンの強い光','暗くした部屋での読書'],a:2,e:'スマートフォンのブルーライトはメラトニン（睡眠ホルモン）の分泌を抑制し、睡眠の質を下げます。就寝1時間前は画面を見ない習慣を。',d:'easy'},
{q:'デトックス（解毒）を担う主な臓器はどれですか？',o:['心臓・肺','肝臓・腎臓・皮膚','骨・筋肉','脳・脊髄'],a:1,e:'肝臓は最大のデトックス臓器で化学物質・アルコール・老廃物を解毒します。腎臓は老廃物を尿として排出し、皮膚も汗で排出します。',d:'easy'},
{q:'ケイ素（シリカ）が体内で減少し始めるのは一般的に何歳頃からですか？',o:['10代','20代','40代','70代'],a:1,e:'ケイ素は20代をピークに徐々に減少し始め、40〜50代で急激に低下します。これが老化現象の一因と考えられています。',d:'hard'},
{q:'エラスチンの主な働きはどれですか？',o:['肌に色素を与える','肌や血管の弾力・伸縮性を保つ','骨を硬くする','免疫を高める'],a:1,e:'エラスチンはゴムのように伸び縮みする弾力繊維で、肌・血管・肺・腱の弾力を保ちます。ケイ素はエラスチンを繋ぐ役割があります。',d:'hard'},
{q:'善玉コレステロール（HDL）を増やすために効果的な生活習慣はどれですか？',o:['座りっぱなしの生活','有酸素運動（ウォーキング・水泳・ジョギング）','高脂肪食・喫煙','アルコールの大量摂取'],a:1,e:'有酸素運動はHDLコレステロールを増やし、動脈硬化予防に効果的です。1日30分のウォーキングが目安です。',d:'easy'},
{q:'ビタミンCの主な働きとして正しいものはどれですか？',o:['骨を溶かす','コラーゲン合成促進・抗酸化作用・免疫強化','睡眠を妨げる','体脂肪を増やす'],a:1,e:'ビタミンCはコラーゲン合成に不可欠で、抗酸化作用・免疫強化・鉄分吸収促進にも働きます。ケイ素と組み合わせると美肌効果が高まります。',d:'easy'},
{q:'ホメオスタシス（恒常性）とは何ですか？',o:['体温・血糖・血圧などを一定に保つ体の仕組み','食欲を増やす仕組み','筋肉を増強する仕組み','骨を溶かす仕組み'],a:0,e:'ホメオスタシスは体温・血糖・血圧・pH などを一定に保つ生体の自動調節機能です。ミネラルバランスがこれを支えています。',d:'hard'},
{q:'亜鉛が不足するとどうなりますか？',o:['骨が柔らかくなる','味覚障害・免疫低下・肌荒れ・抜け毛が起こる','視力が上がる','血糖値が下がる'],a:1,e:'亜鉛不足は味覚障害・免疫機能低下・肌荒れ・傷の治りの遅延・抜け毛を引き起こします。ケイ素との相乗効果で美容・健康に働きます。',d:'easy'},
{q:'マグネシウムの主な働きとして正しいものはどれですか？',o:['脂肪を増やす','300種以上の酵素反応に関与し筋肉・神経・骨を支える','血液を酸性にする','睡眠を妨げる'],a:1,e:'マグネシウムは300種以上の酵素反応に必要で、筋肉収縮・神経伝達・骨形成・血糖コントロールに関与します。日本人に不足しがちなミネラルです。',d:'hard'},
{q:'リンパの主な働きはどれですか？',o:['酸素を運ぶ','老廃物・余分な水分の回収と免疫機能を担う','消化を促進する','ホルモンを分泌する'],a:1,e:'リンパは血管から漏れた老廃物・余分な水分を回収し静脈に戻します。免疫細胞を含み感染防御にも重要です。',d:'easy'},
{q:'酵素（エンザイム）の主な役割はどれですか？',o:['体内の化学反応を促進する触媒','エネルギーを蓄える','骨を形成する','血糖値を上げる'],a:0,e:'酵素は消化・代謝・解毒など体内のあらゆる化学反応の触媒です。ミネラル（ケイ素・亜鉛・マグネシウムなど）は酵素の補因子として機能します。',d:'hard'},
{q:'冷え性の改善に効果的な食材はどれですか？',o:['きゅうり・なす・スイカ（体を冷やす）','生姜・ネギ・唐辛子・根菜類（体を温める）','アイスクリーム・冷たい飲み物','生野菜のみのサラダ'],a:1,e:'生姜・ネギ・唐辛子・根菜類（ごぼう・れんこん・にんじん）は体を温める陽性食品です。冷え性改善に積極的に取り入れましょう。',d:'easy'},
{q:'成長ホルモンが最も多く分泌されるのはいつですか？',o:['食後すぐ','深い睡眠（ノンレム睡眠）中・入眠後1〜2時間','起床直後','運動前'],a:1,e:'成長ホルモンは入眠後1〜2時間の深い睡眠（ノンレム睡眠）中に最も多く分泌されます。肌の修復・筋肉の回復・脂肪燃焼を促します。',d:'hard'},
{q:'砂糖の過剰摂取が肌に与える悪影響はどれですか？',o:['肌のツヤが増す','糖化（AGEs生成）によりコラーゲンが劣化しシワ・くすみが増える','保湿力が上がる','ターンオーバーが促進される'],a:1,e:'砂糖の過剰摂取はAGEs（終末糖化産物）を生成し、コラーゲン・エラスチンを劣化させます。シワ・くすみ・たるみの原因になります。',d:'hard'},
{q:'オメガ3脂肪酸（EPA・DHA）の主な働きはどれですか？',o:['体脂肪を増やす','炎症を抑え血液サラサラ・脳機能・肌バリアを改善する','骨を溶かす','血糖値を上げる'],a:1,e:'EPA・DHA（青魚に豊富）は炎症を抑え、血液をサラサラにし、脳機能改善・アトピー改善・肌バリア強化に働きます。',d:'hard'},
{q:'白米を玄米に変えると得られる主なメリットはどれですか？',o:['カロリーが大幅に増える','食物繊維・ミネラル（ケイ素・マグネシウム・亜鉛）・ビタミンBが豊富になる','消化が速くなる','血糖値が急激に上がる'],a:1,e:'玄米は白米より食物繊維・ミネラル・ビタミンBが格段に豊富です。特にケイ素・マグネシウム・亜鉛を多く含みます。',d:'easy'},
{q:'腸のぜん動運動を活発にするために効果的な食品はどれですか？',o:['白米・うどん・食パン（低繊維）','食物繊維豊富な野菜・豆・海藻・全粒穀物','アルコール飲料','炭酸飲料のみ'],a:1,e:'腸のぜん動運動には食物繊維が必須です。水溶性（海藻・果物）と不溶性（野菜・豆・全粒穀物）の両方をバランスよく摂りましょう。',d:'easy'},
{q:'ケイ素と一緒に摂ると吸収率が上がる栄養素はどれですか？',o:['砂糖・アルコール','ビタミンC・マグネシウム・水','人工甘味料','加工油脂'],a:1,e:'ケイ素はビタミンC・マグネシウムと相乗効果があります。また十分な水分補給で吸収が促進されます。食事と一緒に取るのが理想的です。',d:'hard'},
{q:'プロバイオティクスとして代表的な食品はどれですか？',o:['白砂糖・精製食品','ヨーグルト・ぬか漬け・キムチ・味噌・納豆','アルコール飲料','揚げ物・加工食品'],a:1,e:'プロバイオティクスは生きた有益な微生物です。ヨーグルト・ぬか漬け・キムチ・味噌・納豆などの発酵食品に豊富です。',d:'easy'},
{q:'毛細血管の健康を保つために重要な成分はどれですか？',o:['砂糖・精製炭水化物','ケイ素・ビタミンC・ルチン（そばに含まれる）','アルコール','加工食品の添加物'],a:1,e:'毛細血管の壁はコラーゲン・エラスチンで構成されケイ素が支えます。ビタミンCとルチン（そば・野菜）は毛細血管を強化します。',d:'hard'},
{q:'むくみの主な原因はどれですか？',o:['水を全く飲まないこと','塩分過多・長時間の同姿勢・リンパ流れの停滞','運動しすぎること','睡眠が多すぎること'],a:1,e:'むくみは塩分過多・長時間の座り仕事や立ち仕事・リンパの流れ停滞が主因です。適度な運動・水分補給・マッサージで改善できます。',d:'easy'},
{q:'皮脂の主な役割はどれですか？',o:['肌の色素を作る','肌の表面を覆い水分蒸発を防ぎ外部刺激から守る','ターンオーバーを遅らせる','コラーゲンを分解する'],a:1,e:'皮脂は汗と混じって皮脂膜を形成し、肌の水分蒸発を防ぎ外部刺激・細菌から守るバリアになります。過多でも不足でも肌荒れの原因に。',d:'easy'},
{q:'カルシウムの吸収を助けるために必要なビタミンはどれですか？',o:['ビタミンB1','ビタミンD','ビタミンK','ビタミンE'],a:1,e:'ビタミンDはカルシウムの腸からの吸収を促進します。日光浴でも体内で生成されます。ケイ素・カルシウム・ビタミンDは骨の健康に三位一体で働きます。',d:'easy'},
{q:'基礎代謝が最も高い部位（組織）はどれですか？',o:['脂肪組織','骨格筋（筋肉）','皮膚','骨'],a:1,e:'基礎代謝の約40%は筋肉が占めます。筋肉量を増やすことで基礎代謝が上がり、太りにくい体になります。',d:'hard'},
{q:'ホワイトシリカを化粧水に混ぜて使う場合のメリットはどれですか？',o:['化粧水が固まって使いにくくなる','浸透力が高まりスキンケア効果が上がる','化粧水の成分が壊れる','肌が赤くなる'],a:1,e:'ホワイトシリカを化粧水に数滴混ぜることで浸透力が高まります。水溶性のため他の成分との相性も良く、日常スキンケアに取り入れやすいです。',d:'easy'},
{q:'「活性酸素」を除去する体内の防御システムで正しいものはどれですか？',o:['体内に防御システムはない','SOD（スーパーオキシドジスムターゼ）などの抗酸化酵素が働く','活性酸素は除去できない','砂糖が活性酸素を除去する'],a:1,e:'体内ではSOD（スーパーオキシドジスムターゼ）などの抗酸化酵素が活性酸素を分解します。ミネラル（亜鉛・マグネシウムなど）がこの酵素の補因子として機能します。',d:'hard'},
{q:'花粉症などのアレルギー反応が起こる仕組みとして正しいものはどれですか？',o:['免疫が全く反応しない','免疫が過剰に反応し花粉などの無害な物質に過剰応答する','免疫が低すぎることで起こる','骨が弱くなることで起こる'],a:1,e:'アレルギーは免疫の過剰反応です。腸内環境を整えることで免疫バランスが改善し、アレルギー症状の緩和に繋がることがあります。',d:'easy'},
{q:'ケイ素が血管の健康に与える効果で正しいものはどれですか？',o:['血管を硬くする','血管の弾力を保ちコレステロールの沈着を防ぐ効果が期待される','血液を酸性にする','血管を収縮させる'],a:1,e:'ケイ素は血管壁のコラーゲン・エラスチンを支え弾力を保ちます。また脂肪溶解力によりコレステロールの沈着（動脈硬化）を防ぐ効果が期待されます。',d:'hard'},
{q:'「腸漏れ（リーキーガット）」が起こると何が問題ですか？',o:['腸から栄養が全く吸収されなくなる','腸の細胞間の隙間から未消化物や毒素が血液に入り全身炎症の原因になる','骨が溶ける','視力が低下する'],a:1,e:'リーキーガットは腸壁の細胞間隙が広がり有害物質が血液に漏れる状態です。全身炎症・アレルギー・自己免疫疾患・肌荒れの一因となります。',d:'hard'},
{q:'就寝前に食べると良くない理由はどれですか？',o:['夜は消化酵素が多く出るから良い','睡眠中は代謝が下がり脂肪として蓄積されやすく睡眠の質も下がるから','夜は胃が空になるから','夜は体温が上がるから'],a:1,e:'就寝前3時間以内の食事は消化活動が睡眠を妨げ、成長ホルモン分泌を低下させます。脂肪蓄積にも繋がります。夕食は早めに済ませましょう。',d:'easy'},
{q:'ケイ素（シリカ）が持つ「触媒作用」とはどんな働きですか？',o:['体内の酵素反応を遅らせる','他の栄養素の働きを活性化し体内の化学反応を促進する','体温を下げる','血糖値を上げる'],a:1,e:'ケイ素は触媒として他のミネラル・ビタミンの働きを活性化します。カルシウム・マグネシウム・亜鉛などが本来の機能を発揮するのをサポートします。',d:'hard'},
{q:'汗の主な成分はどれですか？',o:['純粋な水のみ','水・塩化ナトリウム（塩分）・乳酸・アミノ酸など','砂糖・脂肪','アルコール'],a:1,e:'汗は約99%が水で、塩化ナトリウム・乳酸・アミノ酸・ミネラルなどを含みます。大量に汗をかいたときは水分とミネラルの補給が必要です。',d:'easy'},
{q:'「インナービューティー」とはどんな考え方ですか？',o:['外側のメイクだけで美しくなる','体の内側から栄養・腸内環境・ホルモンバランスを整えて美しくなる','サプリメントのみで美しくなる','睡眠を減らして活動量を上げる'],a:1,e:'インナービューティーは食事・腸活・ミネラル補給・睡眠・ストレス管理など内側から美しさを作る考え方です。シリカ製品もこの考え方と親和性があります。',d:'easy'},
{q:'水溶性ケイ素を毎日続けて飲むことで期待される効果として正しいものはどれですか？',o:['1回飲めば永続的な効果がある','継続することで体内ケイ素レベルが維持されコラーゲン生成・デトックス・抗酸化が持続的にサポートされる','飲みすぎると骨が溶ける','効果は全くない'],a:1,e:'水溶性ケイ素は継続して摂ることが大切です。体内では毎日消費されるため、毎日補給することでコラーゲン生成・抗酸化・デトックスのサポートが持続します。',d:'easy'},
{q:'お風呂（入浴）が美容・健康に良い主な理由はどれですか？',o:['体温が上がりすぎるだけ','血行促進・デトックス（汗による排出）・副交感神経優位でリラックス効果がある','消化が悪くなる','睡眠の質が下がる'],a:1,e:'入浴で体が温まると血行が促進され老廃物の排出が加速します。また副交感神経が優位になりリラックスでき、睡眠の質も上がります。',d:'easy'},
{q:'スキンケア成分「レチノール」の主な効果はどれですか？',o:['肌を乾燥させる','ターンオーバー促進・シワ改善・コラーゲン生成促進','肌を厚くしすぎる','毛穴を広げる'],a:1,e:'レチノール（ビタミンA誘導体）はターンオーバーを促進しシワ・シミ・毛穴を改善する強力な成分です。使い始めはいきなりの高濃度を避けましょう。',d:'hard'},
{q:'「腸活」として効果的な組み合わせはどれですか？',o:['お酒と砂糖の多いお菓子','ヨーグルト（プロバイオティクス）＋バナナ（プレバイオティクス）','精製食品とファーストフード','添加物の多い加工食品'],a:1,e:'プロバイオティクス（ヨーグルト・納豆・ぬか漬け）とプレバイオティクス（食物繊維・オリゴ糖）を組み合わせる「シンバイオティクス」が腸活に最効果的です。',d:'easy'},
{q:'ホワイトシリカをお風呂に入れて使う場合の効果として期待されるものはどれですか？',o:['お湯が冷たくなる','肌への浸透でしっとり感アップ・抗酸化・デトックスのサポート','お湯が固まる','肌が荒れる'],a:1,e:'ホワイトシリカを入浴剤として使うことで肌への浸透を通じてしっとり感・抗酸化・デトックス効果が期待できます。シリカ温泉の効果を自宅で体験できます。',d:'easy'},
{q:'「血糖値スパイク」とは何ですか？',o:['血糖値が緩やかに上昇すること','食後に血糖値が急激に上昇・急降下すること','血糖値が常に低い状態','血糖値が全く変わらない状態'],a:1,e:'血糖値スパイクは食後の急激な血糖上昇と急降下のことです。AGEs生成による老化・眠気・集中力低下・肥満の原因になります。食物繊維を先に食べる「ベジファースト」で緩和できます。',d:'hard'},
{q:'「ミネラルウォーター」の「硬水」と「軟水」の違いとして正しいものはどれですか？',o:['色が違う','カルシウム・マグネシウムの含有量で分類され硬水はミネラルが豊富','温度が違う','製造方法のみが違う'],a:1,e:'硬水はカルシウム・マグネシウムが多く（硬度120mg/L以上）、軟水は少ない（硬度60mg/L未満）水です。欧州の硬水はミネラル補給に優れ、日本の水道水は軟水が多いです。',d:'easy'},
{q:'リンパマッサージが美容・健康に良い主な理由はどれですか？',o:['骨を強くする','リンパの流れを改善しむくみ解消・老廃物排出・免疫活性化を促す','皮脂を増やす','ターンオーバーを遅らせる'],a:1,e:'リンパマッサージでリンパの流れが改善するとむくみが解消し老廃物の排出が促進されます。免疫細胞を含むリンパ節の活性化も期待できます。',d:'easy'},
{q:'ケイ素が関節に対して期待される効果はどれですか？',o:['関節を硬直させる','軟骨・腱・靭帯のコラーゲンを支え柔軟性・クッション性を保つ','関節液を減らす','骨を溶かす'],a:1,e:'ケイ素は軟骨・腱・靭帯に含まれるコラーゲンを支え関節の柔軟性とクッション性を保ちます。関節の摩耗や痛みの予防に期待されています。',d:'hard'},
{q:'水を正しく飲む方法として最も健康的なものはどれですか？',o:['1日1杯をまとめて飲む','1日を通してこまめに（一度に200ml程度を数回）飲む','食事中のみ飲む','夜だけ大量に飲む'],a:1,e:'水は一度に大量に飲むより、1日を通してこまめに200ml程度を数回に分けて飲むのが理想的です。朝起きたら1杯飲む習慣も効果的です。',d:'easy'},
{q:'美容・健康に悪影響を与えるトランス脂肪酸が多い食品はどれですか？',o:['青魚・ナッツ類・亜麻仁油','マーガリン・ショートニングを使ったパンやお菓子・揚げ物（繰り返し使用した油）','オリーブオイル・ごま油','アボカド・チーズ'],a:1,e:'トランス脂肪酸は心臓病リスクを高め炎症を促進します。マーガリン・ショートニング・繰り返し加熱した油に多く、加工食品やファーストフードに含まれます。',d:'hard'},
{q:'「免疫力を高める」ために最も基本的に大切なことはどれですか？',o:['薬を大量に飲む','睡眠・栄養バランス・適度な運動・ストレス管理の4つの生活習慣を整える','サプリメントだけ飲む','ひたすら安静にする'],a:1,e:'免疫力強化の基本は十分な睡眠・栄養バランスの良い食事・適度な運動・ストレス管理です。これらが整って初めてサプリメントの効果も高まります。',d:'easy'},
{q:'アポクリン汗腺（体臭に関係する汗腺）が多く分布している部位はどれですか？',o:['手のひら・足の裏','脇の下・耳の中・陰部などの特定部位','鼻・口','指先'],a:1,e:'アポクリン汗腺は脇・耳・陰部などに多く、皮脂腺と連動してニオイの原因物質を分泌します。エクリン汗腺（全身）とは異なる種類の汗腺です。',d:'hard'},
{q:'ケイ素が歯と歯茎の健康に与える効果で正しいものはどれですか？',o:['歯を溶かす','歯のエナメル質・歯茎のコラーゲンを支えて歯周病予防に期待される','口臭を悪化させる','歯を黄色くする'],a:1,e:'歯のエナメル質にはケイ素が含まれ、歯茎のコラーゲン繊維もケイ素が支えています。歯周病予防や歯の再石灰化促進への効果が期待されています。',d:'hard'},
{q:'「食べる順番ダイエット」で正しい順番はどれですか？',o:['ご飯→肉→野菜','野菜・スープ→たんぱく質→炭水化物（ベジファースト）','デザート→ご飯→おかず','炭水化物→野菜→たんぱく質'],a:1,e:'野菜・スープ→たんぱく質→炭水化物の順に食べると食物繊維が先に腸に届き、血糖値スパイクを抑え満腹感も得やすくなります。',d:'easy'},
{q:'肌の「くすみ」の主な原因はどれですか？',o:['水分の取りすぎ','ターンオーバーの乱れ・血行不良・糖化・酸化・メラニンの蓄積'],a:1,e:'くすみは複合的な原因で起こります。ターンオーバーの乱れ・血行不良・糖化（AGEs）・酸化ダメージ・メラニン沈着などが重なることで肌がくすみます。',d:'easy'},
{q:'シリカ（ケイ素）の元素記号として正しいものはどれですか？',o:['Ca（カルシウム）','Si（シリコン）','Fe（鉄）','Zn（亜鉛）'],a:1,e:'ケイ素の元素記号はSi（Silicon/シリコン）です。地球の地殻では酸素に次いで2番目に多い元素で、鉱物・ガラス・半導体にも使われます。',d:'hard'},
{q:'「ファスティング（断食）」が健康に良いとされる理由はどれですか？',o:['栄養を全く摂らないので体が弱くなる','オートファジー（細胞の自己修復機能）が活性化し老廃物が除去される','血糖値が急上昇する','免疫力が下がる'],a:1,e:'ファスティング中はオートファジーが活性化され、損傷した細胞成分が自己消化・再利用されます。適切な指導のもとで行う短期断食は細胞レベルでの若返りに期待されます。',d:'hard'},
{q:'肌の「毛穴の黒ずみ」の主な原因はどれですか？',o:['水分の過剰摂取','酸化した皮脂・汚れ・古い角質が毛穴に詰まること','ケイ素の過剰摂取','睡眠が多すぎること'],a:1,e:'毛穴の黒ずみは酸化した皮脂（角栓）・汚れ・古い角質が詰まり空気に触れて酸化したものです。丁寧なクレンジングと保湿でターンオーバーを整えることが改善の基本です。',d:'easy'},
{q:'「副腎疲労」が起こる主な原因はどれですか？',o:['運動をしすぎること','慢性的なストレス・睡眠不足・栄養不足で副腎が疲弊すること','水分の過剰摂取','カルシウムの不足'],a:1,e:'副腎は抗ストレスホルモン（コルチゾール）を分泌しますが、慢性ストレス・睡眠不足・栄養不足が続くと疲弊します。結果として疲労・免疫低下・肌荒れが起こります。',d:'hard'},
{q:'ケイ素が豊富な「シリカ温泉」の効果として知られているものはどれですか？',o:['肌が荒れる','皮膚のコラーゲンに作用してつるつる肌・保湿効果が期待される','体温が下がる','髪が抜けやすくなる'],a:1,e:'シリカ（ケイ素）を豊富に含む温泉（別府・阿蘇など）は「美人の湯」として知られます。皮膚のコラーゲンへの作用でつるつるとした肌感とすぐれた保湿効果が期待されます。',d:'easy'},
{q:'「テロメア」と老化の関係として正しいものはどれですか？',o:['テロメアが長くなるほど老化が進む','細胞分裂のたびにテロメアが短くなり限界になると細胞が老化・死滅する','テロメアは老化と無関係','テロメアは生まれてから変化しない'],a:1,e:'テロメアは染色体の末端にあるキャップ構造で、細胞分裂のたびに短くなります。短くなりすぎると細胞老化・死滅が起こります。抗酸化物質・適度な運動・良質な睡眠でテロメアを保護できます。',d:'hard'},
{q:'「インターミッテントファスティング（16時間断食）」の主な効果として正しいものはどれですか？',o:['筋肉量が急激に増える','インスリン感受性改善・脂肪燃焼促進・オートファジー活性化が期待される','血糖値が急上昇する','骨が強くなる'],a:1,e:'16時間断食は食事しない時間を16時間設ける方法です。インスリン感受性の改善・脂肪燃焼の促進・オートファジー活性化が期待されます。夕食後から翌日昼食まで食べないパターンが人気です。',d:'hard'},
{q:'ケイ素が含まれる身近な自然素材はどれですか？',o:['プラスチック・アルミニウム','石英・水晶・砂・竹・木のもみがら','鉄・銅・亜鉛','アルコール'],a:1,e:'ケイ素（シリカ）は石英・水晶・砂の主成分です。植物では竹・玄米の外皮（もみがら）・麦わらなどに豊富で、地球上で最も身近なミネラルの一つです。',d:'easy'},
{q:'ホワイトシリカを植物の水やりに使うと期待される効果はどれですか？',o:['植物が枯れる','植物の細胞壁（シリカ体）を強化し病害虫への抵抗力・成長力が増す','土が固まる','花が色あせる'],a:1,e:'ケイ素は植物の細胞壁（シリカ体）を強化し病害虫や乾燥ストレスへの抵抗力を高めます。ホワイトシリカを薄めた水で水やりすると植物が元気になると言われています。',d:'easy'},
{q:'「自律神経」のバランスを整えるために効果的な方法はどれですか？',o:['不規則な生活・夜更かし・暴飲暴食','腹式呼吸・軽い運動・規則正しい生活リズム・好きな音楽鑑賞','常にカフェインを摂取する','過剰なダイエット'],a:1,e:'自律神経のバランスには腹式呼吸・軽い運動・規則正しい生活が効果的です。腹式呼吸は副交感神経を優位にしリラックスをもたらします。',d:'easy'},
{q:'ケイ素が骨密度に関係する理由として正しいものはどれですか？',o:['ケイ素は骨と全く無関係','骨のコラーゲン繊維の架橋形成にケイ素が必要でカルシウムの定着を助けるため','ケイ素が骨を溶かすため','ケイ素はカルシウムを体外に排出するため'],a:1,e:'骨のコラーゲン繊維の架橋（クロスリンク）形成にケイ素が必要です。コラーゲンの足場があることでカルシウム・リンが定着し、強い骨が作られます。',d:'hard'},
{q:'「スーパーフード」として注目されているスピルリナの主な特徴はどれですか？',o:['糖質のみが豊富','タンパク質・ミネラル・ビタミン・葉緑素を高濃度で含む藍藻類','脂肪が多い','カロリーが極めて高い'],a:1,e:'スピルリナは藍藻類で、タンパク質60〜70%・ミネラル・ビタミンB群・葉緑素を豊富に含みます。消化吸収率が高く栄養素の宝庫です。',d:'easy'},
{q:'肌の「保湿」のために毎日続けると効果的な習慣はどれですか？',o:['洗顔を1日5回以上行う','洗顔後すぐ（3分以内）に化粧水→保湿クリームを重ねる','お湯でのみ洗顔する','化粧水を塗った後すぐに乾かす'],a:1,e:'洗顔後は素早く化粧水で水分補給し、乳液やクリームで油分の膜を作り水分をとじ込めることが保湿の基本です。時間をおくと肌の水分が蒸発してしまいます。',d:'easy'}
]
type User={id:string;nickname:string;email:string;total_xp:number}
function shuffle(a:unknown[]){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function todayJST(){const n=new Date();return new Date(n.getTime()+9*3600000).toISOString().slice(0,10)}
function calcXP(correct:boolean,difficulty:'easy'|'hard',combo:number,missStreak:number){
  if(correct){const base=difficulty==='hard'?4:2;let bonus=0;if(combo>=5)bonus=5;else if(combo>=3)bonus=3;return{xp:base+bonus,bonus}}
  else{const base=difficulty==='hard'?2:1;const extra=missStreak>=2?1:0;return{xp:-(base+extra),bonus:0}}
}
export default function QuizApp(){
const[sc,setSc]=useState<'login'|'home'|'quiz'|'result'>('login')
const[email,setEmail]=useState('')
const[user,setUser]=useState<User|null>(null)
const[loginErr,setLoginErr]=useState('')
const[logging,setLogging]=useState(false)
const[qs,setQs]=useState<typeof QS>([])
const[qi,setQi]=useState(0)
const[ans,setAns]=useState(false)
const[sel,setSel]=useState<number|null>(null)
const[fb,setFb]=useState('')
const[score,setScore]=useState(0)
const[xpGain,setXpGain]=useState(0)
const[combo,setCombo]=useState(0)
const[missStreak,setMissStreak]=useState(0)
const[bonusMsg,setBonusMsg]=useState('')
const[todaySets,setTodaySets]=useState(0)
const[ranking,setRanking]=useState<User[]>([])
const[saving,setSaving]=useState(false)
const[shake,setShake]=useState(false)
const[flash,setFlash]=useState('')
const shakeRef=useRef<ReturnType<typeof setTimeout>>()
useEffect(()=>{fetchRanking()},[])
async function fetchRanking(){const{data}=await sb.from('silica_quiz_users').select('id,nickname,total_xp').order('total_xp',{ascending:false}).limit(10);if(data)setRanking(data as User[])}
async function loadSets(uid:string){const t=todayJST();const{data}=await sb.from('silica_quiz_sessions').select('id').eq('user_id',uid).gte('played_at',t+'T00:00:00+09:00').lte('played_at',t+'T23:59:59+09:00');const c=data?data.length:0;setTodaySets(c);return c}
async function login(){setLoginErr('');if(!email.trim()){setLoginErr('メールアドレスを入力してください');return};setLogging(true);const{data:u}=await sb.from('silica_quiz_users').select('*').eq('email',email.trim()).single();if(!u){setLoginErr('登録が見つかりません。まずトップページから参加登録をお願いします。');setLogging(false);return};setUser(u as User);await loadSets(u.id);setLogging(false);setSc('home')}
async function startQuiz(){if(!user)return;const sets=await loadSets(user.id);if(sets>=MAX_SETS)return;setQs(shuffle(QS).slice(0,5) as typeof QS);setQi(0);setScore(0);setXpGain(0);setCombo(0);setMissStreak(0);setBonusMsg('');setAns(false);setSel(null);setFb('');setSc('quiz')}
function pick(idx:number){if(ans)return;setAns(true);setSel(idx);const q=qs[qi];const ok=idx===q.a;const newCombo=ok?combo+1:0;const newMiss=ok?0:missStreak+1;const{xp,bonus}=calcXP(ok,q.d as 'easy'|'hard',newCombo,newMiss);setCombo(newCombo);setMissStreak(newMiss);setXpGain(x=>Math.max(0,x+xp));if(ok){setScore(s=>s+1);if(bonus>0){const msg=newCombo>=5?'🔥🔥 SUPER COMBO! +'+bonus+' XP!!':'🔥 COMBO BONUS! +'+bonus+' XP!';setBonusMsg(msg);setFlash('gold');setTimeout(()=>setFlash(''),800)}else{setFlash('green');setTimeout(()=>setFlash(''),400)};setFb('✅ 正解！ +'+Math.abs(xp)+' XP'+(bonus>0?' (+'+bonus+'ボーナス)':''))}else{setShake(true);setFlash('red');clearTimeout(shakeRef.current);shakeRef.current=setTimeout(()=>{setShake(false);setFlash('')},600);setBonusMsg('');setFb('❌ 不正解 '+xp+' XP → 正解：'+q.o[q.a])}}
async function next(){if(qi+1>=qs.length){setSaving(true);const newXp=Math.max(0,(user?.total_xp||0)+xpGain);await sb.from('silica_quiz_sessions').insert({user_id:user?.id,score,total:qs.length,xp_gained:xpGain,played_at:new Date().toISOString()});await sb.from('silica_quiz_users').update({total_xp:newXp}).eq('id',user?.id);if(user)setUser({...user,total_xp:newXp});await fetchRanking();await loadSets(user?.id||'');setSaving(false);setSc('result')}else{setQi(i=>i+1);setAns(false);setSel(null);setFb('');setBonusMsg('')}}
const q=qs[qi];const remain=MAX_SETS-todaySets;const comboColor=combo>=5?'#ff4500':combo>=3?'#ff8c00':combo>=2?'#ffd700':'#aab'
return(<div style={{minHeight:'100vh',background:flash==='gold'?'linear-gradient(160deg,#fff9e6,#ffe066)':flash==='green'?'linear-gradient(160deg,#e6fff7,#b8eaff)':flash==='red'?'linear-gradient(160deg,#fff0f4,#ffe0e6)':'linear-gradient(160deg,#b8eaff 0%,#e8f9ff 50%,#fffbe6 100%)',transition:'background 0.3s',fontFamily:"'M PLUS Rounded 1c',sans-serif",padding:'20px 16px 60px'}}>
<div style={{maxWidth:520,margin:'0 auto'}}>
<h1 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>💧 シリカ健康クイズ</h1>
<p style={{textAlign:'center',fontSize:'0.78rem',color:'#6b7f92',marginBottom:16}}>1日2セット×5問！知識を積んでランキング上位を目指そう</p>
{sc==='login'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
  <div style={{textAlign:'center',marginBottom:20}}><div style={{fontSize:'2.5rem',marginBottom:8}}>💧</div><h2 style={{fontSize:'1.1rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>クイズページへログイン</h2><p style={{fontSize:'0.82rem',color:'#6b7f92'}}>登録時のメールアドレスを入力してください</p></div>
  <input type='email' value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder='メールアドレス' style={{width:'100%',padding:'12px 14px',border:'2px solid #daedf7',borderRadius:12,fontSize:'0.95rem',fontFamily:'inherit',boxSizing:'border-box',outline:'none',marginBottom:10}}/>
  {loginErr&&<p style={{color:'#ef476f',fontSize:'0.8rem',fontWeight:700,marginBottom:10}}>{loginErr}</p>}
  <button onClick={login} disabled={logging} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit',marginBottom:12}}>{logging?'確認中...':'ログイン 🚀'}</button>
  <p style={{textAlign:'center',fontSize:'0.75rem',color:'#aab'}}>初めての方は<a href='/' style={{color:'#1a8cc7',fontWeight:700}}>こちらから参加登録</a></p>
  {ranking.length>0&&<div style={{marginTop:20,borderTop:'1px solid #f0f0f0',paddingTop:16}}><h3 style={{fontSize:'0.9rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:10}}>🏆 現在のランキング</h3>{ranking.slice(0,5).map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 10px',borderRadius:10,marginBottom:4,background:i<3?'#f0faff':'#fafafa'}}><span style={{width:20,fontSize:'0.9rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1)}</span><span style={{flex:1,fontWeight:700,fontSize:'0.85rem'}}>{u.nickname}</span><span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.85rem'}}>{u.total_xp.toLocaleString()} XP</span></div>))}</div>}
</div>}
{sc==='home'&&<div>
  <div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center',marginBottom:16}}>
    <h2 style={{fontSize:'1.1rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>{user?.nickname}さん、こんにちは！👋</h2>
    <p style={{color:'#6b7f92',fontSize:'0.85rem',marginBottom:8}}>累計 <strong style={{color:'#1a8cc7',fontSize:'1.2rem'}}>{user?.total_xp||0} XP</strong></p>
    <div style={{background:'#f0faff',borderRadius:12,padding:'10px 14px',marginBottom:14,fontSize:'0.78rem',color:'#1a8cc7',fontWeight:700}}>💡 正解+2XP（難問+4XP）｜3連続🔥+3XP｜5連続🔥🔥+5XP<br/><span style={{color:'#ef476f'}}>❌ 不正解-1XP（難問-2XP）｜連続ミス追加-1XP</span></div>
    <div style={{display:'flex',justifyContent:'center',gap:10,marginBottom:12}}>{[...Array(MAX_SETS)].map((_,i)=>(<div key={i} style={{width:48,height:48,borderRadius:12,background:i<todaySets?'#e0e0e0':'linear-gradient(135deg,#3bbfef,#1a8cc7)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}><span style={{fontSize:'1.2rem'}}>{i<todaySets?'✅':'🎯'}</span><span style={{fontSize:'0.5rem',color:i<todaySets?'#999':'white',fontWeight:700}}>{i+1}セット目</span></div>))}</div>
    <p style={{fontSize:'0.78rem',color:'#6b7f92',marginBottom:16}}>本日 {todaySets}/{MAX_SETS} セット完了（残り{remain}セット）</p>
    <button onClick={startQuiz} disabled={remain===0} style={{width:'100%',padding:14,background:remain>0?'linear-gradient(135deg,#3bbfef,#1a8cc7)':'#ccc',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:remain>0?'pointer':'default',fontFamily:'inherit'}}>{remain===0?'本日のクイズ終了！また明日💪':'クイズスタート！🚀'}</button>
    {remain===0&&<p style={{fontSize:'0.78rem',color:'#6b7f92',marginTop:8}}>🌙 明日また2セット挑戦できます</p>}
  </div>
  {ranking.length>0&&<div style={{background:'white',borderRadius:20,padding:'16px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}><h3 style={{fontSize:'1rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:12}}>🏆 ランキング TOP10</h3>{ranking.map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'7px 10px',borderRadius:10,marginBottom:5,background:u.id===user?.id?'#fff9e6':i<3?'#f0faff':'#fafafa',border:u.id===user?.id?'2px solid #ffd166':i<5?'1.5px solid #daedf7':'1.5px solid #f0f0f0'}}><span style={{width:24,fontSize:'1rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i<5?'🎁':'#'+(i+1)}</span><span style={{flex:1,fontWeight:700,fontSize:'0.88rem'}}>{u.nickname}{u.id===user?.id?' 👈':''}</span><span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.88rem'}}>{u.total_xp.toLocaleString()} XP</span></div>))}<p style={{fontSize:'0.72rem',color:'#aab',textAlign:'center',marginTop:8}}>🎁マーク（4・5位）もプレゼント対象！</p></div>}
</div>}
{sc==='quiz'&&q&&<div style={{transform:shake?'translateX(-6px)':'none',transition:'transform 0.1s'}}>
  <div style={{display:'flex',gap:8,marginBottom:10}}>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7'}}>{score}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>正解数</div></div>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:comboColor}}>{combo>0?combo+'連続🔥':'--'}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>コンボ</div></div>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7'}}>{xpGain}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>獲得XP</div></div>
  </div>
  {bonusMsg&&<div style={{textAlign:'center',fontSize:'1rem',fontWeight:900,color:'#ff8c00',background:'#fff9e6',border:'2px solid #ffd166',borderRadius:12,padding:'8px 14px',marginBottom:8}}>{bonusMsg}</div>}
  <div style={{background:'white',borderRadius:20,padding:'20px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
      <span style={{background:'#3bbfef',color:'white',fontSize:'0.68rem',fontWeight:800,padding:'3px 10px',borderRadius:20}}>Q{qi+1} / 5</span>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        <span style={{fontSize:'0.68rem',padding:'2px 8px',borderRadius:20,background:q.d==='hard'?'#fff0f4':'#f0faff',color:q.d==='hard'?'#ef476f':'#1a8cc7',fontWeight:800,border:q.d==='hard'?'1px solid #efbaba':'1px solid #b0d8ff'}}>{q.d==='hard'?'🔥 難問':'✨ 基本'}</span>
        <span style={{fontSize:'0.72rem',color:'#aab',fontWeight:700}}>第{todaySets+1}セット</span>
      </div>
    </div>
    <div style={{fontSize:'0.97rem',fontWeight:800,color:'#2d3a4a',marginBottom:14,lineHeight:1.6}}>{q.q}</div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {q.o.map((op,i)=>{let bg='white',bd='2.5px solid #daedf7',co='#2d3a4a';if(ans){if(i===q.a){bg='#e6fff7';bd='2.5px solid #06d6a0';co='#00a77a'}else if(i===sel){bg='#fff0f4';bd='2.5px solid #ef476f';co='#ef476f'}};return(<button key={i} onClick={()=>pick(i)} disabled={ans} style={{background:bg,border:bd,borderRadius:12,padding:'11px 14px',fontFamily:'inherit',fontSize:'0.91rem',fontWeight:700,color:co,cursor:ans?'default':'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:9}}><span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:24,height:24,background:ans&&i===q.a?'#06d6a0':ans&&i===sel?'#ef476f':'#e8f5ff',borderRadius:7,fontSize:'0.76rem',fontWeight:900,color:ans&&(i===q.a||i===sel)?'white':'#1a8cc7',flexShrink:0}}>{['A','B','C','D'][i]}</span>{op}</button>)})}
    </div>
    {fb&&<div style={{marginTop:12,padding:'11px 14px',borderRadius:12,background:sel===q.a?'#e6fff7':'#fff0f4',border:sel===q.a?'2px solid #06d6a0':'2px solid #ef476f',fontSize:'0.85rem',fontWeight:700,color:sel===q.a?'#008060':'#c0003a',lineHeight:1.5}}>{fb}<br/><span style={{fontWeight:400,fontSize:'0.8rem',color:'#555'}}>{q.e}</span></div>}
    {ans&&<button onClick={next} style={{width:'100%',marginTop:10,padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.95rem',fontWeight:800,cursor:'pointer'}}>{qi+1>=qs.length?(saving?'保存中...':'結果を見る🏆'):'次の問題へ▶'}</button>}
  </div>
</div>}
{sc==='result'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
  <div style={{fontSize:'3rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>{score}<span style={{fontSize:'1.3rem',color:'#ff8c42'}}>/5問</span></div>
  <div style={{fontWeight:700,color:'#2d3a4a',marginBottom:16}}>{score===5?'パーフェクト！🎉🎉':score>=4?'すばらしい！⭐⭐':score>=3?'よくできました！👍':'もう一度チャレンジしよう💪'}</div>
  <div style={{background:'linear-gradient(135deg,#e8f9ff,#fffbe6)',borderRadius:14,padding:'14px 16px',marginBottom:16}}><p style={{margin:0,fontWeight:800,color:'#1a8cc7',fontSize:'1.2rem'}}>+{xpGain} XP 獲得！</p><p style={{margin:'4px 0 0',fontSize:'0.85rem',color:'#6b7f92'}}>累計 {user?.total_xp||0} XP</p></div>
  <div style={{background:'#f0faff',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:'0.82rem',color:'#1a8cc7',fontWeight:700}}>💡 3連続🔥で+3XP、5連続🔥🔥で+5XPのボーナスをゲット！</div>
  {remain>0?(<><p style={{fontSize:'0.85rem',color:'#1a8cc7',fontWeight:700,marginBottom:12}}>あと{remain}セット挑戦できます！</p><button onClick={()=>setSc('home')} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.98rem',fontWeight:800,cursor:'pointer',marginBottom:8}}>次のセットへ！🚀</button></>):(<p style={{fontSize:'0.85rem',color:'#6b7f92',marginBottom:12}}>🌙 今日のクイズはここまで！また明日挑戦しよう</p>)}
  {ranking.length>0&&<div style={{marginBottom:12,textAlign:'left'}}><h3 style={{fontSize:'0.9rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:8}}>🏆 現在のランキング</h3>{ranking.slice(0,5).map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 10px',borderRadius:10,marginBottom:4,background:u.id===user?.id?'#fff9e6':'#fafafa',border:u.id===user?.id?'2px solid #ffd166':'1px solid #f0f0f0'}}><span style={{width:20}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i<5?'🎁':'#'+(i+1)}</span><span style={{flex:1,fontWeight:700,fontSize:'0.85rem'}}>{u.nickname}</span><span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.85rem'}}>{u.total_xp.toLocaleString()} XP</span></div>))}</div>}
  <button onClick={()=>setSc('home')} style={{width:'100%',padding:12,background:'#f0f0f0',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.9rem',fontWeight:700,cursor:'pointer',color:'#555'}}>ホームへ戻る🏠</button>
</div>}
</div></div>)
}
