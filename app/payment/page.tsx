'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  CreditCard, Lock, Check, Shield, Globe, Smartphone,
  Building2, Bitcoin, ChevronDown, ChevronUp, ArrowLeft, Zap
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { InlineLoader } from '@/components/ui/PageLoading'

type PayMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'paypal' | 'apple_pay' | 'google_pay' | 'crypto'
type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'CAD' | 'AUD' | 'SGD'

const CURRENCIES = [
  { code: 'USD' as Currency, symbol: '$',    name: 'US Dollar',         flag: '🇺🇸' },
  { code: 'EUR' as Currency, symbol: '€',    name: 'Euro',              flag: '🇪🇺' },
  { code: 'GBP' as Currency, symbol: '£',    name: 'British Pound',     flag: '🇬🇧' },
  { code: 'INR' as Currency, symbol: '₹',    name: 'Indian Rupee',      flag: '🇮🇳' },
  { code: 'AED' as Currency, symbol: 'د.إ',  name: 'UAE Dirham',        flag: '🇦🇪' },
  { code: 'CAD' as Currency, symbol: 'C$',   name: 'Canadian Dollar',   flag: '🇨🇦' },
  { code: 'AUD' as Currency, symbol: 'A$',   name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'SGD' as Currency, symbol: 'S$',   name: 'Singapore Dollar',  flag: '🇸🇬' },
]
const USD_RATES: Record<Currency, number> = {
  USD:1, EUR:0.92, GBP:0.79, INR:83.5, AED:3.67, CAD:1.36, AUD:1.53, SGD:1.35
}
const INDIAN_BANKS = [
  'State Bank of India','HDFC Bank','ICICI Bank','Axis Bank',
  'Kotak Mahindra Bank','Yes Bank','Punjab National Bank',
  'Bank of Baroda','Canara Bank','IndusInd Bank',
]
const UPI_APPS = [
  { id:'gpay',    name:'Google Pay', emoji:'🔵' },
  { id:'phonepe', name:'PhonePe',    emoji:'🟣' },
  { id:'paytm',   name:'Paytm',      emoji:'🔷' },
  { id:'bhim',    name:'BHIM UPI',   emoji:'🇮🇳' },
  { id:'other',   name:'Other UPI',  emoji:'📱' },
]
const METHOD_GROUPS = [
  { label:'International', methods:[
    { id:'card'       as PayMethod, icon:CreditCard,  label:'Credit / Debit Card', desc:'Visa, Mastercard, Amex, Discover' },
    { id:'paypal'     as PayMethod, icon:Globe,       label:'PayPal',              desc:'200+ countries' },
    { id:'apple_pay'  as PayMethod, icon:Smartphone,  label:'Apple Pay',           desc:'Face ID / Touch ID' },
    { id:'google_pay' as PayMethod, icon:Smartphone,  label:'Google Pay',          desc:'One-tap checkout' },
  ]},
  { label:'India — UPI & NetBanking', methods:[
    { id:'upi'        as PayMethod, icon:Zap,         label:'UPI',                 desc:'GPay, PhonePe, Paytm, BHIM' },
    { id:'netbanking' as PayMethod, icon:Building2,   label:'Net Banking',         desc:'All major Indian banks' },
    { id:'wallet'     as PayMethod, icon:Smartphone,  label:'Wallet',              desc:'Paytm, Amazon Pay, Mobikwik' },
  ]},
  { label:'Crypto', methods:[
    { id:'crypto'     as PayMethod, icon:Bitcoin,     label:'Cryptocurrency',      desc:'BTC, ETH, USDT, USDC' },
  ]},
]
const ORDER_ITEMS = [
  { label:'Brand Identity Package', price:149 },
  { label:'Express Delivery (3 days)', price:20 },
  { label:'Unlimited Revisions', price:15 },
]

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [method, setMethod]           = useState<PayMethod>('card')
  const [currency, setCurrency]       = useState<Currency>('USD')
  const [currOpen, setCurrOpen]       = useState(false)
  const [card, setCard]               = useState({ number:'', name:'', expiry:'', cvv:'' })
  const [upiApp, setUpiApp]           = useState('gpay')
  const [upiId, setUpiId]             = useState('')
  const [bank, setBank]               = useState('')
  const [email, setEmail]             = useState('')
  const [processing, setProcessing]   = useState(false)
  const [paid, setPaid]               = useState(false)
  const [error, setError]             = useState('')

  const curr = CURRENCIES.find(c => c.code === currency)!
  const rate = USD_RATES[currency]
  const SUB_USD  = ORDER_ITEMS.reduce((s,i)=>s+i.price,0)
  const TAX_USD  = Math.round(SUB_USD * 0.08)
  const TOT_USD  = SUB_USD + TAX_USD
  const total    = Math.round(TOT_USD * rate * 100) / 100

  useEffect(() => {
    if (currency === 'INR' && !['upi','netbanking','wallet'].includes(method)) {
      setMethod('upi')
    } else if (currency !== 'INR' && ['upi','netbanking','wallet'].includes(method)) {
      setMethod('card')
    }
  }, [currency]) // method is not needed in deps to avoid loop

  const fmtNum = (v:string)=>v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExp = (v:string)=>v.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})/,'$1/')

  const handlePay = useCallback(async()=>{
    setError('')
    if (!email) { setError('Enter your email for the receipt.'); return }
    if (method==='card' && (!card.number||!card.name||!card.expiry||!card.cvv)) { setError('Fill all card fields.'); return }
    if (method==='upi' && !upiId) { setError('Enter your UPI ID.'); return }
    if (method==='netbanking' && !bank) { setError('Select your bank.'); return }
    setProcessing(true)
    try {
      const res = await fetch('/api/payment/create', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ amount:total, currency, method, customerEmail:email,
          orderId: searchParams.get('orderId')||'ord-direct', productName:'DesignForge Order' }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      await new Promise(r=>setTimeout(r,2000))
      setPaid(true)
    } catch(e:unknown) {
      setError(e instanceof Error ? e.message : 'Payment failed. Please try again.')
    } finally { setProcessing(false) }
  },[method,card,upiId,bank,email,total,currency,searchParams])

  if (paid) return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:0.6,type:'spring'}} className="text-center max-w-md">
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2,type:'spring',stiffness:200}}
          className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mx-auto mb-8">
          <Check size={44} className="text-green-400"/>
        </motion.div>
        <h1 className="text-4xl text-white mb-3 tracking-tight" style={{fontFamily:"'Instrument Serif', serif"}}>Payment Confirmed!</h1>
        <p className="text-white/50 text-sm mb-1">{curr.symbol}{total.toLocaleString()} {currency} via {method==='upi'?'UPI':method.replace('_',' ')}</p>
        <p className="text-white/25 text-xs mb-10">Confirmation sent to {email}. Designer starts within 24 hours.</p>
        <div className="flex flex-col gap-3">
          <button onClick={()=>router.push('/order-tracking')} className="bg-white text-black rounded-full py-3.5 text-sm font-semibold w-full">Track My Order →</button>
          <button onClick={()=>router.push('/dashboard')} className="liquid-glass rounded-full py-3.5 text-white text-sm w-full">Go to Dashboard</button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      <Navbar/>
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-32">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <button onClick={()=>window.history.back()} className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-6 transition-colors"><ArrowLeft size={14}/> Back</button>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Secure Checkout · Powered by Stripe & Razorpay</p>
          <h1 className="text-4xl text-white tracking-tight" style={{fontFamily:"'Instrument Serif', serif"}}>Complete Payment</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form side */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Email */}
            <div className="liquid-glass rounded-2xl p-5">
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Receipt Email</label>
              <input className="auth-input w-full" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>

            {/* Method groups */}
            {METHOD_GROUPS.map(group=>(
              <div key={group.label}>
                <p className="text-white/30 text-xs tracking-widest uppercase mb-2">{group.label}</p>
                <div className="flex flex-col gap-1.5">
                  {group.methods.map(m=>(
                    <motion.button key={m.id} whileHover={{scale:1.005}} whileTap={{scale:0.995}}
                      onClick={()=>{ setMethod(m.id); if(['upi','netbanking','wallet'].includes(m.id)&&currency!=='INR')setCurrency('INR') }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${method===m.id?'border-[#89AACC] bg-[#89AACC]/6':'border-white/8 hover:border-white/18'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${method===m.id?'bg-[#89AACC]/20':'bg-white/5'}`}>
                        <m.icon size={18} className={method===m.id?'text-[#89AACC]':'text-white/40'}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${method===m.id?'text-white':'text-white/65'}`}>{m.label}</p>
                        <p className="text-white/30 text-xs">{m.desc}</p>
                      </div>
                      {method===m.id && <div className="w-2 h-2 rounded-full bg-[#89AACC] flex-shrink-0"/>}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            {/* Details form */}
            <div className="liquid-glass rounded-3xl p-7">
              <AnimatePresence mode="wait">
                <motion.div key={method} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}>
                  {method==='card' && (
                    <div className="flex flex-col gap-5">
                      <div className="rounded-2xl p-5 relative overflow-hidden" style={{background:'linear-gradient(135deg,#1a2a3a,#0d1b2a)'}}>
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#89AACC] opacity-10 -translate-y-1/2 translate-x-1/2"/>
                        <p className="text-white/30 text-xs mb-3">DesignForge Studio</p>
                        <p className="text-white text-lg tracking-[0.2em] font-mono mb-4">{card.number||'•••• •••• •••• ••••'}</p>
                        <div className="flex justify-between">
                          <div><p className="text-white/30 text-xs mb-1">Name</p><p className="text-white text-sm">{card.name||'YOUR NAME'}</p></div>
                          <div><p className="text-white/30 text-xs mb-1">Expires</p><p className="text-white text-sm">{card.expiry||'MM/YY'}</p></div>
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Card Number</label>
                        <input className="auth-input w-full font-mono" placeholder="1234 5678 9012 3456" maxLength={19} value={card.number} onChange={e=>setCard({...card,number:fmtNum(e.target.value)})}/>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Cardholder Name</label>
                        <input className="auth-input w-full" placeholder="As on card" value={card.name} onChange={e=>setCard({...card,name:e.target.value})}/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Expiry</label>
                          <input className="auth-input w-full" placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={e=>setCard({...card,expiry:fmtExp(e.target.value)})}/>
                        </div>
                        <div>
                          <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">CVV</label>
                          <input className="auth-input w-full" placeholder="•••" type="password" maxLength={4} value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.replace(/\D/g,'').slice(0,4)})}/>
                        </div>
                      </div>
                    </div>
                  )}
                  {(method==='apple_pay'||method==='google_pay') && (
                    <div className="text-center py-12">
                      <span className="text-5xl block mb-4">{method==='apple_pay'?'🍎':'🔵'}</span>
                      <p className="text-white/60 text-sm mb-2">{method==='apple_pay'?'Apple Pay':'Google Pay'}</p>
                      <p className="text-white/30 text-xs">Click Pay to authenticate with {method==='apple_pay'?'Face ID / Touch ID':'your Google account'}</p>
                    </div>
                  )}
                  {method==='paypal' && (
                    <div className="text-center py-12">
                      <span className="text-5xl block mb-4">🅿️</span>
                      <p className="text-white/60 text-sm mb-4">Redirect to PayPal to complete payment securely.</p>
                      <p className="text-white/30 text-xs">Supports 200+ countries and all PayPal-linked payment methods.</p>
                    </div>
                  )}
                  {method==='upi' && (
                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-5 gap-2">
                        {UPI_APPS.map(app=>(
                          <button key={app.id} onClick={()=>setUpiApp(app.id)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-xs transition-all ${upiApp===app.id?'border-[#89AACC] bg-[#89AACC]/10 text-white':'border-white/10 text-white/50 hover:border-white/20'}`}>
                            <span className="text-2xl">{app.emoji}</span>
                            <span className="text-center leading-tight">{app.name}</span>
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">UPI ID</label>
                        <input className="auth-input w-full" placeholder="yourname@okicici or 9876543210@ybl" value={upiId} onChange={e=>setUpiId(e.target.value)}/>
                      </div>
                      <div className="bg-[#89AACC]/5 border border-[#89AACC]/20 rounded-xl p-4">
                        <p className="text-[#89AACC] text-xs font-medium mb-1">🔒 UPI — Instant bank transfer via NPCI</p>
                        <p className="text-white/40 text-xs">Your bank sends a push notification to approve. No card details needed.</p>
                      </div>
                    </div>
                  )}
                  {method==='netbanking' && (
                    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                      {INDIAN_BANKS.map(b=>(
                        <button key={b} onClick={()=>setBank(b)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm text-left transition-all ${bank===b?'border-[#89AACC] bg-[#89AACC]/8 text-white':'border-white/8 text-white/55 hover:border-white/20'}`}>
                          <Building2 size={14} className={bank===b?'text-[#89AACC]':'text-white/30'}/>{b}
                        </button>
                      ))}
                    </div>
                  )}
                  {method==='wallet' && (
                    <div className="grid grid-cols-2 gap-3">
                      {['Paytm 💰','Amazon Pay 📦','Mobikwik 🔷','FreeCharge ⚡','Ola Money 🚖','Airtel Money 📡'].map(w=>(
                        <button key={w} className="p-4 rounded-xl border border-white/10 text-white/60 text-sm hover:border-[#89AACC] hover:text-white transition-all">{w}</button>
                      ))}
                    </div>
                  )}
                  {method==='crypto' && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
                        <p className="text-yellow-400 text-xs font-medium">⚡ 30-minute payment window</p>
                        <p className="text-white/35 text-xs mt-1">Send exact amount. Auto-confirms after 1 blockchain confirmation.</p>
                      </div>
                      {[
                        {coin:'Bitcoin (BTC)',icon:'₿',amt:(TOT_USD/62000).toFixed(8),addr:'bc1q9v8r7t6y5u4i3o2p1w0e9r8t7y6u5i4o3p2q1'},
                        {coin:'Ethereum (ETH)',icon:'Ξ',amt:(TOT_USD/3200).toFixed(6),addr:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e'},
                        {coin:'USDT (TRC-20)',icon:'₮',amt:TOT_USD.toFixed(2),addr:'TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
                      ].map(c=>(
                        <div key={c.coin} className="liquid-glass rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white/60 text-sm">{c.coin}</p>
                            <p className="text-white font-mono text-sm">{c.icon} {c.amt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-white/25 text-xs font-mono truncate flex-1">{c.addr}</p>
                            <button onClick={()=>navigator.clipboard?.writeText(c.addr)} className="text-[#89AACC] text-xs hover:underline flex-shrink-0">Copy</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="flex items-center justify-center gap-6">
              {[{icon:Lock,l:'256-bit SSL'},{icon:Shield,l:'PCI Compliant'},{icon:Check,l:'Fraud Protection'}].map(({icon:Icon,l})=>(
                <div key={l} className="flex items-center gap-1.5 text-white/25 text-xs"><Icon size={11}/>{l}</div>
              ))}
            </div>
          </div>

          {/* Summary side */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Currency picker */}
            <div className="liquid-glass rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Currency</p>
              <div className="relative">
                <button onClick={()=>setCurrOpen(!currOpen)}
                  className="flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <span className="text-white text-sm">{curr.flag} {curr.code} — {curr.name}</span>
                  {currOpen?<ChevronUp size={14} className="text-white/40"/>:<ChevronDown size={14} className="text-white/40"/>}
                </button>
                <AnimatePresence>
                  {currOpen && (
                    <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:4}}
                      className="absolute top-full mt-1 left-0 right-0 liquid-glass rounded-xl py-2 z-20 shadow-2xl max-h-64 overflow-y-auto">
                      {CURRENCIES.map(c=>(
                        <button key={c.code} onClick={()=>{setCurrency(c.code);setCurrOpen(false)}}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${currency===c.code?'text-white bg-white/8':'text-white/55 hover:text-white hover:bg-white/5'}`}>
                          <span>{c.flag}</span><span className="font-medium">{c.code}</span>
                          <span className="text-white/30 text-xs">{c.symbol}</span>
                          <span className="text-white/20 text-xs ml-auto truncate">{c.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Order summary */}
            <div className="liquid-glass rounded-3xl p-6 flex flex-col gap-4">
              <p className="text-white font-medium">Order Summary</p>
              <div className="flex flex-col gap-3">
                {ORDER_ITEMS.map(item=>(
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-white/55">{item.label}</span>
                    <span className="text-white/80">{curr.symbol}{(item.price*rate).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm"><span className="text-white/40">Subtotal</span><span className="text-white/65">{curr.symbol}{(SUB_USD*rate).toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">Tax (8%)</span><span className="text-white/65">{curr.symbol}{(TAX_USD*rate).toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-medium pt-1 border-t border-white/8">
                  <span className="text-white">Total</span>
                  <span className="text-[#89AACC] text-2xl" style={{fontFamily:"'Instrument Serif', serif"}}>{curr.symbol}{total.toFixed(2)}</span>
                </div>
                {currency!=='USD' && <p className="text-white/20 text-xs text-right">≈ ${TOT_USD} USD</p>}
              </div>
              <div className="flex gap-2">
                <input className="auth-input flex-1 text-sm" placeholder="Promo code"/>
                <button className="px-4 rounded-xl bg-white/8 text-white text-sm hover:bg-white/15 transition-colors">Apply</button>
              </div>
              <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                onClick={handlePay} disabled={processing}
                className="w-full py-4 bg-white text-black rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {processing?<><InlineLoader size={16}/> Processing…</>:<><Lock size={13}/> Pay {curr.symbol}{total.toFixed(2)} {currency}</>}
              </motion.button>
              <p className="text-white/20 text-xs text-center">Secured by {['upi','netbanking','wallet'].includes(method)?'Razorpay + NPCI':'Stripe + SSL'}</p>
            </div>

            <div className="liquid-glass rounded-2xl p-4 text-center">
              <p className="text-white/20 text-xs uppercase tracking-widest mb-3">Accepted Worldwide</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Visa','MC','Amex','PayPal','UPI','GPay','PhonePe','Paytm','NetBanking','BTC','ETH','USDT'].map(p=>(
                  <span key={p} className="px-2.5 py-1 rounded-lg bg-white/5 text-white/30 text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="cube-loader"><div className="cube-top"/><div className="cube-wrapper">{[0,1,2,3].map(i=><span key={i} style={{'--i':i} as React.CSSProperties} className="cube-span"/>)}</div></div></div>}>
      <PaymentContent/>
    </Suspense>
  )
}
