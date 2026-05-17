import React, { useState } from 'react';

const excerpts = [
  {
    title: "《被讨厌的勇气》节选一",
    content: "决定我们自身的不是过去的经历，而是我们自己赋予经历的意义。"
  },
  {
    title: "《被讨厌的勇气》节选二",
    content: "如果一味地关注过去的原因，企图仅仅靠原因去解释事物，那就会陷入“决定论”。也就是说，最终会得出这样的结论：我们的现在甚至未来全部都由过去的事情所决定，而且根本无法改变。"
  },
  {
    title: "《被讨厌的勇气》节选三",
    content: "无论之前的人生发生过什么，都对今后的人生如何度过没有影响。决定自己人生的是活在“此时此刻”的你自己。"
  },
  {
    title: "今日国际要闻 (模拟)",
    content: "据报道，全球经济呈现稳步复苏态势，科技创新继续引领产业变革。多国重申合作应对全球性挑战的重要性..."
  },
  {
    title: "《沉思录》节选",
    content: "你不能失去过去，也不能失去未来，因为人怎么能失去他没有的东西呢？你所能失去的，只是此时此刻。"
  }
];

export const ReadingList = () => {
  const [items] = useState(excerpts);

  return (
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ color: '#aaa', marginTop: 0, marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        打发时间读物推荐 📖
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px', backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#ddd', margin: '0 0 10px 0' }}>{item.title}</h4>
            <p style={{ color: '#999', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
              {item.content}
            </p>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '12px' }}>
        持续拉屎中，以上内容随机为您抓取...
      </div>
    </div>
  );
};
