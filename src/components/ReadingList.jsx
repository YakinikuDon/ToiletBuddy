import React, { useState, useEffect } from 'react';

const database = [
  {
    id: 1,
    title: "什么是马桶上的“阿基米德时刻”？",
    category: "趣味科普",
    summary: "你是否有过这种体验：在苦思冥想某个难题无果后，去上一趟洗手间，灵感却突然如泉涌般喷发？这在心理学和神经科学上是有科学依据的...",
    content: "你是否有过这种体验：在苦思冥想某个难题无果后，去上一趟洗手间，灵感却突然如泉涌般喷发？这在物理学和历史上有个著名的代名词——“尤里卡时刻”（Eureka!），也常被称为马桶上的“阿基米德时刻”。\n\n科学研究表明，当我们的大脑处于专注解决某个问题时，处于高强度的‘执行控制网络’主导状态。此时大脑的注意力高度聚焦，虽然逻辑严密，但也容易陷入“思维定势”。\n\n而当我们走进洗手间，坐在马桶上，身体进入放松状态时，大脑的‘默认模式网络’（Default Mode Network, DMN）会被激活。这是一个在我们闲散、白日做梦、无所事事时最活跃的大脑区域。DMN能够悄悄地在后台把看似不相关的信息碎片重新拼接，从而在你不经意的瞬间产生极具创造力的灵感闪现！\n\n此外，温水冲洗、密闭且安全的私人空间，以及远离外界电子设备的打扰，都让上厕所成了现代人仅存的‘脑部冥想’时间。所以，下次拉屎时灵感爆发，别忘了赶紧记下来，这可是你大脑默认模式网络送给你的‘带薪产物’！"
  },
  {
    id: 2,
    title: "《被讨厌的勇气》：课题分离的智慧",
    category: "心理哲学",
    summary: "阿德勒心理学认为，我们人类的大多数烦恼都源于人际关系。而要解开这个乱麻，最关键的钥匙就是‘课题分离’...",
    content: "阿德勒心理学认为，我们人类的大多数烦恼都源于人际关系。而要解开这个乱麻，最关键的钥匙就是‘课题分离’。\n\n什么是课题分离？简单来说，就是分清“这是谁的课题”。如何辨别？只需要思考：这个选择所带来的后果，最终由谁来承担？\n\n比如，“别人怎么看我”是别人的课题，而不是你的课题。你做得再好，别人也有讨厌你的自由，这是别人的课题。而你只需要做好你自己的课题——“我该如何度过我的人生”、“我是否问心无愧”。\n\n我们之所以感到痛苦和焦虑，往往是因为妄图去干涉别人的课题（比如想要操控别人对自己的喜爱，或者强行去改变别人的看法），或者让别人干涉了自己的课题。\n\n斩断人际关系的乱麻，不需要强求所有人的理解。只要分清课题，允许别人讨厌自己，你就获得了解脱的自由。正如书中所写：“被讨厌，是自由的开始。”"
  },
  {
    id: 3,
    title: "《沉思录》：专注于当下这一刻",
    category: "斯多葛哲学",
    summary: "古罗马皇帝马可·奥勒留曾写道：不要去理会未来，你所能失去的只有此时此刻。专注于当下的责任，才能获得真正的平静...",
    content: "古罗马皇帝马可·奥勒留曾在他的私人日记《沉思录》中写道：不要去理会未来，也不要忧心过去。你所能失去的只有此时此刻，因为你无法失去一个你未曾拥有的东西。\n\n作为斯多葛学派的代表人物，奥勒留在面对战乱与帝国的风雨时，用最坚韧的哲学安顿内心。他提醒自己，每个人都只活在极其短暂的一瞬，那就是现在。其余的，要么已经过去，要么还未可知。\n\n当我们为工作压力焦虑、为老板的脸色不安时，我们是在为了未来和过去消耗现在的生命。如果你把每一项眼前的具体任务（哪怕是洗手、走路、或者带薪拉屎）都当作生命中仅有的、最值得专注的事情来对待，摒弃杂念，你的内心就会涌现出不可动摇的宁静。\n\n斯多葛哲学不是消极的避世，而是一种极度理性的自律：控制你能控制的（你当下的心态和行为），放下你无法控制的（外界的环境和别人的看法）。"
  },
  {
    id: 4,
    title: "为什么猫喜欢盯着主人上厕所？",
    category: "萌宠百科",
    summary: "每次你关上浴室门，家里的猫咪就会在门口疯狂抓门刨地；即使你开着门，它也会目不转睛地盯着你。这是为什么呢？...",
    content: "每次你关上浴室门，家里的猫咪就会在门口疯狂抓门刨地；即使你开着门，它也会在一旁目不转睛地盯着你。这不仅不是偶然，在动物行为学上，猫咪这种看似“变态”的行为背后有着深刻的进化生存本能：\n\n1. 领地意识：在猫的逻辑里，整个房子都是它的领地。紧闭的房门对它们来说是一道无法接受的屏障，它们必须知道里面发生了什么，以防有‘入侵者’。\n\n2. 脆弱时刻的保护：在自然界中，排泄是动物最脆弱、最容易遭受捕食者袭击的时刻。作为你的‘家人’，猫咪认为你处于极度危险中，它在马桶旁守卫你，实际上是它在履行保护你的神圣职责！\n\n3. 气味与好奇心：浴室里有充足的水汽，这会放大主人的个人气味。猫咪非常迷恋这种熟悉的味道。而且，马桶冲水时的声音对猫来说也是一种极其有趣的科学现象，它必须在最前排‘吃瓜’。\n\n所以，下次猫咪再盯着你拉屎，不要觉得尴尬。这其实是它在用最原始的本能向你宣告：别怕，人类，这里有我罩着你！"
  },
  {
    id: 5,
    title: "梁实秋《雅舍小品》：谈闲暇的艺术",
    category: "经典散文",
    summary: "人类的最高理想应该是闲暇。唯有在闲暇中，灵魂才能自由呼吸。现代人最大的悲哀，在于不会‘偷闲’...",
    content: "人类的最高理想应该是闲暇。唯有在闲暇中，人的灵魂才能自由呼吸，去做一些毫无目的却让人心旷神怡的事。\n\n在《雅舍小品》中，梁实秋先生以其闲雅风趣的笔调，畅谈了闲暇的真谛。他认为，闲并不是无所事事，也不是躺着发呆，而是一种从紧绷的生活节奏中主动“抽离”的心境。\n\n现代人最大的悲哀，在于不会‘偷闲’。要么是在疯狂的加班，要么是在为了某种目的（如考证、健身、社交）而忙碌。我们甚至连娱乐都带有了强烈的目的性。\n\n真正的闲，是“无所为而为”。在阴雨天听雨打芭蕉，在夏夜里看晚霞渐渐褪去，或者在忙碌的办公室里找一个借口（比如带薪上厕所），在几平米的小格间里，享受十分钟纯粹属于自己的宁静。\n\n正如文中所说：“能闲世人之所忙者，方能忙世人之所闲。”这极短的时间，不是生命的虚度，而是灵魂的充电桩。"
  },
  {
    id: 6,
    title: "2026年全球科技：脑机接口与AI助理的融合",
    category: "前沿科技",
    summary: "随着最新一代混合计算模型与微型脑机接口的突破，人类迎来了真正的‘心念交互’时代。智能助理将直接理解你的潜意识思维...",
    content: "随着 2026 年最新一代低功耗脑机接口（BCI）与多模态AI混合模型的重大技术突破，科技界迎来了一场交互革命——“心念交互时代”已经悄然拉开序幕。\n\n最新的脑机设备不再需要侵入式手术，而是通过轻量级的耳戴式或贴片传感器，以高达 98% 的准确率解码运动皮层的电信号。这意味着用户无需开口，也无需动手指，只需要在脑海中产生特定意图（如“滑过这页”、“搜索关于痔疮的健康指南”），AI 助理即可实时做出反应。\n\n此外，具身智能助理能够根据你的心率、体温以及专注度，实时调整工作环境。当你坐在马桶上完全放松时，它会自动帮你过滤掉所有来自老板 and 客户的紧急邮件，只给你推送你最感兴趣的新闻和小说节选。\n\n当然，这项技术的普及也引发了空前的信息隐私探讨。如何在享受“心念交互”的便利的同时，防止科技巨头连我们‘上厕所时的胡思乱想’都一并抓取？这或许是未来五年人类面临的最大伦理挑战。"
  },
  {
    id: 7,
    title: "庄子：逍遥游的当代打工学解读",
    category: "古典智慧",
    summary: "北冥有鱼，其名为鲲。大鹏展翅九万里，而小蝉和斑鸠却在嘲笑它。这其实是庄子给当代职场人的‘反内卷’指南...",
    content: "《庄子·逍遥游》开篇即以瑰丽奇幻的想象震撼世人：“北冥有鱼，其名为鲲。鲲之大，不知其几千里也。”当鲲化为鹏，振翅飞往南海，九万里风在下，其翼若垂天之云。\n\n然而，树林里的小蝉和斑鸠却嘲笑大鹏：“我们飞起落在榆树上，有时飞不到就掉在地上，何必飞九万里去南海呢？”\n\n庄子用这个寓言揭示了一个核心道理：“小知不及大知，小年不及大年。”世俗的考核、绩效、升职加薪，就像是蝉和斑鸠眼中的小树林。而真正的逍遥，是摆脱这种外在标准的束缚，找到属于自己的广阔天地。\n\n如果用当代职场的视角来解读，逍遥游就是一部极致的‘反内卷指南’。不要拿别人的 KPI 来折磨自己，不要因为没有飞到“九万里”而焦虑自责。做大鹏有大鹏的壮美，做小雀也有小雀的自得。最重要的是“乘天地之正，而御六气之辩，以游无穷”。\n\n放下盲目的对比，在自己的世界里安然自得，你就是逍遥的。"
  },
  {
    id: 8,
    title: "为什么你会在洗澡或拉屎时唱歌？",
    category: "有趣声学",
    summary: "很多人一进浴室就会化身为‘浴室歌神’，这主要是因为瓷砖墙面的声学反射以及狭小空间带来的特殊混响效果...",
    content: "你是否发现，自己一旦进入狭窄的洗手间或者淋浴间，就特别想哼几句歌，而且唱出来的歌声似乎比平时好听十倍？这绝对不是你的错觉，而是纯粹的声学与心理学现象在起作用：\n\n1. 完美的“天然混响器”：洗手间和淋浴间的墙壁大多由光滑、坚硬的瓷砖制成，它们是声音的极佳反射面。当你在里面唱歌时，声波在极短的距离内多次来回反射，产生极佳的“混响”和“延迟”效果。这和录音棚里的专业声卡效果非常相似，它能够抹平你歌声中细微的破音和颤音，让歌声显得更加立体丰满。\n\n2. 心理上的完全安全感：浴室或卫生间是一个人最私密、绝对安全的地方。当你在这里卸下所有防备、处于温暖湿润的环境中时，体内会释放多巴胺。这种轻松愉快的心情会自然而然地通过歌声表达出来。\n\n3. 极佳的低音共振：由于卫生间空间狭小，极易发生“驻波共振”现象，这会天然地放大你的中低音频段，让你的声音听起来更加低沉、磁性和温暖。\n\n所以，别害羞，在你的私人卡拉OK间里，尽情释放你的音乐才华吧！"
  }
];

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export const ReadingList = () => {
  const [articlesPool, setArticlesPool] = useState(database);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // 随机获取 3 篇不重复的文章
  const refreshArticles = (customPool = articlesPool) => {
    const shuffled = [...customPool].sort(() => 0.5 - Math.random());
    setVisibleItems(shuffled.slice(0, 3));
  };

  // 1. 获取动态科技/AI新闻并混入池子
  useEffect(() => {
    const fetchDynamicNews = async () => {
      setIsLoadingNews(true);
      try {
        // 使用免费的 rss2json 转换 ITHome 的 RSS 科技资讯
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.ithome.com/rss/");
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const dynamicArticles = data.items.map((item, index) => {
            const cleanSummary = stripHtml(item.description || item.content).substring(0, 100).trim() + "...";
            const cleanContent = stripHtml(item.content || item.description).trim();
            const isAI = item.title.toLowerCase().includes('ai') || 
                          item.title.includes('人工智能') || 
                          item.title.toLowerCase().includes('gpt') ||
                          item.title.toLowerCase().includes('claude');
            
            return {
              id: `dynamic-${index}`,
              title: item.title,
              category: isAI ? "🔥 前沿AI" : "⚡ 最新科技",
              summary: cleanSummary,
              content: cleanContent
            };
          });

          // 将动态抓取的最新新闻和静态的经典哲学散文融为一体！
          setArticlesPool(prev => [...dynamicArticles, ...prev]);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic tech news:", err);
      } finally {
        setIsLoadingNews(false);
      }
    };
    fetchDynamicNews();
  }, []);

  // 2. 当池子更新时，自动重组可见文章
  useEffect(() => {
    refreshArticles(articlesPool);
  }, [articlesPool]);

  return (
    <div style={{ textAlign: 'left', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        <h3 style={{ color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          打发时间读物推荐 📖
          {isLoadingNews && (
            <span style={{ fontSize: '11px', color: '#888', fontWeight: 'normal', animation: 'pulse 1.5s infinite' }}>
              (正在同步最新AI科技资讯...)
            </span>
          )}
        </h3>
        <button 
          onClick={() => refreshArticles(articlesPool)}
          style={{ 
            fontSize: '12px', 
            padding: '4px 10px', 
            backgroundColor: '#333', 
            border: '1px solid #555', 
            borderRadius: '15px', 
            color: '#4CAF50',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
        >
          🔄 换一批
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {visibleItems.map((item) => {
          const isDynamic = item.id.toString().startsWith('dynamic');
          return (
            <li 
              key={item.id} 
              onClick={() => setSelectedArticle(item)}
              style={{ 
                marginBottom: '15px', 
                backgroundColor: isDynamic ? 'rgba(76, 175, 80, 0.05)' : '#222', 
                padding: '15px', 
                borderRadius: '12px', 
                cursor: 'pointer',
                border: isDynamic ? '1px dashed rgba(76, 175, 80, 0.3)' : '1px solid #333',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isDynamic ? 'rgba(76, 175, 80, 0.1)' : '#2a2a2a';
                e.currentTarget.style.borderColor = '#4CAF50';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isDynamic ? 'rgba(76, 175, 80, 0.05)' : '#222';
                e.currentTarget.style.borderColor = isDynamic ? 'rgba(76, 175, 80, 0.3)' : '#333';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ 
                  fontSize: '11px', 
                  color: isDynamic ? '#81C784' : '#4CAF50', 
                  backgroundColor: isDynamic ? 'rgba(129, 199, 132, 0.15)' : 'rgba(76, 175, 80, 0.1)', 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  fontWeight: 'bold' 
                }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '11px', color: '#888' }}>点击阅读全文 ➔</span>
              </div>
              <h4 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '16px' }}>{item.title}</h4>
              <p style={{ color: '#bbbbbb', margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
                {item.summary}
              </p>
            </li>
          );
        })}
      </ul>

      {/* 详细文章阅读弹窗模态框 */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 100,
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            width: '100%',
            maxWidth: '500px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            {/* 弹窗头部 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '12px', color: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                {selectedArticle.category}
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{ 
                  backgroundColor: '#333', 
                  border: 'none', 
                  color: '#fff', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            {/* 标题 */}
            <h3 style={{ color: '#ffffff', margin: '0 0 20px 0', fontSize: '20px', lineHeight: '1.4' }}>{selectedArticle.title}</h3>

            {/* 文章正文滚动区域 */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              color: '#dddddd', 
              fontSize: '15px', 
              lineHeight: '1.8', 
              textAlign: 'left',
              paddingRight: '8px',
              whiteSpace: 'pre-line' 
            }}>
              {selectedArticle.content}
            </div>

            {/* 底部按钮 */}
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{
                marginTop: '20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              已阅，返回拉屎
            </button>
          </div>
        </div>
      )}

      {/* 简单的动画定义 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
