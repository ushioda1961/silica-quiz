'use client'
import{useState,useEffect}from'react'
import{createClient}from'@supabase/supabase-js'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const ADMIN_PASS='silica2025'
type User={id:string;nickname:string;name:string;email:string;tel:string;postal:string;address:string;total_xp:number;email_notify:boolean;created_at:string}
export default function AdminPage(){
const[auth,setAuth]=useState(false)
const[pass,setPass]=useState('')
const[passErr,setPassErr]=useState('')
const[users,setUsers]=useState<User[]>([])
const[loading,setLoading]=useState(false)
const[search,setSearch]=useState('')
useEffect(()=>{if(auth)fetchUsers()},[auth])
async function fetchUsers(){setLoading(true);const{data}=await sb.from('silica_quiz_users').select('*').order('total_xp',{ascending:false});if(data)setUsers(data as User[]);setLoading(false)}
function login(){if(pass===ADMIN_PASS){setAuth(true);setPassErr('')}else{setPassErr('パスワードが違います')}}
function makeCSV(list:User[]){
  const header='順位,ニックネーム,お名前,メール,電話番号,郵便番号,住所,累計XP,登録日'
  const rows=list.map((u,i)=>[i+1,u.nickname,u.name,u.email,u.tel,u.postal,u.address,u.total_xp,u.created_at.slice(0,10)].join(','))
  return '\uFEFF'+[header,...rows].join('\n')
}
function downloadCSV(){
  const csv=makeCSV(users.slice(0,5))
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='silica_quiz_top5.csv';a.click()
}
function downloadAllCSV(){
  const csv=makeCSV(users)
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='silica_quiz_all.csv';a.click()
}
const filtered=users.filter(u=>u.nickname.includes(search)||u.name.includes(search)||u.email.includes(search))
const S={page:{minHeight:'100vh',background:'#f0f4f8',fontFamily:'sans-serif',padding:'24px 16px'},card:{background:'white',borderRadius:16,padding:24,boxShadow:'0 2px 12px rgba(0,0,0,0.08)',marginBottom:16}}
if(!auth)return(<div style={S.page}><div style={{...S.card,maxWidth:400,margin:'80px auto'}}>
  <h1 style={{fontSize:'1.3rem',fontWeight:900,color:'#1a8cc7',marginBottom:20,textAlign:'center'}}>🔐 管理画面ログイン</h1>
  <input type='password' value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder='管理パスワード'
    style={{width:'100%',padding:'12px 14px',border:'2px solid #daedf7',borderRadius:10,fontSize:'1rem',fontFamily:'inherit',boxSizing:'border-box',outline:'none',marginBottom:10}}/>
  {passErr&&<p style={{color:'#ef476f',fontSize:'0.82rem',marginBottom:10}}>{passErr}</p>}
  <button onClick={login} style={{width:'100%',padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:12,fontSize:'1rem',fontWeight:700,cursor:'pointer'}}>ログイン</button>
</div></div>)
return(<div style={S.page}>
  <div style={{maxWidth:1100,margin:'0 auto'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <h1 style={{fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',margin:0}}>💧 シリカクイズ 管理画面</h1>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <button onClick={fetchUsers} style={{padding:'8px 16px',background:'#f0f4f8',border:'1.5px solid #daedf7',borderRadius:10,cursor:'pointer',fontWeight:700,fontSize:'0.85rem'}}>🔄 更新</button>
        <button onClick={downloadCSV} style={{padding:'8px 16px',background:'linear-gradient(135deg,#ffd166,#ff8c42)',color:'white',border:'none',borderRadius:10,cursor:'pointer',fontWeight:700,fontSize:'0.85rem'}}>📦 上位5名CSV</button>
        <button onClick={downloadAllCSV} style={{padding:'8px 16px',background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:10,cursor:'pointer',fontWeight:700,fontSize:'0.85rem'}}>📋 全員CSV</button>
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
      {[{l:'総参加者数',v:users.length+'名',c:'#1a8cc7'},{l:'プレゼント対象（上位5名）',v:Math.min(5,users.length)+'名',c:'#ff8c42'},{l:'最高XP',v:users[0]?users[0].total_xp.toLocaleString()+' XP':'--',c:'#06d6a0'}].map(s=>(<div key={s.l} style={{...S.card,textAlign:'center',padding:'16px',marginBottom:0}}>
        <div style={{fontSize:'1.8rem',fontWeight:900,color:s.c}}>{s.v}</div>
        <div style={{fontSize:'0.75rem',color:'#6b7f92',marginTop:4}}>{s.l}</div>
      </div>))}
    </div>
    <div style={S.card}>
      <h2 style={{margin:'0 0 14px',fontSize:'1rem',fontWeight:900,color:'#2d3a4a'}}>🏆 プレゼント対象 TOP5</h2>
      {users.slice(0,5).map((u,i)=>(<div key={u.id} style={{display:'flex',gap:12,alignItems:'center',padding:'12px 14px',borderRadius:12,marginBottom:8,background:i===0?'#fff9e6':i===1?'#f8f8f8':i===2?'#f0faff':'#fafafa',border:i===0?'2px solid #ffd166':i===1?'1.5px solid #ccc':i===2?'1.5px solid #b0d8ff':'1.5px solid #eee'}}>
        <span style={{fontSize:'1.4rem'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i===3?'4️⃣':'5️⃣'}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:800,color:'#2d3a4a',fontSize:'0.95rem'}}>{u.nickname} <span style={{fontWeight:400,color:'#6b7f92',fontSize:'0.8rem'}}>（{u.name}）</span></div>
          <div style={{fontSize:'0.78rem',color:'#6b7f92',marginTop:2}}>📧 {u.email} ｜ 📞 {u.tel}</div>
          <div style={{fontSize:'0.78rem',color:'#6b7f92'}}>📮 〒{u.postal} {u.address}</div>
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{fontWeight:900,color:'#1a8cc7',fontSize:'1.1rem'}}>{u.total_xp.toLocaleString()} XP</div>
          <div style={{fontSize:'0.7rem',color:'#aab'}}>{u.created_at.slice(0,10)}登録</div>
        </div>
      </div>))}
      {users.length===0&&!loading&&<p style={{color:'#aab',textAlign:'center',padding:20}}>まだ参加者がいません</p>}
      {loading&&<p style={{color:'#aab',textAlign:'center',padding:20}}>読み込み中...</p>}
    </div>
    <div style={S.card}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14,flexWrap:'wrap'}}>
        <h2 style={{margin:0,fontSize:'1rem',fontWeight:900,color:'#2d3a4a'}}>👥 全参加者一覧（{filtered.length}名）</h2>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder='名前・メールで検索...'
          style={{padding:'6px 12px',border:'1.5px solid #daedf7',borderRadius:8,fontSize:'0.85rem',outline:'none',minWidth:200}}/>
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.82rem'}}>
          <thead><tr style={{background:'#f0f4f8'}}>{['順位','ニックネーム','お名前','メール','電話','郵便番号','住所','XP','登録日'].map(h=>(<th key={h} style={{padding:'8px 10px',textAlign:'left',fontWeight:700,color:'#6b7f92',whiteSpace:'nowrap'}}>{h}</th>))}</tr></thead>
          <tbody>{filtered.map((u,i)=>(<tr key={u.id} style={{borderBottom:'1px solid #f0f0f0',background:i<5?'rgba(59,191,239,0.04)':'white'}}>
            <td style={{padding:'8px 10px',fontWeight:700,color:i<5?'#1a8cc7':'#2d3a4a'}}>#{i+1}{i<5?' 🎁':''}</td>
            <td style={{padding:'8px 10px',fontWeight:700}}>{u.nickname}</td>
            <td style={{padding:'8px 10px'}}>{u.name}</td>
            <td style={{padding:'8px 10px',color:'#6b7f92'}}>{u.email}</td>
            <td style={{padding:'8px 10px',color:'#6b7f92',whiteSpace:'nowrap'}}>{u.tel}</td>
            <td style={{padding:'8px 10px',color:'#6b7f92'}}>{u.postal}</td>
            <td style={{padding:'8px 10px',color:'#6b7f92'}}>{u.address}</td>
            <td style={{padding:'8px 10px',fontWeight:700,color:'#1a8cc7',whiteSpace:'nowrap'}}>{u.total_xp.toLocaleString()} XP</td>
            <td style={{padding:'8px 10px',color:'#aab',whiteSpace:'nowrap'}}>{u.created_at.slice(0,10)}</td>
          </tr>))}</tbody>
        </table>
        {filtered.length===0&&<p style={{color:'#aab',textAlign:'center',padding:20}}>該当者なし</p>}
      </div>
    </div>
  </div>
</div>)
}
