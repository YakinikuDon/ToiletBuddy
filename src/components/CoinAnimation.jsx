import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const CoinAnimation = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

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
            texture: '/coin.png',
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
        <img src="/toilet.png" alt="Thinker on toilet" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* 物理引擎 Canvas 容器 */}
      <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }} />
    </div>
  );
};
