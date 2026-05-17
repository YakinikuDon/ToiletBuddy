import { useState } from 'react'
import { JumpingNumber } from './components/JumpingNumber'
import { CoinAnimation } from './components/CoinAnimation'
import { ReadingList } from './components/ReadingList'
import { getPercentage, calculatePerMillisecond } from './utils/calculator'
import './index.css'

function App() {
  const [appState, setAppState] = useState('start') // 'start', 'pooping', 'settlement'
  const [salary, setSalary] = useState('')
  const [salaryType, setSalaryType] = useState('monthly') // 'monthly', 'annual'
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const handleStart = () => {
    if (Number(salary) > 0) {
      setStartTime(Date.now())
      setAppState('pooping')
    } else {
      alert('请输入有效的薪水数字！')
    }
  }

  const handleEnd = () => {
    setEndTime(Date.now())
    setAppState('settlement')
  }

  const renderStart = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '36px', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>🚽 带薪拉屎搭子</h1>
      <p style={{ alignSelf: 'flex-start', marginLeft: '10%', color: '#eeeeee', fontSize: '18px', fontWeight: 'bold' }}>请输入您的薪水：</p>
      <input 
        type="number" 
        value={salary} 
        onChange={(e) => setSalary(e.target.value)} 
        placeholder="例如: 10000"
        style={{ padding: '15px', fontSize: '18px', borderRadius: '12px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white', marginBottom: '15px', width: '80%' }}
      />
      <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <button 
          onClick={() => setSalaryType('monthly')}
          style={{ flex: 1, marginRight: '10px', backgroundColor: salaryType === 'monthly' ? '#4CAF50' : '#333', color: 'white' }}
        >
          月薪
        </button>
        <button 
          onClick={() => setSalaryType('annual')}
          style={{ flex: 1, marginLeft: '10px', backgroundColor: salaryType === 'annual' ? '#4CAF50' : '#333', color: 'white' }}
        >
          年薪
        </button>
      </div>
      
      <p style={{ fontSize: '14px', color: '#bbbbbb', marginBottom: '40px', textAlign: 'center', width: '80%' }}>
        本APP完全在本地运行，绝不会收集或上传您的任何薪资及隐私信息。
      </p>
      
      <button 
        onClick={handleStart}
        style={{ backgroundColor: '#FF9800', color: 'white', border: 'none', padding: '15px 40px', fontSize: '20px', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255, 152, 0, 0.4)' }}
      >
        🚀 开始拉屎
      </button>
    </div>
  )

  const renderPooping = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 上方：拉屎与金币动效区 */}
      <div style={{ height: '35vh', backgroundColor: '#1a1a1a', position: 'relative', borderBottom: '2px solid #333' }}>
        <CoinAnimation startTime={startTime} salary={salary} salaryType={salaryType} />
      </div>
      
      {/* 中间：跳动的数字 */}
      <div style={{ padding: '15px', backgroundColor: '#222', borderBottom: '2px solid #333' }}>
        <JumpingNumber startTime={startTime} salary={salary} salaryType={salaryType} />
      </div>

      {/* 下方：推荐读物列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#121212' }}>
        <ReadingList />
      </div>

      {/* 底部：结束按钮 */}
      <button 
        onClick={handleEnd}
        style={{ backgroundColor: '#F44336', color: 'white', border: 'none', padding: '20px', fontSize: '22px', fontWeight: 'bold', borderRadius: '0', zIndex: 20 }}
      >
        🛑 结束拉屎
      </button>
    </div>
  )

  const renderSettlement = () => {
    const durationMs = endTime - startTime;
    const durationMins = durationMs / 1000 / 60;
    const earned = calculatePerMillisecond(Number(salary), salaryType) * durationMs;
    const percentage = getPercentage(earned, durationMs, salary, salaryType);

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#ffffff' }}>结算报告 🧾</h2>
        
        {/* 点赞粑粑图片与夸奖文本 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <img src={`${import.meta.env.BASE_URL}poop_thumbs_up.png`} alt="Poop thumbs up" style={{ width: '120px', height: '120px', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }} />
          <p style={{ color: '#FFD700', fontSize: '16px', fontWeight: 'bold', margin: '10px 0 0 0', textAlign: 'center', padding: '0 20px' }}>
            拉得真舒畅！这坨带薪便便为您完美的摸鱼姿势点赞！👍
          </p>
        </div>
        
        <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '15px', width: '90%', marginBottom: '30px' }}>
          <p style={{ color: '#eeeeee', margin: '0 0 10px 0', fontSize: '18px' }}>本次拉屎时长：</p>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#ffffff' }}>
            {durationMins.toFixed(2)} 分钟
          </div>

          <p style={{ color: '#eeeeee', margin: '0 0 10px 0', fontSize: '18px' }}>你在拉屎期间赚的钱为：</p>
          <div style={{ color: '#FFD700', fontSize: '42px', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '20px', textShadow: '0 0 8px rgba(255, 215, 0, 0.4)' }}>
            ￥{earned.toFixed(2)}
          </div>

          <p style={{ color: '#eeeeee', margin: '0 0 10px 0', fontSize: '18px' }}>打败了全国：</p>
          <div style={{ color: '#4CAF50', fontSize: '28px', fontWeight: 'bold', textShadow: '0 0 5px rgba(76, 175, 80, 0.4)' }}>
            {percentage.toFixed(2)}% 的人！
          </div>
        </div>

        {durationMins > 15 && (
          <div style={{ color: '#FF5722', fontWeight: 'bold', padding: '15px', backgroundColor: 'rgba(255, 87, 34, 0.1)', borderRadius: '8px', marginBottom: '20px', border: '1px solid #FF5722' }}>
            ⚠️ 警告：拉屎时间超过15分钟！请注意肛肠健康，谨防痔疮！
          </div>
        )}
        
        <button 
          onClick={() => {
            setStartTime(null)
            setEndTime(null)
            setAppState('start')
          }}
          style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '15px 40px', fontSize: '18px', borderRadius: '30px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          🔄 再拉一泡
        </button>

        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <a href="https://space.bilibili.com" target="_blank" rel="noreferrer" style={{ color: '#FB7299', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            👍 关注我的 B 站
          </a>
          <a href="https://github.com/YakinikuDon/ToiletBuddy" target="_blank" rel="noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            ⭐ 去 GitHub 给个 Star
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', maxWidth: '500px', margin: '0 auto', backgroundColor: '#121212' }}>
      {appState === 'start' && renderStart()}
      {appState === 'pooping' && renderPooping()}
      {appState === 'settlement' && renderSettlement()}
    </div>
  )
}

export default App
