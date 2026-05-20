// ===============================================
// AQ ACCOUNTING SYSTEM — COMPLETE FINAL CODE
// React Single File Component
// ===============================================

import React, { useEffect, useRef, useState } from "react";

const COMPANY = "١٤ ١٣";

// ===== LOGIN CONFIG =====
const AUTH = {
  username: "admin",
  password: "123456"
};

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

// ===== HELPERS =====
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const today = () => new Date().toISOString().slice(0, 10);

// ===== NUMBER TO ARABIC TEXT =====
const numToAr = (n) => {
  const ones = [
    "",
    "واحد",
    "اثنان",
    "ثلاثة",
    "أربعة",
    "خمسة",
    "ستة",
    "سبعة",
    "ثمانية",
    "تسعة",
    "عشرة",
    "أحد عشر",
    "اثنا عشر",
    "ثلاثة عشر",
    "أربعة عشر",
    "خمسة عشر",
    "ستة عشر",
    "سبعة عشر",
    "ثمانية عشر",
    "تسعة عشر"
  ];

  const tens = [
    "",
    "",
    "عشرون",
    "ثلاثون",
    "أربعون",
    "خمسون",
    "ستون",
    "سبعون",
    "ثمانون",
    "تسعون"
  ];

  const hundreds = [
    "",
    "مائة",
    "مئتان",
    "ثلاثمائة",
    "أربعمائة",
    "خمسمائة",
    "ستمائة",
    "سبعمائة",
    "ثمانمائة",
    "تسعمائة"
  ];

  if (n === 0) return "صفر دولار";

  const int = Math.floor(n);
  const dec = Math.round((n - int) * 100);

  let result = "";

  if (int >= 100) {
    result += hundreds[Math.floor(int / 100)];
    if (int % 100 !== 0) result += " و";
  }

  const rem = int % 100;

  if (rem < 20) {
    result += ones[rem];
  } else {
    result += tens[Math.floor(rem / 10)];
    if (rem % 10 !== 0) {
      result += " و" + ones[rem % 10];
    }
  }

  if (dec > 0) {
    result += " و" + dec + " سنت";
  }

  return result + " دولار";
};

// ===== PRINT STYLES =====
const printStyles = `
@media print {
  body * {
    visibility: hidden !important;
  }

  #print-area,
  #print-area * {
    visibility: visible !important;
  }

  #print-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 9999;
    padding: 20px;
  }

  @page {
    size: A4;
    margin: 1cm;
  }
}
`;

// ===== GLOBAL STYLES =====
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');

* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
  background: #0f1923;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #c9a84c55;
  border-radius: 10px;
}

.card {
  background: #16202e;
  border: 1px solid #c9a84c22;
  border-radius: 14px;
}

.inp {
  background: #0f1923;
  border: 1px solid #c9a84c44;
  color: #e8dcc8;
  padding: 10px 14px;
  border-radius: 8px;
  width: 100%;
  font-family: 'Cairo', sans-serif;
}

.inp:focus {
  border-color: #c9a84c;
  outline: none;
}

.btn-gold {
  background: linear-gradient(135deg,#c9a84c,#e6c86e);
  border: none;
  color: #0f1923;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  cursor: pointer;
}

.btn-gold:hover {
  opacity: .92;
}

.row-hover:hover {
  background: #ffffff06;
}

.num-cell {
  direction: ltr;
  text-align: left;
  font-family: monospace;
}
`;

const TABS = [
  "لوحة التحكم",
  "العملاء",
  "المعاملات",
  "كشف الحساب"
];

// ===== LOGIN SCREEN =====
function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (
      user === AUTH.username &&
      pass === AUTH.password
    ) {
      onLogin();
    } else {
      setError("بيانات الدخول غير صحيحة");
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f1923",
        padding: 24
      }}
    >
      <style>{globalStyles}</style>

      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 40
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#c9a84c,#e6c86e)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f1923",
              fontWeight: 900,
              fontSize: 28
            }}
          >
            ش
          </div>

          <div
            style={{
              color: "#c9a84c",
              fontSize: 24,
              fontWeight: 800
            }}
          >
            {COMPANY}
          </div>

          <div
            style={{
              color: "#e8dcc855",
              fontSize: 13,
              marginTop: 6
            }}
          >
            نظام إدارة الحسابات
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              color: "#e8dcc899",
              marginBottom: 6,
              display: "block"
            }}
          >
            اسم المستخدم
          </label>

          <input
            className="inp"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={onKey}
            placeholder="اسم المستخدم"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              color: "#e8dcc899",
              marginBottom: 6,
              display: "block"
            }}
          >
            كلمة المرور
          </label>

          <div style={{ position: "relative" }}>
            <input
              className="inp"
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={onKey}
              placeholder="كلمة المرور"
            />

            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                color: "#c9a84c",
                cursor: "pointer"
              }}
            >
              {showPass ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#f441",
              border: "1px solid #f448",
              padding: 12,
              borderRadius: 8,
              color: "#f88",
              marginBottom: 16,
              textAlign: "center"
            }}
          >
            {error}
          </div>
        )}

        <button
          className="btn-gold"
          style={{ width: "100%" }}
          onClick={submit}
        >
          دخول
        </button>
      </div>
    </div>
  );
}

// ===== APP =====
export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("aq_auth") === "1"
  );

  const [tab, setTab] = useState(0);

  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  if (!loggedIn) {
    return (
      <LoginScreen
        onLogin={() => {
          sessionStorage.setItem("aq_auth", "1");
          setLoggedIn(true);
        }}
      />
    );
  }

  useEffect(() => {
    (async () => {
      const c = await DB.getClients();
      const t = await DB.getTransactions();

      setClients(c);
      setTransactions(t);

      setLoading(false);
    })();
  }, []);

  const saveClients = async (data) => {
    setClients(data);
    await DB.saveClients(data);
  };

  const saveTx = async (data) => {
    setTransactions(data);
    await DB.saveTransactions(data);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c9a84c",
          fontSize: 22
        }}
      >
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#0f1923",
        color: "#e8dcc8"
      }}
    >
      <style>{globalStyles}</style>
      <style>{printStyles}</style>

      {/* HEADER */}
      <div
        style={{
          background: "#16202e",
          borderBottom: "1px solid #c9a84c33",
          padding: "0 30px"
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            height: 70,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              color: "#c9a84c",
              fontWeight: 900,
              fontSize: 20
            }}
          >
            {COMPANY}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className="btn-gold"
                style={{
                  background:
                    tab === i
                      ? "linear-gradient(135deg,#c9a84c,#e6c86e)"
                      : "#ffffff08",
                  color:
                    tab === i
                      ? "#0f1923"
                      : "#e8dcc8"
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("aq_auth");
              setLoggedIn(false);
            }}
            style={{
              background: "#f441",
              border: "1px solid #f448",
              color: "#f88",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer"
            }}
          >
            خروج
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: 30
        }}
      >
        {tab === 0 && (
          <Dashboard
            clients={clients}
            transactions={transactions}
          />
        )}

        {tab === 1 && (
          <Clients
            clients={clients}
            saveClients={saveClients}
          />
        )}

        {tab === 2 && (
          <Transactions
            clients={clients}
            transactions={transactions}
            saveTx={saveTx}
          />
        )}

        {tab === 3 && (
          <Statement
            clients={clients}
            transactions={transactions}
          />
        )}
      </div>
    </div>
  );
}

// ===== DASHBOARD =====
function Dashboard({ clients, transactions }) {
  const totalCredit = transactions.reduce(
    (s, t) => s + (t.credit || 0),
    0
  );

  const totalDebit = transactions.reduce(
    (s, t) => s + (t.debit || 0),
    0
  );

  return (
    <div>
      <h2
        style={{
          color: "#c9a84c",
          marginBottom: 20
        }}
      >
        لوحة التحكم
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16
        }}
      >
        <StatCard
          title="إجمالي العملاء"
          value={clients.length}
          color="#4a9eff"
        />

        <StatCard
          title="إجمالي المعاملات"
          value={transactions.length}
          color="#c9a84c"
        />

        <StatCard
          title="إجمالي الدائن"
          value={`$ ${fmt(totalCredit)}`}
          color="#4caf7a"
        />

        <StatCard
          title="إجمالي المدين"
          value={`$ ${fmt(totalDebit)}`}
          color="#f88"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div
        style={{
          color: "#e8dcc877",
          marginBottom: 10
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ===== CLIENTS =====
function Clients({ clients, saveClients }) {
  const empty = {
    name: "",
    code: "",
    phone: "",
    prevBalance: 0
  };

  const [form, setForm] = useState(empty);

  const add = async () => {
    if (!form.name || !form.code) {
      alert("أدخل الاسم والكود");
      return;
    }

    const item = {
      ...form,
      id: Date.now().toString(),
      prevBalance:
        Number(form.prevBalance) || 0
    };

    await saveClients([...clients, item]);

    setForm(empty);
  };

  return (
    <div>
      <h2
        style={{
          color: "#c9a84c",
          marginBottom: 20
        }}
      >
        العملاء
      </h2>

      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 24
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16
          }}
        >
          <input
            className="inp"
            placeholder="اسم العميل"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

          <input
            className="inp"
            placeholder="الكود"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value
              })
            }
          />

          <input
            className="inp"
            placeholder="الهاتف"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
            }
          />

          <input
            className="inp"
            type="number"
            placeholder="الرصيد السابق"
            value={form.prevBalance}
            onChange={(e) =>
              setForm({
                ...form,
                prevBalance: e.target.value
              })
            }
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <button
            className="btn-gold"
            onClick={add}
          >
            إضافة العميل
          </button>
        </div>
      </div>

      <div className="card">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "1px solid #c9a84c33"
              }}
            >
              <th style={{ padding: 12 }}>
                الكود
              </th>
              <th style={{ padding: 12 }}>
                الاسم
              </th>
              <th style={{ padding: 12 }}>
                الهاتف
              </th>
              <th style={{ padding: 12 }}>
                الرصيد
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                className="row-hover"
              >
                <td style={{ padding: 12 }}>
                  {c.code}
                </td>

                <td style={{ padding: 12 }}>
                  {c.name}
                </td>

                <td style={{ padding: 12 }}>
                  {c.phone}
                </td>

                <td
                  style={{
                    padding: 12
                  }}
                  className="num-cell"
                >
                  {fmt(c.prevBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== TRANSACTIONS =====
function Transactions({
  clients,
  transactions,
  saveTx
}) {
  const empty = {
    clientId: "",
    date: today(),
    details: "",
    debit: "",
    credit: ""
  };

  const [form, setForm] =
    useState(empty);

  const add = async () => {
    if (!form.clientId) {
      alert("اختر العميل");
      return;
    }

    const client = clients.find(
      (c) => c.id === form.clientId
    );

    const tx = {
      ...form,
      id: Date.now().toString(),
      clientName: client.name,
      clientCode: client.code,
      debit: Number(form.debit) || 0,
      credit: Number(form.credit) || 0
    };

    await saveTx([...transactions, tx]);

    setForm(empty);
  };

  return (
    <div>
      <h2
        style={{
          color: "#c9a84c",
          marginBottom: 20
        }}
      >
        المعاملات
      </h2>

      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 24
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16
          }}
        >
          <select
            className="inp"
            value={form.clientId}
            onChange={(e) =>
              setForm({
                ...form,
                clientId:
                  e.target.value
              })
            }
          >
            <option value="">
              اختر العميل
            </option>

            {clients.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="inp"
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value
              })
            }
          />

          <input
            className="inp"
            placeholder="التفاصيل"
            value={form.details}
            onChange={(e) =>
              setForm({
                ...form,
                details:
                  e.target.value
              })
            }
          />

          <input
            className="inp"
            type="number"
            placeholder="مدين"
            value={form.debit}
            onChange={(e) =>
              setForm({
                ...form,
                debit:
                  e.target.value
              })
            }
          />

          <input
            className="inp"
            type="number"
            placeholder="دائن"
            value={form.credit}
            onChange={(e) =>
              setForm({
                ...form,
                credit:
                  e.target.value
              })
            }
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <button
            className="btn-gold"
            onClick={add}
          >
            إضافة المعاملة
          </button>
        </div>
      </div>

      <div className="card">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "1px solid #c9a84c33"
              }}
            >
              <th style={{ padding: 12 }}>
                التاريخ
              </th>

              <th style={{ padding: 12 }}>
                العميل
              </th>

              <th style={{ padding: 12 }}>
                التفاصيل
              </th>

              <th style={{ padding: 12 }}>
                مدين
              </th>

              <th style={{ padding: 12 }}>
                دائن
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="row-hover"
              >
                <td style={{ padding: 12 }}>
                  {t.date}
                </td>

                <td style={{ padding: 12 }}>
                  {t.clientName}
                </td>

                <td style={{ padding: 12 }}>
                  {t.details}
                </td>

                <td
                  style={{
                    padding: 12,
                    color: "#f88"
                  }}
                  className="num-cell"
                >
                  {fmt(t.debit)}
                </td>

                <td
                  style={{
                    padding: 12,
                    color: "#4caf7a"
                  }}
                  className="num-cell"
                >
                  {fmt(t.credit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== STATEMENT =====
function Statement({
  clients,
  transactions
}) {
  const [clientId, setClientId] =
    useState("");

  const client = clients.find(
    (c) => c.id === clientId
  );

  const rows = transactions.filter(
    (t) => t.clientId === clientId
  );

  let balance = client
    ? client.prevBalance || 0
    : 0;

  return (
    <div>
      <h2
        style={{
          color: "#c9a84c",
          marginBottom: 20
        }}
      >
        كشف الحساب
      </h2>

      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 24
        }}
      >
        <select
          className="inp"
          value={clientId}
          onChange={(e) =>
            setClientId(e.target.value)
          }
        >
          <option value="">
            اختر العميل
          </option>

          {clients.map((c) => (
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {client && (
        <div
          id="print-area"
          className="card"
          style={{
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: 24,
              borderBottom:
                "1px solid #c9a84c33"
            }}
          >
            <h3
              style={{
                color: "#c9a84c"
              }}
            >
              كشف حساب العميل:
              {" "}
              {client.name}
            </h3>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse"
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom:
                    "1px solid #c9a84c33"
                }}
              >
                <th style={{ padding: 12 }}>
                  التاريخ
                </th>

                <th style={{ padding: 12 }}>
                  التفاصيل
                </th>

                <th style={{ padding: 12 }}>
                  مدين
                </th>

                <th style={{ padding: 12 }}>
                  دائن
                </th>

                <th style={{ padding: 12 }}>
                  الرصيد
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((t) => {
                balance +=
                  (t.credit || 0) -
                  (t.debit || 0);

                return (
                  <tr key={t.id}>
                    <td
                      style={{
                        padding: 12
                      }}
                    >
                      {t.date}
                    </td>

                    <td
                      style={{
                        padding: 12
                      }}
                    >
                      {t.details}
                    </td>

                    <td
                      className="num-cell"
                      style={{
                        padding: 12,
                        color: "#f88"
                      }}
                    >
                      {fmt(t.debit)}
                    </td>

                    <td
                      className="num-cell"
                      style={{
                        padding: 12,
                        color:
                          "#4caf7a"
                      }}
                    >
                      {fmt(t.credit)}
                    </td>

                    <td
                      className="num-cell"
                      style={{
                        padding: 12,
                        fontWeight: 700
                      }}
                    >
                      {fmt(balance)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            style={{
              padding: 24,
              borderTop:
                "1px solid #c9a84c33"
            }}
          >
            <div
              style={{
                color:
                  balance >= 0
                    ? "#4caf7a"
                    : "#f88",
                fontWeight: 800,
                fontSize: 18
              }}
            >
              الرصيد النهائي:
              {" "}
              {fmt(balance)}
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#e8dcc888"
              }}
            >
              ({numToAr(Math.abs(balance))})
            </div>

            <button
              className="btn-gold"
              style={{
                marginTop: 20
              }}
              onClick={() =>
                window.print()
              }
            >
              🖨️ طباعة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
