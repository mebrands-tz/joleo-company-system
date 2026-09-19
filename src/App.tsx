import { useState } from 'react';

export const App = () => {
  const [lang, setLang] = useState('en');
    const [show, setShow] = useState(false);

      return (
          <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0a1628,#1a2f55)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'Arial'}}>
                <div style={{background:'white',borderRadius:'16px',padding:'40px',width:'100%',maxWidth:'400px'}}>
                        
                                <div style={{textAlign:'right',marginBottom:'20px'}}>
                                          <button onClick={()=>setLang(lang==='en'?'sw':'en')} style={{background:'#c9a84c',color:'white',border:'none',borderRadius:'20px',padding:'6px 16px',cursor:'pointer'}}>
                                                      {lang==='en'?'🇹🇿 Swahili':'🇬🇧 English'}
                                                                </button>
                                                                        </div>

                                                                                <div style={{textAlign:'center',marginBottom:'30px'}}>
                                                                                          <div style={{width:'70px',height:'70px',background:'#0a1628',borderRadius:'50%',margin:'0 auto 12px',display:'flex',alignItems:'center',justifyContent:'center',color:'#c9a84c',fontWeight:'bold',fontSize:'20px'}}>JCL</div>
                                                                                                    <h2 style={{color:'#0a1628',margin:'0 0 4px',fontSize:'16px'}}>JOLEO COMPANY LIMITED</h2>
                                                                                                              <p style={{color:'#666',margin:0,fontSize:'13px'}}>{lang==='en'?'Supply Management System':'Mfumo wa Usimamizi wa Ugavi'}</p>
                                                                                                                      </div>

                                                                                                                              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px'}}>{lang==='en'?'Email':'Barua Pepe'}</label>
                                                                                                                                      <input type="email" style={{width:'100%',padding:'12px',border:'2px solid #e5e7eb',borderRadius:'8px',marginBottom:'16px',boxSizing:'border-box',fontSize:'14px'}} />

                                                                                                                                              <label style={{display:'block',marginBottom:'6px',fontWeight:'600',fontSize:'14px'}}>{lang==='en'?'Password':'Nywila'}</label>
                                                                                                                                                      <div style={{position:'relative',marginBottom:'24px'}}>
                                                                                                                                                                <input type={show?'text':'password'} style={{width:'100%',padding:'12px 44px 12px 12px',border:'2px solid #e5e7eb',borderRadius:'8px',boxSizing:'border-box',fontSize:'14px'}} />
                                                                                                                                                                          <button onClick={()=>setShow(!show)} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'18px'}}>{show?'🙈':'👁️'}</button>
                                                                                                                                                                                  </div>

                                                                                                                                                                                          <button style={{width:'100%',padding:'14px',background:'#0a1628',color:'white',border:'none',borderRadius:'8px',fontSize:'16px',fontWeight:'bold',cursor:'pointer',marginBottom:'12px'}}>
                                                                                                                                                                                                    {lang==='en'?'Sign In':'Ingia'}
                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                    <div style={{textAlign:'center'}}>
                                                                                                                                                                                                                              <a href="#" style={{color:'#c9a84c',fontSize:'13px'}}>{lang==='en'?'Forgot Password?':'Umesahau Nywila?'}</a>
                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                  };