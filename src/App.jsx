// ===== DATA LAYER (LOCAL STORAGE) =====
const DB = {
  async getClients() {
    try {
      const data = localStorage.getItem("ag_clients");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async saveClients(data) {
    try {
      localStorage.setItem("ag_clients", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  },

  async getTransactions() {
    try {
      const data = localStorage.getItem("ag_transactions");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async saveTransactions(data) {
    try {
      localStorage.setItem("ag_transactions", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
};
  const onKey = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div dir="rtl" lang="ar" style={{minHeight:"100vh",background:"#0f1923",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cairo','Tajawal',sans-serif",padding:24}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-8px)}
          80%{transform:translateX(8px)}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(24px)}
          to{opacity:1;transform:translateY(0)}
        }
        .login-card { animation: fadeUp .5s ease; }
        .shake { animation: shake .5s ease !important; }
        .login-inp {
          background: #0f1923;
          border: 1px solid #c9a84c44;
          border-radius: 10px;
          color: #e8dcc8;
          padding: 13px 16px;
          font-family: 'Cairo', sans-serif;
          font-size: 15px;
          width: 100%;
          box-sizing: border-box;
          direction: rtl;
          text-align: right;
          transition: border .2s, box-shadow .2s;
          outline: none;
        }
        .login-inp:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px #c9a84c22; }
        .login-btn {
          width: 100%;
          background: linear-gradient(135deg,#c9a84c,#e6c86e);
          color: #0f1923;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Cairo', sans-serif;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all .2s;
          margin-top: 8px;
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px #c9a84c55; }
        .login-btn:active { transform: translateY(0); }
      `}</style>

      <div className={`login-card${shaking?" shake":""}`}
        style={{background:"#16202e",border:"1px solid #c9a84c33",borderRadius:20,padding:"48px 40px",width:"100%",maxWidth:420,boxShadow:"0 24px 80px #00000088"}}>

        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#c9a84c,#e6c86e)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28,fontWeight:900,color:"#0f1923"}}>ش</div>
          <div style={{fontSize:20,fontWeight:800,color:"#c9a84c"}}>{COMPANY}</div>
          <div style={{fontSize:13,color:"#e8dcc855",marginTop:6}}>نظام إدارة الحسابات</div>
        </div>

        <div style={{marginBottom:18}}>
          <label style={{fontSize:13,color:"#e8dcc877",fontWeight:600,display:"block",marginBottom:8}}>اسم المستخدم</label>
          <input className="login-inp" value={user} onChange={e=>setUser(e.target.value)} onKeyDown={onKey} placeholder="أدخل اسم المستخدم" autoComplete="username" />
        </div>

        <div style={{marginBottom:24}}>
          <label style={{fontSize:13,color:"#e8dcc877",fontWeight:600,display:"block",marginBottom:8}}>كلمة المرور</label>
          <div style={{position:"relative"}}>
            <input className="login-inp" type={showPass?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={onKey} placeholder="أدخل كلمة المرور" autoComplete="current-password" style={{paddingLeft:44}} />
            <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#c9a84c88",fontSize:18,lineHeight:1,padding:4}}>
              {showPass ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{background:"#f441",border:"1px solid #f448",borderRadius:8,padding:"10px 14px",color:"#f88",fontSize:14,textAlign:"center",marginBottom:16,fontWeight:600}}>
            ⚠️ {error}
          </div>
        )}

        <button className="login-btn" onClick={submit}>دخول</button>

        <div style={{textAlign:"center",marginTop:20,fontSize:12,color:"#e8dcc833"}}>
          🔒 هذا النظام محمي بكلمة مرور
        </div>
      </div>
    </div>
  );
}


const fmt = (n) => Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const today = () => new Date().toISOString().slice(0, 10);

const numToAr = (n) => {
  const ones = ["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة","أحد عشر","اثنا عشر","ثلاثة عشر","أربعة عشر","خمسة عشر","ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر"];
  const tens = ["","","عشرون","ثلاثون","أربعون","خمسون","ستون","سبعون","ثمانون","تسعون"];
  const hundreds = ["","مائة","مئتان","ثلاثمائة","أربعمائة","خمسمائة","ستمائة","سبعمائة","ثمانمائة","تسعمائة"];
  const thousands = ["","ألف","ألفان","ثلاثة آلاف","أربعة آلاف","خمسة آلاف","ستة آلاف","سبعة آلاف","ثمانية آلاف","تسعة آلاف","عشرة آلاف","أحد عشر ألفاً","اثنا عشر ألفاً","ثلاثة عشر ألفاً","أربعة عشر ألفاً","خمسة عشر ألفاً","ستة عشر ألفاً","سبعة عشر ألفاً","ثمانية عشر ألفاً","تسعة عشر ألفاً"];
  if (n === 0) return "صفر";
  if (n < 0) return "سالب " + numToAr(-n);
  let result = "";
  const int = Math.floor(n);
  const dec = Math.round((n - int) * 100);
  if (int >= 20000) result = fmt(int) + " ";
  else if (int >= 1000) result = thousands[Math.floor(int/1000)] + (int%1000 > 0 ? " و" : "");
  const rem = int % 1000;
  if (rem >= 100) result += hundreds[Math.floor(rem/100)] + (rem%100 > 0 ? " و" : "");
  const r2 = rem % 100;
  if (r2 < 20) result += ones[r2];
  else result += tens[Math.floor(r2/10)] + (r2%10 > 0 ? " و" + ones[r2%10] : "");
  if (dec > 0) result += " و" + numToAr(dec) + " سنت";
  return result.trim() + " دولار";
};

const printStyles = `
@media print {
  body * { visibility: hidden !important; }
  #print-area, #print-area * { visibility: visible !important; }
  #print-area { position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; background: white; padding: 20px; direction: rtl; }
  @page { size: A4; margin: 1cm; }
}
`;

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  body, html {
    direction: rtl;
    font-family: 'Cairo', 'Tajawal', sans-serif;
  }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #0f1923; }
  ::-webkit-scrollbar-thumb { background: #c9a84c44; border-radius: 3px; }

  input, select, textarea {
    outline: none !important;
    direction: rtl;
    text-align: right;
    font-family: 'Cairo', 'Tajawal', sans-serif !important;
    unicode-bidi: embed;
  }

  input::placeholder {
    direction: rtl;
    text-align: right;
    font-family: 'Cairo', 'Tajawal', sans-serif;
  }

  .tab-btn { transition: all .2s; cursor: pointer; border: none; font-family: 'Cairo', 'Tajawal', sans-serif; }
  .tab-btn:hover { background: #c9a84c22 !important; }
  .row-hover:hover { background: #c9a84c0a !important; transition: background .15s; }
  .action-btn { transition: all .15s; cursor: pointer; }
  .action-btn:hover { opacity: .8; transform: scale(1.05); }
  .card { background: #16202e; border: 1px solid #c9a84c22; border-radius: 12px; }

  .inp {
    background: #0f1923;
    border: 1px solid #c9a84c44;
    border-radius: 8px;
    color: #e8dcc8;
    padding: 10px 14px;
    font-family: 'Cairo', 'Tajawal', sans-serif !important;
    font-size: 15px;
    width: 100%;
    transition: border .2s;
    direction: rtl;
    text-align: right;
    unicode-bidi: embed;
  }
  .inp:focus { border-color: #c9a84c; }

  .btn-gold {
    background: linear-gradient(135deg, #c9a84c, #e6c86e);
    color: #0f1923;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-family: 'Cairo', 'Tajawal', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    white-space: nowrap;
  }
  .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 4px 20px #c9a84c55; }

  .btn-outline {
    background: transparent;
    border: 1px solid #c9a84c55;
    color: #c9a84c;
    border-radius: 8px;
    padding: 8px 16px;
    font-family: 'Cairo', 'Tajawal', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all .2s;
    white-space: nowrap;
  }
  .btn-outline:hover { background: #c9a84c11; border-color: #c9a84c; }

  label {
    font-family: 'Cairo', 'Tajawal', sans-serif;
    direction: rtl;
    display: block;
  }

  th, td {
    font-family: 'Cairo', 'Tajawal', sans-serif;
    direction: rtl;
  }

  .num-cell {
    direction: ltr !important;
    text-align: left !important;
    font-family: 'Courier New', monospace !important;
    unicode-bidi: embed;
  }
`;

const TABS = ["لوحة التحكم", "العملاء", "المعاملات", "كشف الحساب"];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("aq_auth") === "1");
  const [tab, setTab] = useState(0);
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  if (!loggedIn) return <LoginScreen onLogin={() => { sessionStorage.setItem("aq_auth","1"); setLoggedIn(true); }} />;

  useEffect(() => {
    (async () => {
      const [c, t] = await Promise.all([DB.getClients(), DB.getTransactions()]);
      setClients(c); setTransactions(t); setLoading(false);
    })();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const saveClients = async (data) => { setClients(data); await DB.saveClients(data); };
  const saveTx = async (data) => { setTransactions(data); await DB.saveTransactions(data); };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0f1923",color:"#c9a84c",fontFamily:"'Cairo',sans-serif",fontSize:22,direction:"rtl"}}>
      جاري تحميل البيانات...
    </div>
  );

  return (
    <div dir="rtl" lang="ar" style={{minHeight:"100vh",background:"#0f1923",fontFamily:"'Cairo','Tajawal',sans-serif",color:"#e8dcc8",direction:"rtl"}}>
      <style>{printStyles}</style>
      <style>{globalStyles}</style>

      {/* HEADER */}
      <div style={{background:"#16202e",borderBottom:"1px solid #c9a84c33",padding:"0 32px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:1400,margin:"0 auto",height:64,direction:"rtl"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#c9a84c,#e6c86e)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#0f1923",fontSize:20,fontFamily:"'Cairo',sans-serif",flexShrink:0}}>ش</div>
            <div>
              <div style={{fontWeight:800,fontSize:17,color:"#c9a84c",fontFamily:"'Cairo',sans-serif",whiteSpace:"nowrap"}}>{COMPANY}</div>
              <div style={{fontSize:11,color:"#e8dcc888",fontFamily:"'Cairo',sans-serif"}}>نظام إدارة الحسابات</div>
            </div>
          </div>
          <nav style={{display:"flex",gap:4}}>
            {TABS.map((t,i) => (
              <button key={i} className="tab-btn" onClick={() => setTab(i)}
                style={{padding:"8px 18px",borderRadius:8,fontSize:14,fontFamily:"'Cairo',sans-serif",fontWeight:tab===i?700:400,background:tab===i?"linear-gradient(135deg,#c9a84c,#e6c86e)":"transparent",color:tab===i?"#0f1923":"#e8dcc899",border:tab===i?"none":"1px solid transparent",whiteSpace:"nowrap"}}>
                {t}
              </button>
            ))}
          </nav>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{fontSize:12,color:"#e8dcc866",fontFamily:"'Cairo',sans-serif",whiteSpace:"nowrap"}}>
              {new Date().toLocaleDateString("ar-LY",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </div>
            <button onClick={()=>{ sessionStorage.removeItem("aq_auth"); setLoggedIn(false); }}
              style={{background:"#f441",border:"1px solid #f448",color:"#f88",borderRadius:8,padding:"6px 14px",fontFamily:"'Cairo',sans-serif",fontSize:13,cursor:"pointer",whiteSpace:"nowrap",fontWeight:700}}>
              خروج
            </button>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{position:"fixed",top:76,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:toast.type==="success"?"#1a3a2a":"#3a1a1a",border:`1px solid ${toast.type==="success"?"#4caf7a":"#f44"}`,borderRadius:10,padding:"12px 28px",color:toast.type==="success"?"#4caf7a":"#f88",fontWeight:700,fontSize:15,boxShadow:"0 8px 32px #0008",fontFamily:"'Cairo',sans-serif",direction:"rtl"}}>
          {toast.msg}
        </div>
      )}

      <div style={{maxWidth:1400,margin:"0 auto",padding:"28px 32px",direction:"rtl"}}>
        {tab === 0 && <Dashboard clients={clients} transactions={transactions} />}
        {tab === 1 && <Clients clients={clients} saveClients={saveClients} showToast={showToast} />}
        {tab === 2 && <Transactions clients={clients} transactions={transactions} saveTx={saveTx} showToast={showToast} />}
        {tab === 3 && <Statement clients={clients} transactions={transactions} />}
      </div>
    </div>
  );
}

// ===== DASHBOARD =====
function Dashboard({ clients, transactions }) {
  const totalCredit = transactions.reduce((s,t) => s+(t.credit||0), 0);
  const totalDebit  = transactions.reduce((s,t) => s+(t.debit||0),  0);
  const stats = [
    { label:"إجمالي العملاء",      value: clients.length,       icon:"👥", color:"#4a9eff" },
    { label:"إجمالي المعاملات",    value: transactions.length,  icon:"📋", color:"#c9a84c" },
    { label:"إجمالي الدائن ($)",   value: fmt(totalCredit),     icon:"📈", color:"#4caf7a" },
    { label:"إجمالي المدين ($)",   value: fmt(totalDebit),      icon:"📉", color:"#f77" },
  ];
  const recent = [...transactions].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,7);

  return (
    <div dir="rtl">
      <h2 style={{color:"#c9a84c",marginBottom:24,fontSize:22,fontWeight:800}}>لوحة التحكم</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
        {stats.map((s,i) => (
          <div key={i} className="card" style={{padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:12,color:"#e8dcc877",marginBottom:8}}>{s.label}</div>
                <div style={{fontSize:22,fontWeight:800,color:s.color,direction:"ltr",textAlign:"left"}}>{s.value}</div>
              </div>
              <div style={{fontSize:26,opacity:.7}}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:24}}>
        <h3 style={{color:"#c9a84c",marginBottom:16,fontSize:16,fontWeight:700}}>آخر المعاملات</h3>
        {recent.length === 0
          ? <div style={{color:"#e8dcc855",textAlign:"center",padding:40}}>لا توجد معاملات بعد</div>
          : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,direction:"rtl"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #c9a84c33"}}>
                    {["التاريخ","العميل","التفاصيل","مدين","دائن"].map(h=>(
                      <th key={h} style={{padding:"8px 12px",textAlign:"right",color:"#c9a84c88",fontWeight:700}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.map((t,i)=>(
                    <tr key={i} className="row-hover" style={{borderBottom:"1px solid #c9a84c11"}}>
                      <td style={{padding:"10px 12px",color:"#e8dcc899",whiteSpace:"nowrap",direction:"ltr",textAlign:"right"}}>{t.date}</td>
                      <td style={{padding:"10px 12px",fontWeight:600}}>{t.clientName}</td>
                      <td style={{padding:"10px 12px",color:"#e8dcc899",maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.details}</td>
                      <td className="num-cell" style={{padding:"10px 12px",color:"#f88"}}>{t.debit  ? fmt(t.debit)  : "—"}</td>
                      <td className="num-cell" style={{padding:"10px 12px",color:"#4caf7a"}}>{t.credit ? fmt(t.credit) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}

// ===== CLIENTS =====
function Clients({ clients, saveClients, showToast }) {
  const empty = { name:"", code:"", prevBalance:0, phone:"" };
  const [form, setForm]     = useState(empty);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = clients.filter(c => c.name.includes(search) || c.code.includes(search));

  const F = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async () => {
    if (!form.name.trim() || !form.code.trim()) { showToast("يرجى إدخال الاسم والكود","error"); return; }
    if (!editId && clients.find(c=>c.code===form.code)) { showToast("هذا الكود موجود مسبقاً","error"); return; }
    const entry = { ...form, prevBalance: Number(form.prevBalance)||0 };
    let updated;
    if (editId) {
      updated = clients.map(c=>c.id===editId ? {...c,...entry} : c);
      showToast("تم تعديل بيانات العميل بنجاح ✓");
    } else {
      updated = [...clients, { ...entry, id: Date.now().toString() }];
      showToast("تم إضافة العميل بنجاح ✓");
    }
    await saveClients(updated);
    setForm(empty); setEditId(null); setShowForm(false);
  };

  const del = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل؟")) return;
    await saveClients(clients.filter(c=>c.id!==id));
    showToast("تم حذف العميل");
  };

  const startEdit = (c) => {
    setForm({ name:c.name, code:c.code, prevBalance:c.prevBalance||0, phone:c.phone||"" });
    setEditId(c.id); setShowForm(true);
  };

  const LBL = ({children}) => (
    <label style={{fontSize:13,color:"#e8dcc877",marginBottom:6,fontWeight:600,display:"block",direction:"rtl"}}>{children}</label>
  );

  return (
    <div dir="rtl">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <h2 style={{color:"#c9a84c",fontSize:22,fontWeight:800}}>إدارة العملاء</h2>
        <button className="btn-gold" onClick={()=>{ setShowForm(!showForm); setEditId(null); setForm(empty); }}>
          {showForm ? "✕ إلغاء" : "+ إضافة عميل"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{padding:24,marginBottom:24}}>
          <h3 style={{color:"#c9a84c",marginBottom:20,fontSize:16,fontWeight:700}}>{editId ? "✏️ تعديل العميل" : "➕ إضافة عميل جديد"}</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
            <div><LBL>اسم العميل *</LBL><input className="inp" value={form.name} onChange={e=>F("name",e.target.value)} placeholder="الاسم الكامل" /></div>
            <div><LBL>الكود *</LBL><input className="inp" value={form.code} onChange={e=>F("code",e.target.value)} placeholder="مثال: 1074" /></div>
            <div><LBL>الرصيد السابق ($)</LBL><input className="inp" type="number" value={form.prevBalance} onChange={e=>F("prevBalance",e.target.value)} placeholder="0.00" style={{direction:"ltr",textAlign:"left"}} /></div>
            <div><LBL>رقم الهاتف</LBL><input className="inp" value={form.phone} onChange={e=>F("phone",e.target.value)} placeholder="+218..." style={{direction:"ltr",textAlign:"left"}} /></div>
          </div>
          <div style={{marginTop:20}}>
            <button className="btn-gold" onClick={submit}>{editId ? "💾 حفظ التعديلات" : "✅ إضافة العميل"}</button>
          </div>
        </div>
      )}

      <div className="card" style={{padding:24}}>
        <div style={{marginBottom:16}}>
          <input className="inp" style={{maxWidth:320}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  بحث بالاسم أو الكود..." />
        </div>
        {filtered.length === 0
          ? <div style={{color:"#e8dcc855",textAlign:"center",padding:56}}>لا يوجد عملاء</div>
          : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,direction:"rtl"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #c9a84c33"}}>
                    {["الكود","الاسم","رقم الهاتف","الرصيد السابق","الإجراءات"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:"right",color:"#c9a84c88",fontWeight:700}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c=>(
                    <tr key={c.id} className="row-hover" style={{borderBottom:"1px solid #c9a84c11"}}>
                      <td style={{padding:"12px 14px"}}>
                        <span style={{background:"#c9a84c22",color:"#c9a84c",padding:"3px 12px",borderRadius:20,fontSize:13,fontWeight:700}}>{c.code}</span>
                      </td>
                      <td style={{padding:"12px 14px",fontWeight:700}}>{c.name}</td>
                      <td style={{padding:"12px 14px",color:"#e8dcc899",direction:"ltr",textAlign:"right"}}>{c.phone||"—"}</td>
                      <td className="num-cell" style={{padding:"12px 14px",color:c.prevBalance>=0?"#4caf7a":"#f88",fontWeight:700}}>${fmt(c.prevBalance||0)}</td>
                      <td style={{padding:"12px 14px"}}>
                        <div style={{display:"flex",gap:8}}>
                          <button className="action-btn btn-outline" onClick={()=>startEdit(c)}>تعديل</button>
                          <button className="action-btn" onClick={()=>del(c.id)} style={{background:"#f441",border:"1px solid #f448",color:"#f88",borderRadius:8,padding:"6px 14px",fontFamily:"'Cairo',sans-serif",fontSize:13,cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap"}}>حذف</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}

// ===== TRANSACTIONS =====
function Transactions({ clients, transactions, saveTx, showToast }) {
  const empty = { clientId:"", date:today(), details:"", debit:"", credit:"" };
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const F = (k,v) => setForm(f=>({...f,[k]:v}));

  const filtered = transactions
    .filter(t => (!filter||t.clientId===filter) && (!search||t.details.includes(search)||t.clientName.includes(search)))
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const add = async () => {
    if (!form.clientId)        { showToast("يرجى اختيار العميل","error"); return; }
    if (!form.details.trim())  { showToast("يرجى إدخال التفاصيل","error"); return; }
    if (!form.debit && !form.credit) { showToast("يرجى إدخال مبلغ المدين أو الدائن","error"); return; }
    const client = clients.find(c=>c.id===form.clientId);
    const tx = { ...form, id:Date.now().toString(), clientName:client.name, clientCode:client.code, debit:Number(form.debit)||0, credit:Number(form.credit)||0 };
    await saveTx([...transactions, tx]);
    setForm(empty);
    showToast("تمت إضافة المعاملة بنجاح ✓");
  };

  const del = async (id) => {
    if (!confirm("هل تريد حذف هذه المعاملة؟")) return;
    await saveTx(transactions.filter(t=>t.id!==id));
    showToast("تم حذف المعاملة");
  };

  const LBL = ({children}) => (
    <label style={{fontSize:13,color:"#e8dcc877",marginBottom:6,fontWeight:600,display:"block",direction:"rtl"}}>{children}</label>
  );

  return (
    <div dir="rtl">
      <h2 style={{color:"#c9a84c",marginBottom:24,fontSize:22,fontWeight:800}}>المعاملات المالية</h2>

      <div className="card" style={{padding:24,marginBottom:24}}>
        <h3 style={{color:"#c9a84c",marginBottom:20,fontSize:16,fontWeight:700}}>➕ إضافة معاملة جديدة</h3>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 3fr 1fr 1fr",gap:16,alignItems:"end"}}>
          <div>
            <LBL>العميل *</LBL>
            <select className="inp" value={form.clientId} onChange={e=>F("clientId",e.target.value)}>
              <option value="">-- اختر العميل --</option>
              {clients.map(c=><option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
            </select>
          </div>
          <div>
            <LBL>التاريخ</LBL>
            <input className="inp" type="date" value={form.date} onChange={e=>F("date",e.target.value)} style={{direction:"ltr",textAlign:"left"}} />
          </div>
          <div>
            <LBL>التفاصيل *</LBL>
            <input className="inp" value={form.details} onChange={e=>F("details",e.target.value)} placeholder="تفاصيل المعاملة..." />
          </div>
          <div>
            <LBL>مدين ($)</LBL>
            <input className="inp" type="number" min="0" value={form.debit} onChange={e=>F("debit",e.target.value)} placeholder="0.00" style={{direction:"ltr",textAlign:"left"}} />
          </div>
          <div>
            <LBL>دائن ($)</LBL>
            <input className="inp" type="number" min="0" value={form.credit} onChange={e=>F("credit",e.target.value)} placeholder="0.00" style={{direction:"ltr",textAlign:"left"}} />
          </div>
        </div>
        <div style={{marginTop:20}}>
          <button className="btn-gold" onClick={add}>✅ إضافة المعاملة</button>
        </div>
      </div>

      <div className="card" style={{padding:24}}>
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
          <input className="inp" style={{maxWidth:280}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  بحث في التفاصيل أو الاسم..." />
          <select className="inp" style={{maxWidth:250}} value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="">كل العملاء</option>
            {clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{fontSize:13,color:"#e8dcc855",marginBottom:12}}>{filtered.length} معاملة</div>

        {filtered.length === 0
          ? <div style={{color:"#e8dcc855",textAlign:"center",padding:56}}>لا توجد معاملات</div>
          : (
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,direction:"rtl",minWidth:680}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #c9a84c33"}}>
                    <th style={{padding:"10px 12px",textAlign:"right",color:"#c9a84c88",fontWeight:700}}>التاريخ</th>
                    <th style={{padding:"10px 12px",textAlign:"right",color:"#c9a84c88",fontWeight:700}}>العميل</th>
                    <th style={{padding:"10px 12px",textAlign:"right",color:"#c9a84c88",fontWeight:700}}>التفاصيل</th>
                    <th style={{padding:"10px 12px",textAlign:"left",color:"#c9a84c88",fontWeight:700}}>مدين ($)</th>
                    <th style={{padding:"10px 12px",textAlign:"left",color:"#c9a84c88",fontWeight:700}}>دائن ($)</th>
                    <th style={{padding:"10px 12px",color:"#c9a84c88",fontWeight:700}}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t=>(
                    <tr key={t.id} className="row-hover" style={{borderBottom:"1px solid #c9a84c11"}}>
                      <td style={{padding:"10px 12px",color:"#e8dcc899",whiteSpace:"nowrap",direction:"ltr",textAlign:"right"}}>{t.date}</td>
                      <td style={{padding:"10px 12px"}}>
                        <span style={{fontWeight:600}}>{t.clientName}</span>
                        <span style={{fontSize:11,color:"#c9a84c77",marginRight:6}}>({t.clientCode})</span>
                      </td>
                      <td style={{padding:"10px 12px",color:"#e8dcc8cc",maxWidth:300}}>{t.details}</td>
                      <td className="num-cell" style={{padding:"10px 12px",color:"#f88"}}>{t.debit  ? fmt(t.debit)  : "—"}</td>
                      <td className="num-cell" style={{padding:"10px 12px",color:"#4caf7a"}}>{t.credit ? fmt(t.credit) : "—"}</td>
                      <td style={{padding:"10px 12px"}}>
                        <button className="action-btn" onClick={()=>del(t.id)} style={{background:"#f441",border:"1px solid #f448",color:"#f88",borderRadius:6,padding:"4px 12px",fontFamily:"'Cairo',sans-serif",fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}

// ===== STATEMENT =====
function Statement({ clients, transactions }) {
  const [clientId, setClientId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState(today());
  const printRef = useRef();

  const client = clients.find(c=>c.id===clientId);

  const txs = transactions
    .filter(t => t.clientId===clientId && (!from||t.date>=from) && (!to||t.date<=to))
    .sort((a,b)=>new Date(a.date)-new Date(b.date));

  let balance = client ? (client.prevBalance||0) : 0;
  const rows = txs.map(t => {
    balance += (t.credit||0) - (t.debit||0);
    return { ...t, balance };
  });

  const totalDebit  = txs.reduce((s,t)=>s+(t.debit||0),  0);
  const totalCredit = txs.reduce((s,t)=>s+(t.credit||0), 0);
  const finalBalance = balance;

  return (
    <div dir="rtl">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <h2 style={{color:"#c9a84c",fontSize:22,fontWeight:800}}>كشف الحساب</h2>
        {client && rows.length>0 && (
          <button className="btn-gold" onClick={()=>window.print()}>🖨️ طباعة / PDF</button>
        )}
      </div>

      <div className="card" style={{padding:24,marginBottom:24}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:16,alignItems:"end"}}>
          <div>
            <label style={{fontSize:13,color:"#e8dcc877",marginBottom:6,display:"block",fontWeight:600}}>اختر العميل</label>
            <select className="inp" value={clientId} onChange={e=>setClientId(e.target.value)}>
              <option value="">-- اختر عميلاً --</option>
              {clients.map(c=><option key={c.id} value={c.id}>{c.name} — كود {c.code}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:13,color:"#e8dcc877",marginBottom:6,display:"block",fontWeight:600}}>من تاريخ</label>
            <input className="inp" type="date" value={from} onChange={e=>setFrom(e.target.value)} style={{direction:"ltr",textAlign:"left"}} />
          </div>
          <div>
            <label style={{fontSize:13,color:"#e8dcc877",marginBottom:6,display:"block",fontWeight:600}}>إلى تاريخ</label>
            <input className="inp" type="date" value={to} onChange={e=>setTo(e.target.value)} style={{direction:"ltr",textAlign:"left"}} />
          </div>
        </div>
      </div>

      {!client && (
        <div style={{textAlign:"center",padding:80,color:"#e8dcc844",fontSize:18}}>
          اختر عميلاً لعرض كشف حسابه
        </div>
      )}

      {client && (
        <div id="print-area" ref={printRef}>
          <div className="card" style={{padding:0,overflow:"hidden"}}>

            {/* كشف — رأس الصفحة */}
            <div style={{background:"linear-gradient(135deg,#16202e,#1a2a3a)",padding:"24px 32px",borderBottom:"2px solid #c9a84c44"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",direction:"rtl"}}>
                <div>
                  <div style={{fontSize:22,fontWeight:800,color:"#c9a84c",fontFamily:"'Cairo',sans-serif"}}>{COMPANY}</div>
                  <div style={{fontSize:13,color:"#e8dcc877",marginTop:4}}>اسطنبول / لالي عمارة البركة الدور الثاني</div>
                  <div style={{fontSize:13,color:"#e8dcc877",direction:"ltr",textAlign:"right"}}>+905352915648 / +218912142701</div>
                </div>
                <div style={{textAlign:"left"}}>
                  {from && <div style={{fontSize:13,color:"#e8dcc899"}}>من تاريخ: <strong style={{color:"#c9a84c"}}>{from}</strong></div>}
                  <div style={{fontSize:13,color:"#e8dcc899"}}>إلى تاريخ: <strong style={{color:"#c9a84c"}}>{to}</strong></div>
                  <div style={{fontSize:13,color:"#e8dcc899",marginTop:4}}>الرصيد السابق: <strong style={{color:"#4caf7a"}}>${fmt(client.prevBalance||0)}</strong></div>
                </div>
              </div>
              <div style={{marginTop:16,padding:"12px 18px",background:"#c9a84c15",border:"1px solid #c9a84c33",borderRadius:8}}>
                <span style={{color:"#c9a84c",fontWeight:700,fontSize:16}}>كشف حساب # {client.name} كود {client.code} # عملاء () (الكل) - دولار</span>
              </div>
            </div>

            {/* الجدول */}
            <div style={{padding:"0 6px"}}>
              {rows.length === 0
                ? <div style={{textAlign:"center",padding:64,color:"#e8dcc855"}}>لا توجد معاملات في هذه الفترة</div>
                : (
                  <div style={{overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,direction:"rtl",minWidth:680}}>
                      <thead>
                        <tr style={{background:"#c9a84c11",borderBottom:"2px solid #c9a84c33"}}>
                          <th style={{padding:"12px 14px",textAlign:"right",color:"#c9a84c",fontWeight:700,fontSize:13}}>م</th>
                          <th style={{padding:"12px 14px",textAlign:"right",color:"#c9a84c",fontWeight:700,fontSize:13}}>التاريخ</th>
                          <th style={{padding:"12px 14px",textAlign:"right",color:"#c9a84c",fontWeight:700,fontSize:13}}>التفاصيل</th>
                          <th style={{padding:"12px 14px",textAlign:"left",color:"#c9a84c",fontWeight:700,fontSize:13}}>عليه (مدين)</th>
                          <th style={{padding:"12px 14px",textAlign:"left",color:"#c9a84c",fontWeight:700,fontSize:13}}>له (دائن)</th>
                          <th style={{padding:"12px 14px",textAlign:"left",color:"#c9a84c",fontWeight:700,fontSize:13}}>الرصيد</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((t,i)=>(
                          <tr key={t.id} className="row-hover" style={{borderBottom:"1px solid #c9a84c0f",background:i%2===0?"transparent":"#ffffff04"}}>
                            <td style={{padding:"11px 14px",color:"#e8dcc866",width:36}}>{i+1}</td>
                            <td style={{padding:"11px 14px",color:"#e8dcc8aa",whiteSpace:"nowrap",direction:"ltr",textAlign:"right"}}>{t.date}</td>
                            <td style={{padding:"11px 14px",maxWidth:360}}>{t.details}</td>
                            <td className="num-cell" style={{padding:"11px 14px",color:"#f88",fontWeight:600}}>{t.debit  ? fmt(t.debit)  : ".00"}</td>
                            <td className="num-cell" style={{padding:"11px 14px",color:"#4caf7a",fontWeight:600}}>{t.credit ? fmt(t.credit) : ".00"}</td>
                            <td className="num-cell" style={{padding:"11px 14px",fontWeight:800,color:t.balance>=0?"#4caf7a":"#f88"}}>{fmt(t.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{borderTop:"2px solid #c9a84c44",background:"#c9a84c0f"}}>
                          <td colSpan={3} style={{padding:"12px 14px",fontWeight:700,color:"#c9a84c",textAlign:"right"}}>إجمالي العمليات :</td>
                          <td className="num-cell" style={{padding:"12px 14px",color:"#f88",fontWeight:800}}>{fmt(totalDebit)}</td>
                          <td className="num-cell" style={{padding:"12px 14px",color:"#4caf7a",fontWeight:800}}>{fmt(totalCredit)}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )
              }
            </div>

            {/* ملخص الرصيد */}
            <div style={{padding:"20px 32px",background:"#16202e",borderTop:"1px solid #c9a84c22",direction:"rtl"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div style={{padding:"12px 16px",background:"#c9a84c0f",borderRadius:8,border:"1px solid #c9a84c22"}}>
                  <span style={{color:"#e8dcc877"}}>الفارق : </span>
                  <span style={{color:totalCredit-totalDebit>=0?"#4caf7a":"#f88",fontWeight:700}}>
                    {totalCredit-totalDebit>=0 ? "له (دائن)" : "عليه (مدين)"}{" = "}
                    <span style={{direction:"ltr",display:"inline-block"}}>${fmt(Math.abs(totalCredit-totalDebit))}</span> دولار
                  </span>
                </div>
                <div style={{padding:"12px 16px",background:"#c9a84c0f",borderRadius:8,border:"1px solid #c9a84c22"}}>
                  <span style={{color:"#e8dcc877"}}>رصيد الفترة : </span>
                  <span style={{color:finalBalance>=0?"#4caf7a":"#f88",fontWeight:700}}>
                    {finalBalance>=0 ? "له (دائن)" : "عليه (مدين)"}{" "}
                    <span style={{direction:"ltr",display:"inline-block"}}>${fmt(Math.abs(finalBalance))}</span> دولار
                  </span>
                </div>
              </div>
              <div style={{padding:"14px 20px",background:"linear-gradient(135deg,#1a3a2a,#162a1a)",border:"1px solid #4caf7a44",borderRadius:10,textAlign:"center"}}>
                <span style={{color:"#e8dcc877",fontSize:14}}>الرصيد الحالي : </span>
                <span style={{color:finalBalance>=0?"#4caf7a":"#f88",fontWeight:800,fontSize:17}}>
                  {finalBalance>=0 ? "له (دائن)" : "عليه (مدين)"}{" "}
                  <span style={{direction:"ltr",display:"inline-block"}}>{fmt(Math.abs(finalBalance))}</span>
                </span>
                <span style={{color:"#e8dcc866",fontSize:13,marginRight:10}}>({numToAr(Math.abs(finalBalance))})</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
