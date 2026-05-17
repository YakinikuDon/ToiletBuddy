import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { calculatePerMillisecond } from '../utils/calculator';

export const CoinAnimation = ({ startTime, salary, salaryType }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  
  const [eurekaVisible, setEurekaVisible] = useState(false);
  const [currentThought, setCurrentThought] = useState(null);
  const lastMilestoneRef = useRef(0);
  
  // 处理尤里卡灯泡（里程碑）和随机思考气泡
  useEffect(() => {
    // --- 里程碑逻辑 ---
    let animationFrameId;
    if (startTime && salary) {
      const rate = calculatePerMillisecond(Number(salary), salaryType);
      const checkMilestone = () => {
        const earned = (Date.now() - startTime) * rate;
        // 每 10 块钱触发一次尤里卡灯泡
        const currentMilestone = Math.floor(earned / 10);
        
        if (currentMilestone > lastMilestoneRef.current && currentMilestone > 0) {
          lastMilestoneRef.current = currentMilestone;
          setEurekaVisible(true);
          setTimeout(() => setEurekaVisible(false), 2000); // 显示 2 秒后消失
        }
        animationFrameId = requestAnimationFrame(checkMilestone);
      };
      animationFrameId = requestAnimationFrame(checkMilestone);
    }

    // --- 随机思考气泡逻辑 ---
    const thoughts = ['💰', '🍜', '💡', '📱', 'Zzz', '💩', '🚀'];
    const bubbleInterval = setInterval(() => {
      // 70% 的概率出现一个随机气泡，显得更自然
      if (Math.random() > 0.3 && !eurekaVisible) {
        const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        setCurrentThought(randomThought);
        setTimeout(() => setCurrentThought(null), 3000); // 气泡飘浮 3 秒
      }
    }, 8000); // 每 8 秒判定一次

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(bubbleInterval);
    };
  }, [startTime, salary, salaryType, eurekaVisible]);

  useEffect(() => {
    // 设置物理引擎
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create();
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent'
      }
    });

    // 创建地面和墙壁防止硬币掉出屏幕
    const ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 定时生成硬币
    const dropCoinInterval = setInterval(() => {
      const x = width / 2 + (Math.random() - 0.5) * 20; // 从马桶正下方掉落
      const y = 140; // 调低y轴起始位置，正好在马桶下方
      const radius = 10 + Math.random() * 5; // 大小略有不同的金币

      // 改用长方形代表金币，使其堆叠致密，呈现硬币厚度
      const coinWidth = 40 + Math.random() * 10;
      const coinHeight = 6 + Math.random() * 2;
      
      const coin = Bodies.rectangle(x, y, coinWidth, coinHeight, {
        restitution: 0.3, // 弹性降低，更容易堆叠
        friction: 0.5,
        render: {
          sprite: {
            texture: `${import.meta.env.BASE_URL}coin.png`,
            xScale: coinWidth / 1024, // AI生成的图是 1024x1024
            yScale: coinHeight / 1024
          }
        }
      });
      coin.coinWidth = coinWidth;
      coin.coinHeight = coinHeight;

      Composite.add(engine.world, coin);

      // 如果硬币太多了，清理掉一些最早的以防止卡顿
      if (engine.world.bodies.length > 250) {
        // bodies[0-2] 是墙和地面
        Composite.remove(engine.world, engine.world.bodies[3]);
      }
    }, 80); // 每 80ms 掉落一个金币，速度更快更夸张

    // 监听引擎更新事件，动态修改金币的Y轴缩放比例，实现“下落时是圆面，堆叠时是侧面”的3D错觉
    Matter.Events.on(engine, 'beforeUpdate', () => {
      engine.world.bodies.forEach(body => {
        if (!body.isStatic && body.coinWidth && body.render && body.render.sprite) {
          const speed = Math.abs(body.velocity.y) + Math.abs(body.velocity.x);
          if (speed > 1.5) {
             // 掉落状态：显示金币的圆形面，并加上正弦函数产生翻转动画效果
             const targetYScale = body.coinWidth / 1024;
             body.render.sprite.yScale = targetYScale * Math.abs(Math.cos(engine.timing.timestamp * 0.005 + body.id));
          } else {
             // 堆叠静止状态：显示为硬币的厚度
             body.render.sprite.yScale = body.coinHeight / 1024;
          }
        }
      });
    });

    return () => {
      clearInterval(dropCoinInterval);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 居中的小人 图片，充当“拉屎”本体 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '160px',
        height: '160px',
        zIndex: 1, // 将图片层级调低
        pointerEvents: 'none'
      }}>
        <img src={`${import.meta.env.BASE_URL}toilet.png`} alt="Thinker on toilet" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        
        {/* 思考气泡 */}
        {currentThought && (
          <div style={{
            position: 'absolute', 
            top: '-5px', 
            left: '-15px', 
            backgroundColor: 'white', 
            padding: '6px 10px', 
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)', 
            fontSize: '18px',
            animation: 'floatUp 3s ease-out forwards', 
            zIndex: 20
          }}>
            <span style={{ fontSize: '14px', marginRight: '4px' }}>💭</span>{currentThought}
          </div>
        )}

        {/* 尤里卡灯泡 */}
        {eurekaVisible && (
          <div style={{
            position: 'absolute', 
            top: '-20px', 
            left: '20px',
            fontSize: '40px', 
            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', 
            zIndex: 20
          }}>
            💡
          </div>
        )}
      </div>

      {/* 物理引擎 Canvas 容器 */}
      <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }} />

      {/* 注入动画样式 */}
      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(10px) scale(0.8); }
          10% { opacity: 1; transform: translateY(0px) scale(1); }
          80% { opacity: 1; transform: translateY(-15px) scale(1); }
          100% { opacity: 0; transform: translateY(-25px) scale(0.8); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) rotate(-20deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};
