'use client'
import{useState,useEffect,useRef}from'react'
import{createClient}from'@supabase/supabase-js'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const MAX_SETS=2
const QS=[{q:'ケイ素（シリカ）は体内でどんな役割をしますか？',o:['骨を硬くするだけ','コラーゲンを結びつけて弾力を作る','カルシウムを補給する','水分を排出する'],a:1,e:'ケイ素はコラーゲン・エラスチン・ヒアルロン酸を接着剤のように結びつけ、お肌や血管の弾力を保ちます。',d:'easy'},{q:'日本人の何割がミネラル不足と言われていますか？',o:['約3割','約5割','約7割','約9割'],a:3,e:'日本人の約9割がミネラル不足と言われています。',d:'easy'},{q:'健康な人の血液のpH値として正しいものはどれですか？',o:['pH6.0（弱酸性）','pH7.0（中性）','pH7.4（弱アルカリ性）','pH8.0（アルカリ性）'],a:2,e:'健康な人の血液はpH7.4±0.05の弱アルカリ性に保たれています。',d:'easy'},{q:'体温が1℃下がると免疫力はどのくらい低下しますか？',o:['約10%','約20%','約30%','約50%'],a:2,e:'体温が1℃下がると免疫力は約30%、代謝は約12%低下します。',d:'hard'},{q:'ホワイトシリカを飲む場合の推奨希釈倍率は？',o:['10〜20倍','50倍','100〜200倍','500倍以上'],a:2,e:'ホワイトシリカは100〜200倍に希釈して飲むのが推奨されています。',d:'easy'},{q:'水溶性ケイ素の精菌力とはどんな力ですか？',o:['菌を全部殺す力','菌のバランスを整える力','菌を増やす力','体を守るバリア'],a:1,e:'精菌力は菌を殺すのではなく、腸や肌の菌バランスを整える力です。',d:'hard'},{q:'美肌のために毎日心がけたい生活習慣として最も効果的なものはどれですか？',o:['長時間の日光浴','十分な睡眠・水分補給・バランスの良い食事','激しい運動のみ','高カロリーな食事'],a:1,e:'美肌の基本は十分な睡眠・こまめな水分補給・バランスの良い食事です。',d:'easy'},{q:'腸内環境を整えるために効果的な食品はどれですか？',o:['加工食品・インスタント食品','発酵食品（味噌・醤油・納豆）・食物繊維','炭酸飲料・甘い菓子','脂っこい揚げ物'],a:1,e:'発酵食品や食物繊維は腸内の善玉菌を増やし腸内環境を整えます。',d:'easy'},{q:'ケイ素の抗酸化力を示す実験として正しいものはどれですか？',o:['ケイ素を加えると水が早く沸騰する','水道水にケイ素を10%加えると腐らず鉄も錆びない','ケイ素を加えると水が甘くなる','ケイ素で植物が早く育つ'],a:1,e:'水道水にケイ素を10%加えると水自体が腐らなくなり鉄も錆びません。5年・10年経っても酸化しない強力な抗酸化力があります。',d:'hard'},{q:'体を温める陽性食品に分類されるものはどれですか？',o:['きゅうり・ナス・トマト','梅干し・発酵食品・根菜類','アイスクリーム・冷たい飲み物','生野菜サラダ'],a:1,e:'梅干し・発酵食品（味噌・醤油）・根菜類（ごぼう・れんこん）は体を温める陽性食品です。',d:'easy'},{q:'爪がボコボコしたり縦筋が入る主な原因はどれですか？',o:['爪の切りすぎ','ケイ素不足による弾力低下','紫外線の浴びすぎ','水の飲みすぎ'],a:1,e:'爪のボコボコ・縦筋はケイ素不足のサインのひとつです。',d:'easy'},{q:'日焼け後の肌ケアとして正しいものはどれですか？',o:['すぐに熱いお風呂に入る','アルコール入り化粧水をたっぷりつける','冷やして炎症を抑えた後しっかり保湿する','放置してよい'],a:2,e:'日焼けは軽いやけどです。まず冷やして炎症を落ち着かせ、その後しっかり保湿することが大切です。',d:'easy'},{q:'水分補給として最も体に良い飲み物はどれですか？',o:['砂糖入りジュース','カフェイン入りコーヒー','清潔な水（白湯や常温水）','炭酸飲料'],a:2,e:'体の約60%は水分でできています。こまめに清潔な水を飲むことが代謝・血流・肌の調子を整える基本です。',d:'easy'},{q:'睡眠が不足すると肌に起こりやすいことはどれですか？',o:['肌が明るくなる','くすみ・乾燥・ニキビが起きやすくなる','毛穴が引き締まる','シミが薄くなる'],a:1,e:'睡眠中は成長ホルモンが分泌され肌の修復が行われます。睡眠不足は新陳代謝を妨げます。',d:'easy'},{q:'ホワイトシリカを加熱するとどうなりますか？',o:['毒素が発生する','性質が変わらないので料理にも使える','効果がなくなる','色が変わる'],a:1,e:'ホワイトシリカは加熱しても性質が変わりません。料理に加えて加熱調理することもできます。',d:'easy'},{q:'シリカゲル（乾燥剤）はどんな物質でできていますか？',o:['炭素','カルシウム','ケイ素（シリカ）','マグネシウム'],a:2,e:'お菓子などに入っている乾燥剤シリカゲルはケイ素（Silica）でできています。',d:'hard'},{q:'血液を弱アルカリ性に保つために効果的な食品はどれですか？',o:['砂糖・白米・お肉','大根・にんじん・根菜類','コーヒー・お酒・チョコレート','牛乳・乳製品'],a:1,e:'大根・にんじん・れんこんなどの根菜類はアルカリ性食品で血液をきれいにする働きがあります。',d:'easy'},{q:'ケイ素の脂肪溶解力の実験で確認できることはどれですか？',o:['水と脂が完全に分離する','ケイ素を加えると水と脂が乳化して長期間固まらない','脂がより固まる','水が蒸発する'],a:1,e:'ケイ素を加えると水と脂が乳化（エマルジョン化）し1ヶ月経っても固まりません。',d:'hard'},{q:'食物繊維やケイ素が特に多く含まれる食材の部位はどこですか？',o:['果肉の中心','種の部分','皮の部分','根の先端'],a:2,e:'食物繊維やケイ素は主に皮の部分に多く含まれています。',d:'easy'},{q:'髪の毛を健康に保つために特に重要なミネラルはどれですか？',o:['ナトリウム','塩素','ケイ素（シリカ）','リン'],a:2,e:'ケイ素は髪・爪・肌の弾力を作る重要なミネラルです。不足すると白髪・脱毛・爪のトラブルが起きやすくなります。',d:'hard'},{q:'1日の適切な水分摂取量として正しいものはどれですか？',o:['約500ml','約1〜1.5L','約2〜2.5L','約4L以上'],a:2,e:'成人の1日の推奨水分摂取量は約2〜2.5Lです。',d:'easy'}]
type User={id:string;nickname:string;email:string;total_xp:number}
function shuffle(a:unknown[]){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function todayJST(){const n=new Date();return new Date(n.getTime()+9*3600000).toISOString().slice(0,10)}
function calcXP(correct:boolean,difficulty:'easy'|'hard',combo:number,missStreak:number){
  if(correct){
    const base=difficulty==='hard'?4:2
    let bonus=0
    if(combo>=5)bonus=5
    else if(combo>=3)bonus=3
    return{xp:base+bonus,bonus}
  }else{
    const base=difficulty==='hard'?2:1
    const extra=missStreak>=2?1:0
    return{xp:-(base+extra),bonus:0}
  }
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
async function login(){
  setLoginErr('');if(!email.trim()){setLoginErr('メールアドレスを入力してください');return}
  setLogging(true)
  const{data:u}=await sb.from('silica_quiz_users').select('*').eq('email',email.trim()).single()
  if(!u){setLoginErr('登録が見つかりません。まずトップページから参加登録をお願いします。');setLogging(false);return}
  setUser(u as User);await loadSets(u.id);setLogging(false);setSc('home')
}
async function startQuiz(){
  if(!user)return;const sets=await loadSets(user.id);if(sets>=MAX_SETS)return
  setQs(shuffle(QS).slice(0,5) as typeof QS);setQi(0);setScore(0);setXpGain(0);setCombo(0);setMissStreak(0);setBonusMsg('');setAns(false);setSel(null);setFb('');setSc('quiz')
}
function pick(idx:number){
  if(ans)return
  setAns(true);setSel(idx)
  const q=qs[qi];const ok=idx===q.a
  const newCombo=ok?combo+1:0
  const newMiss=ok?0:missStreak+1
  const{xp,bonus}=calcXP(ok,q.d as 'easy'|'hard',newCombo,newMiss)
  setCombo(newCombo)
  setMissStreak(newMiss)
  setXpGain(x=>Math.max(0,x+xp))
  if(ok){
    setScore(s=>s+1)
    if(bonus>0){
      const msg=newCombo>=5?'🔥🔥 SUPER COMBO! +'+bonus+' XP!!':'🔥 COMBO BONUS! +'+bonus+' XP!'
      setBonusMsg(msg)
      setFlash('gold')
      setTimeout(()=>setFlash(''),800)
    }else{
      setFlash('green')
      setTimeout(()=>setFlash(''),400)
    }
    setFb('✅ 正解！ +'+Math.abs(xp)+' XP'+(bonus>0?' (+'+bonus+'ボーナス)':''))
  }else{
    setShake(true)
    setFlash('red')
    clearTimeout(shakeRef.current)
    shakeRef.current=setTimeout(()=>{setShake(false);setFlash('')},600)
    setBonusMsg('')
    setFb('❌ 不正解 '+xp+' XP → 正解：'+q.o[q.a])
  }
}
async function next(){
  if(qi+1>=qs.length){
    setSaving(true)
    const newXp=Math.max(0,(user?.total_xp||0)+xpGain)
    await sb.from('silica_quiz_sessions').insert({user_id:user?.id,score,total:qs.length,xp_gained:xpGain,played_at:new Date().toISOString()})
    await sb.from('silica_quiz_users').update({total_xp:newXp}).eq('id',user?.id)
    if(user)setUser({...user,total_xp:newXp})
    await fetchRanking();await loadSets(user?.id||'');setSaving(false);setSc('result')
  }else{setQi(i=>i+1);setAns(false);setSel(null);setFb('');setBonusMsg('')}
}
const q=qs[qi];const remain=MAX_SETS-todaySets
const comboColor=combo>=5?'#ff4500':combo>=3?'#ff8c00':combo>=2?'#ffd700':'#aab'
return(<div style={{minHeight:'100vh',background:flash==='gold'?'linear-gradient(160deg,#fff9e6,#ffe066)':flash==='green'?'linear-gradient(160deg,#e6fff7,#b8eaff)':flash==='red'?'linear-gradient(160deg,#fff0f4,#ffe0e6)':'linear-gradient(160deg,#b8eaff 0%,#e8f9ff 50%,#fffbe6 100%)',transition:'background 0.3s',fontFamily:"'M PLUS Rounded 1c',sans-serif",padding:'20px 16px 60px'}}>
<div style={{maxWidth:520,margin:'0 auto'}}>
<h1 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>💧 シリカ健康クイズ</h1>
<p style={{textAlign:'center',fontSize:'0.78rem',color:'#6b7f92',marginBottom:16}}>1日2セット×5問！知識を積んでランキング上位を目指そう</p>
{sc==='login'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
  <div style={{textAlign:'center',marginBottom:20}}><div style={{fontSize:'2.5rem',marginBottom:8}}>💧</div>
    <h2 style={{fontSize:'1.1rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>クイズページへログイン</h2>
    <p style={{fontSize:'0.82rem',color:'#6b7f92'}}>登録時のメールアドレスを入力してください</p></div>
  <input type='email' value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder='メールアドレス'
    style={{width:'100%',padding:'12px 14px',border:'2px solid #daedf7',borderRadius:12,fontSize:'0.95rem',fontFamily:'inherit',boxSizing:'border-box',outline:'none',marginBottom:10}}/>
  {loginErr&&<p style={{color:'#ef476f',fontSize:'0.8rem',fontWeight:700,marginBottom:10}}>{loginErr}</p>}
  <button onClick={login} disabled={logging} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit',marginBottom:12}}>{logging?'確認中...':'ログイン 🚀'}</button>
  <p style={{textAlign:'center',fontSize:'0.75rem',color:'#aab'}}>初めての方は<a href='/' style={{color:'#1a8cc7',fontWeight:700}}>こちらから参加登録</a></p>
  {ranking.length>0&&<div style={{marginTop:20,borderTop:'1px solid #f0f0f0',paddingTop:16}}>
    <h3 style={{fontSize:'0.9rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:10}}>🏆 現在のランキング</h3>
    {ranking.slice(0,5).map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 10px',borderRadius:10,marginBottom:4,background:i<3?'#f0faff':'#fafafa'}}>
      <span style={{width:20,fontSize:'0.9rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1)}</span>
      <span style={{flex:1,fontWeight:700,fontSize:'0.85rem'}}>{u.nickname}</span>
      <span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.85rem'}}>{u.total_xp.toLocaleString()} XP</span>
    </div>))}
  </div>}
</div>}
{sc==='home'&&<div>
  <div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center',marginBottom:16}}>
    <h2 style={{fontSize:'1.1rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>{user?.nickname}さん、こんにちは！👋</h2>
    <p style={{color:'#6b7f92',fontSize:'0.85rem',marginBottom:8}}>累計 <strong style={{color:'#1a8cc7',fontSize:'1.2rem'}}>{user?.total_xp||0} XP</strong></p>
    <div style={{background:'#f0faff',borderRadius:12,padding:'10px 14px',marginBottom:14,fontSize:'0.78rem',color:'#1a8cc7',fontWeight:700}}>
      💡 正解+2XP（難問+4XP）｜3連続🔥+3XP｜5連続🔥🔥+5XP<br/>
      <span style={{color:'#ef476f'}}>❌ 不正解-1XP（難問-2XP）｜連続ミス追加-1XP</span>
    </div>
    <div style={{display:'flex',justifyContent:'center',gap:10,marginBottom:12}}>
      {[...Array(MAX_SETS)].map((_,i)=>(<div key={i} style={{width:48,height:48,borderRadius:12,background:i<todaySets?'#e0e0e0':'linear-gradient(135deg,#3bbfef,#1a8cc7)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}>
        <span style={{fontSize:'1.2rem'}}>{i<todaySets?'✅':'🎯'}</span>
        <span style={{fontSize:'0.5rem',color:i<todaySets?'#999':'white',fontWeight:700}}>{i+1}セット目</span>
      </div>))}
    </div>
    <p style={{fontSize:'0.78rem',color:'#6b7f92',marginBottom:16}}>本日 {todaySets}/{MAX_SETS} セット完了（残り{remain}セット）</p>
    <button onClick={startQuiz} disabled={remain===0} style={{width:'100%',padding:14,background:remain>0?'linear-gradient(135deg,#3bbfef,#1a8cc7)':'#ccc',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:remain>0?'pointer':'default',fontFamily:'inherit'}}>
      {remain===0?'本日のクイズ終了！また明日💪':'クイズスタート！🚀'}</button>
    {remain===0&&<p style={{fontSize:'0.78rem',color:'#6b7f92',marginTop:8}}>🌙 明日また2セット挑戦できます</p>}
  </div>
  {ranking.length>0&&<div style={{background:'white',borderRadius:20,padding:'16px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
    <h3 style={{fontSize:'1rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:12}}>🏆 ランキング TOP10</h3>
    {ranking.map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'7px 10px',borderRadius:10,marginBottom:5,background:u.id===user?.id?'#fff9e6':i<3?'#f0faff':'#fafafa',border:u.id===user?.id?'2px solid #ffd166':i<5?'1.5px solid #daedf7':'1.5px solid #f0f0f0'}}>
      <span style={{width:24,fontSize:'1rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i<5?'🎁':'#'+(i+1)}</span>
      <span style={{flex:1,fontWeight:700,fontSize:'0.88rem'}}>{u.nickname}{u.id===user?.id?' 👈':''}</span>
      <span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.88rem'}}>{u.total_xp.toLocaleString()} XP</span>
    </div>))}
  </div>}
</div>}
{sc==='quiz'&&q&&<div style={{transform:shake?'translateX(-6px)':'none',transition:'transform 0.1s'}}>
  <div style={{display:'flex',gap:8,marginBottom:10}}>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7'}}>{score}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>正解数</div></div>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:comboColor}}>{combo>0?combo+'連続🔥':'--'}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>コンボ</div></div>
    <div style={{flex:1,background:'white',borderRadius:12,padding:'8px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}><div style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7'}}>{xpGain}</div><div style={{fontSize:'0.65rem',color:'#6b7f92'}}>獲得XP</div></div>
  </div>
  {bonusMsg&&<div style={{textAlign:'center',fontSize:'1rem',fontWeight:900,color:'#ff8c00',background:'#fff9e6',border:'2px solid #ffd166',borderRadius:12,padding:'8px 14px',marginBottom:8,animation:'pulse 0.3s ease'}}>{bonusMsg}</div>}
  <div style={{background:'white',borderRadius:20,padding:'20px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
      <span style={{background:'#3bbfef',color:'white',fontSize:'0.68rem',fontWeight:800,padding:'3px 10px',borderRadius:20}}>Q{qi+1} / 5</span>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        <span style={{fontSize:'0.68rem',padding:'2px 8px',borderRadius:20,background:q.d==='hard'?'#fff0f4':'#f0faff',color:q.d==='hard'?'#ef476f':'#1a8cc7',fontWeight:800,border:q.d==='hard'?'1px solid #efbaba':'1px solid #b0d8ff'}}>
          {q.d==='hard'?'🔥 難問':'✨ 基本'}
        </span>
        <span style={{fontSize:'0.72rem',color:'#aab',fontWeight:700}}>第{todaySets+1}セット</span>
      </div>
    </div>
    <div style={{fontSize:'0.97rem',fontWeight:800,color:'#2d3a4a',marginBottom:14,lineHeight:1.6}}>{q.q}</div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {q.o.map((op,i)=>{let bg='white',bd='2.5px solid #daedf7',co='#2d3a4a';if(ans){if(i===q.a){bg='#e6fff7';bd='2.5px solid #06d6a0';co='#00a77a'}else if(i===sel){bg='#fff0f4';bd='2.5px solid #ef476f';co='#ef476f'}};return(<button key={i} onClick={()=>pick(i)} disabled={ans} style={{background:bg,border:bd,borderRadius:12,padding:'11px 14px',fontFamily:'inherit',fontSize:'0.91rem',fontWeight:700,color:co,cursor:ans?'default':'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:9}}>
        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:24,height:24,background:ans&&i===q.a?'#06d6a0':ans&&i===sel?'#ef476f':'#e8f5ff',borderRadius:7,fontSize:'0.76rem',fontWeight:900,color:ans&&(i===q.a||i===sel)?'white':'#1a8cc7',flexShrink:0}}>{['A','B','C','D'][i]}</span>{op}
      </button>)})}
    </div>
    {fb&&<div style={{marginTop:12,padding:'11px 14px',borderRadius:12,background:sel===q.a?'#e6fff7':'#fff0f4',border:sel===q.a?'2px solid #06d6a0':'2px solid #ef476f',fontSize:'0.85rem',fontWeight:700,color:sel===q.a?'#008060':'#c0003a',lineHeight:1.5}}>{fb}<br/><span style={{fontWeight:400,fontSize:'0.8rem',color:'#555'}}>{q.e}</span></div>}
    {ans&&<button onClick={next} style={{width:'100%',marginTop:10,padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.95rem',fontWeight:800,cursor:'pointer'}}>{qi+1>=qs.length?(saving?'保存中...':'結果を見る🏆'):'次の問題へ▶'}</button>}
  </div>
</div>}
{sc==='result'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
  <div style={{fontSize:'3rem',fontWeight:900,color:'#1a8cc7',marginBottom:4}}>{score}<span style={{fontSize:'1.3rem',color:'#ff8c42'}}>/5問</span></div>
  <div style={{fontWeight:700,color:'#2d3a4a',marginBottom:16}}>{score===5?'パーフェクト！🎉🎉':score>=4?'すばらしい！⭐⭐':score>=3?'よくできました！👍':'もう一度チャレンジしよう💪'}</div>
  <div style={{background:'linear-gradient(135deg,#e8f9ff,#fffbe6)',borderRadius:14,padding:'14px 16px',marginBottom:16}}>
    <p style={{margin:0,fontWeight:800,color:'#1a8cc7',fontSize:'1.2rem'}}>+{xpGain} XP 獲得！</p>
    <p style={{margin:'4px 0 0',fontSize:'0.85rem',color:'#6b7f92'}}>累計 {user?.total_xp||0} XP</p>
  </div>
  <div style={{background:'#f0faff',borderRadius:12,padding:'10px 14px',marginBottom:16,fontSize:'0.82rem',color:'#1a8cc7',fontWeight:700}}>
    💡 次回のコツ：連続正解でボーナスXPがもらえます！<br/>3連続🔥で+3XP、5連続🔥🔥で+5XP！
  </div>
  {remain>0?(<><p style={{fontSize:'0.85rem',color:'#1a8cc7',fontWeight:700,marginBottom:12}}>あと{remain}セット挑戦できます！</p>
  <button onClick={()=>setSc('home')} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.98rem',fontWeight:800,cursor:'pointer',marginBottom:8}}>次のセットへ！🚀</button></>)
  :(<p style={{fontSize:'0.85rem',color:'#6b7f92',marginBottom:12}}>🌙 今日のクイズはここまで！また明日挑戦しよう</p>)}
  {ranking.length>0&&<div style={{marginBottom:12,textAlign:'left'}}>
    <h3 style={{fontSize:'0.9rem',fontWeight:900,color:'#1a8cc7',textAlign:'center',marginBottom:8}}>🏆 現在のランキング</h3>
    {ranking.slice(0,5).map((u,i)=>(<div key={u.id} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 10px',borderRadius:10,marginBottom:4,background:u.id===user?.id?'#fff9e6':'#fafafa',border:u.id===user?.id?'2px solid #ffd166':'1px solid #f0f0f0'}}>
      <span style={{width:20}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i<5?'🎁':'#'+(i+1)}</span>
      <span style={{flex:1,fontWeight:700,fontSize:'0.85rem'}}>{u.nickname}</span>
      <span style={{fontWeight:900,color:'#1a8cc7',fontSize:'0.85rem'}}>{u.total_xp.toLocaleString()} XP</span>
    </div>))}
  </div>}
  <button onClick={()=>setSc('home')} style={{width:'100%',padding:12,background:'#f0f0f0',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.9rem',fontWeight:700,cursor:'pointer',color:'#555'}}>ホームへ戻る🏠</button>
</div>}
</div></div>)
}
