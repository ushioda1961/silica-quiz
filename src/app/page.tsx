'use client'
import{useState}from'react'
import{createClient}from'@supabase/supabase-js'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const EVENT_START='2025-05-01'
const EVENT_END='2025-05-31'
const BASE='https://frxfqbfvzxdjocwnrsbg.supabase.co/storage/v1/object/public/quiz-images/'
const PRIZES=[
{rank:1,icon:'🥇',award:'優勝・インナーケア賞',items:'ホワイトシリカ１L・ハピネスシリカ',price:'約25,000円相当',img:BASE+'prize_innercare.jpg',color:'#fff9e6',border:'#ffd166',badge:'#ff8c00'},
{rank:2,icon:'🥈',award:'２位・スキンケア賞',items:'バランスシリカ・シリカの石鹸・m.SILICA',price:'約10,000円相当',img:BASE+'prize_skincare.jpg',color:'#f8f8f8',border:'#cccccc',badge:'#888888'},
{rank:3,icon:'🥉',award:'３位・ヘアケア賞',items:'アップルシリカシャンプー・スタイルシリカ',price:'約6,000円相当',img:BASE+'prize_haircare.jpg',color:'#fff4ee',border:'#e8a87c',badge:'#c0603a'},
{rank:4,icon:'4️⃣',award:'４位・フードケア賞',items:'びおすーぷ・乳酸菌シリカジュレ・超濃縮海洋ミネラル水',price:'約14,000円相当',img:BASE+'prize_foodcare.jpg',color:'#f0faff',border:'#b0d8ff',badge:'#1a8cc7'},
{rank:5,icon:'5️⃣',award:'５位・マインドケア賞',items:'ブルーシリカ（176g）',price:'約77,000円相当',img:BASE+'prize_mindcare.jpg',color:'#f0fff4',border:'#9fe1cb',badge:'#0f6e56'},
]
export default function LP(){
const[step,setStep]=useState<'top'|'form'|'done'>('top')
const[form,setForm]=useState({nickname:'',name:'',postal:'',address:'',tel:'',email:''})
const[err,setErr]=useState('')
const[loading,setLoading]=useState(false)
const f=(k:string,v:string)=>setForm(p=>({...p,[k]:v}))
async function submit(){
  setErr('')
  const{nickname,name,postal,address,tel,email}=form
  if(!nickname||!name||!postal||!address||!tel||!email){setErr('すべての項目を入力してください');return}
  if(!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)){setErr('メールアドレスの形式が正しくありません');return}
  setLoading(true)
  const{data:ex}=await sb.from('silica_quiz_users').select('id,email').eq('email',email).single()
  if(ex){window.location.href='/quiz';return}
  const{data:dup}=await sb.from('silica_quiz_users').select('id').eq('nickname',nickname).single()
  if(dup){setErr('そのニックネームはすでに使われています');setLoading(false);return}
  const{error}=await sb.from('silica_quiz_users').insert({nickname,name,postal,address,tel,email,total_xp:0,email_notify:true})
  if(error){setErr('登録に失敗しました。もう一度お試しください');setLoading(false);return}
  setLoading(false);setStep('done')
}
const S={page:{minHeight:'100vh',background:'linear-gradient(160deg,#0a2a4a 0%,#0d3b6e 40%,#1565a0 100%)',fontFamily:"'M PLUS Rounded 1c',Helvetica,sans-serif",color:'white'},inner:{maxWidth:640,margin:'0 auto',padding:'0 16px 60px'}}
return(<div style={S.page}><div style={S.inner}>
{step==='top'&&<>
  <div style={{textAlign:'center',padding:'48px 0 32px'}}>
    <div style={{marginBottom:16,display:'flex',justifyContent:'center'}}><img src='https://frxfqbfvzxdjocwnrsbg.supabase.co/storage/v1/object/public/quiz-images/005.png' alt='シリカくん' style={{width:140,height:140,objectFit:'contain',filter:'drop-shadow(0 4px 16px rgba(59,191,239,0.4))'}}/></div>
    <div style={{display:'inline-block',background:'rgba(255,215,0,0.2)',border:'1.5px solid #ffd700',borderRadius:20,padding:'6px 18px',fontSize:'0.8rem',fontWeight:800,color:'#ffd700',marginBottom:16,letterSpacing:'0.05em'}}>期間限定イベント開催中</div>
    <h1 style={{fontSize:'1.8rem',fontWeight:900,lineHeight:1.3,marginBottom:12}}>シリカ健康クイズ<br/><span style={{color:'#3bbfef'}}>チャレンジ！</span></h1>
    <p style={{fontSize:'0.95rem',color:'rgba(255,255,255,0.8)',lineHeight:1.7,marginBottom:24}}>シリカと健康の知識を楽しみながら学んで、<br/>毎日クイズに挑戦！上位入賞者には<br/><strong style={{color:'#ffd700'}}>シリカ製品をプレゼント🎁</strong></p>
    <div style={{background:'rgba(255,255,255,0.1)',border:'1.5px solid rgba(255,255,255,0.2)',borderRadius:16,padding:'16px 20px',marginBottom:24,textAlign:'left'}}>
      <div style={{fontWeight:900,fontSize:'1rem',marginBottom:12,textAlign:'center',color:'#3bbfef'}}>📋 イベント概要</div>
      {[['📅','開催期間',EVENT_START+' 〜 '+EVENT_END],['❓','1日の挑戦','2セット×5問＝1日10問'],['🏆','プレゼント','上位5名にシリカ製品を進呈'],['📦','発送方法','ヤマト宅急便でお届け'],['🔒','個人情報','発送目的のみ使用・ランキングはニックネーム表示']].map(([ic,lb,vl])=>(<div key={lb} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10}}><span style={{fontSize:'1.1rem',flexShrink:0}}>{ic}</span><div><span style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.6)',display:'block'}}>{lb}</span><span style={{fontSize:'0.88rem',fontWeight:700}}>{vl}</span></div></div>))}
    </div>
    <div style={{marginBottom:28}}>
      <div style={{fontWeight:900,fontSize:'1.1rem',marginBottom:16,textAlign:'center',color:'#ffd700'}}>🎁 プレゼント商品ラインナップ</div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {PRIZES.map(p=>(<div key={p.rank} style={{background:'rgba(255,255,255,0.08)',border:'1.5px solid rgba(255,255,255,0.15)',borderRadius:16,overflow:'hidden',display:'flex',alignItems:'stretch'}}>
          <div style={{width:110,flexShrink:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',padding:8}}>
            <img src={p.img} alt={p.award} style={{width:'100%',height:90,objectFit:'contain',borderRadius:8}} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
          </div>
          <div style={{padding:'12px 14px',flex:1,textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
              <span style={{fontSize:'1.2rem'}}>{p.icon}</span>
              <span style={{fontWeight:900,fontSize:'0.88rem',color:'#ffd700'}}>{p.award}</span>
            </div>
            <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.9)',lineHeight:1.5,marginBottom:6}}>{p.items}</div>
            <div style={{display:'inline-block',background:'rgba(255,215,0,0.25)',border:'1px solid #ffd700',borderRadius:20,padding:'2px 10px',fontSize:'0.75rem',fontWeight:800,color:'#ffd700'}}>{p.price}</div>
          </div>
        </div>))}
      </div>
    </div>
    <div style={{background:'rgba(59,191,239,0.15)',border:'1.5px solid #3bbfef',borderRadius:16,padding:'16px 20px',marginBottom:28}}>
      <div style={{fontWeight:900,fontSize:'1rem',marginBottom:10,color:'#3bbfef'}}>✨ こんな知識が身につく！</div>
      {['ケイ素（シリカ）が体に与える効果','シリカ製品の正しい使い方・活用術','血液・体温・腸内環境と健康の関係','毎日の食事で意識したい美容・健康習慣'].map(v=>(<div key={v} style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}><span style={{color:'#3bbfef',fontWeight:900}}>✓</span><span style={{fontSize:'0.88rem'}}>{v}</span></div>))}
    </div>
    <button onClick={()=>setStep('form')} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#ffd700,#ff8c00)',color:'#1a1a1a',border:'none',borderRadius:16,fontSize:'1.1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 8px 24px rgba(255,215,0,0.4)',letterSpacing:'0.03em'}}>
      🚀 無料で参加登録する
    </button>
    <p style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.5)',marginTop:10}}>登録後すぐにクイズに挑戦できます</p>
  </div>
</>}
{step==='form'&&<>
  <div style={{paddingTop:32}}>
    <button onClick={()=>setStep('top')} style={{background:'none',border:'none',color:'rgba(255,255,255,0.6)',fontSize:'0.85rem',cursor:'pointer',marginBottom:16,fontFamily:'inherit'}}>← 戻る</button>
    <h2 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:6,textAlign:'center'}}>参加登録フォーム</h2>
    <p style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.6)',textAlign:'center',marginBottom:24}}>プレゼント発送のため以下の情報をご記入ください</p>
    <div style={{background:'rgba(255,255,255,0.1)',borderRadius:20,padding:24}}>
      {[{k:'nickname',lb:'ニックネーム（ランキング表示名）',ph:'例：シリカファン、健康マスター',type:'text'},{k:'name',lb:'お名前（本名）',ph:'例：山田 花子',type:'text'},{k:'email',lb:'メールアドレス',ph:'例：example@email.com',type:'email'},{k:'tel',lb:'電話番号',ph:'例：090-1234-5678',type:'tel'},{k:'postal',lb:'郵便番号',ph:'例：100-0001',type:'text'},{k:'address',lb:'住所（都道府県〜番地）',ph:'例：東京都千代田区1-1-1',type:'text'}].map(({k,lb,ph,type})=>(<div key={k} style={{marginBottom:14}}>
        <label style={{fontSize:'0.78rem',fontWeight:700,color:'rgba(255,255,255,0.7)',display:'block',marginBottom:4}}>{lb}</label>
        <input type={type} value={(form as Record<string,string>)[k]} onChange={e=>f(k,e.target.value)} placeholder={ph}
          style={{width:'100%',padding:'12px 14px',borderRadius:12,border:'1.5px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.12)',color:'white',fontSize:'0.95rem',fontFamily:'inherit',boxSizing:'border-box',outline:'none'}}/>
      </div>))}
      <div style={{background:'rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 14px',marginBottom:14}}>
        <p style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.6)',margin:0,lineHeight:1.6}}>📧 登録後、毎日クイズの挑戦をメールでお知らせします。<br/>🔒 個人情報はプレゼント発送・お知らせ送信のみに使用します。</p>
      </div>
      {err&&<p style={{color:'#ff6b6b',fontSize:'0.82rem',fontWeight:700,marginBottom:12}}>{err}</p>}
      <button onClick={submit} disabled={loading} style={{width:'100%',padding:'14px',background:loading?'#666':'linear-gradient(135deg,#ffd700,#ff8c00)',color:'#1a1a1a',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:loading?'default':'pointer',fontFamily:'inherit'}}>
        {loading?'登録中...':'登録してクイズへ進む 🎯'}
      </button>
    </div>
  </div>
</>}
{step==='done'&&<>
  <div style={{textAlign:'center',padding:'80px 20px'}}>
    <div style={{fontSize:'4rem',marginBottom:16}}>🎉</div>
    <h2 style={{fontSize:'1.4rem',fontWeight:900,marginBottom:12}}>登録完了！</h2>
    <p style={{color:'rgba(255,255,255,0.8)',fontSize:'0.9rem',lineHeight:1.7,marginBottom:32}}>参加登録ありがとうございます！<br/>毎日クイズに挑戦して上位を目指しましょう！<br/><br/>📧 明日から毎朝クイズのお知らせメールをお届けします。</p>
    <button onClick={()=>window.location.href='/quiz'} style={{width:'100%',maxWidth:320,padding:'16px',background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:16,fontSize:'1.1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit'}}>
      今すぐクイズに挑戦！💧
    </button>
  </div>
</>}
</div></div>)
}
