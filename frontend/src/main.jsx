import React, {useState, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home'
import Wallet from './pages/Wallet'
import Admin from './pages/Admin'
import Splash from './components/Splash'

function App(){ const [showSplash,setShowSplash]=useState(true); useEffect(()=>{const t=setTimeout(()=>setShowSplash(false),1400); return ()=>clearTimeout(t)},[]); if(showSplash) return <Splash/>; return (<BrowserRouter><Routes><Route path='/' element={<Home/>}/><Route path='/wallet' element={<Wallet/>}/><Route path='/admin' element={<Admin/>}/></Routes></BrowserRouter>) }
createRoot(document.getElementById('root')).render(<App />)