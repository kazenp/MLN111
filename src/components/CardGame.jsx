import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Club, Heart, Spade, Diamond, RefreshCcw, Hand, Trophy, TriangleAlert, Cpu, ArrowLeft, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUITS = [
  { name: 'Spades', icon: <Spade className="w-5 h-5" />, color: 'text-zinc-900', rawColor: '#18181b' },
  { name: 'Hearts', icon: <Heart className="w-5 h-5 fill-current" />, color: 'text-red-600', rawColor: '#dc2626' },
  { name: 'Clubs', icon: <Club className="w-5 h-5 fill-current" />, color: 'text-zinc-900', rawColor: '#18181b' },
  { name: 'Diamonds', icon: <Diamond className="w-5 h-5 fill-current" />, color: 'text-red-600', rawColor: '#dc2626' },
];

const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const QUESTIONS = [
  {
    q: "Tồn tại xã hội là gì?",
    options: [
      "Phương diện sinh hoạt tinh thần của đời sống xã hội",
      "Toàn bộ đời sống vật chất và những điều kiện sinh hoạt vật chất của xã hội",
      "Hệ thống quan điểm, học thuyết chính trị - xã hội",
      "Môi trường sinh thái tự nhiên bao quanh con người"
    ],
    correct: 1,
    desc: "Tồn tại xã hội là phạm trù triết học dùng để chỉ phương diện sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội."
  },
  {
    q: "Yếu tố nào đóng vai trò cơ bản nhất và quyết định nhất trong tồn tại xã hội?",
    options: [
      "Hoàn cảnh địa lý - tự nhiên",
      "Mật độ phân bố dân cư",
      "Phương thức sản xuất của cải vật chất",
      "Cơ cấu phát triển dân số"
    ],
    correct: 2,
    desc: "Phương thức sản xuất vật chất quyết định sự tồn tại và phát triển của xã hội, là yếu tố cơ bản và quan trọng nhất của tồn tại xã hội."
  },
  {
    q: "Yếu tố nào sau đây KHÔNG thuộc về tồn tại xã hội?",
    options: [
      "Phương thức sản xuất vật chất",
      "Hoàn cảnh địa lý tự nhiên",
      "Dân số và mật độ dân số",
      "Hệ tư tưởng và tâm lý xã hội"
    ],
    correct: 3,
    desc: "Hệ tư tưởng và tâm lý xã hội thuộc về phạm trù ý thức xã hội (đời sống tinh thần), không thuộc về tồn tại xã hội (đời sống vật chất)."
  },
  {
    q: "Ý thức xã hội phản ánh điều gì?",
    options: [
      "Tập quán tâm lý của mỗi cá nhân",
      "Ý chí chủ quan của giai cấp thống trị",
      "Tồn tại xã hội",
      "Các thế lực siêu nhiên thần bí"
    ],
    correct: 2,
    desc: "Ý thức xã hội là sự phản ánh tồn tại xã hội, do tồn tại xã hội quyết định (tồn tại xã hội như thế nào thì ý thức xã hội phản ánh thế ấy)."
  },
  {
    q: "Theo trình độ phản ánh, ý thức xã hội gồm các bộ phận nào?",
    options: [
      "Ý thức chính trị và ý thức pháp quyền",
      "Ý thức xã hội thông thường và ý thức lý luận (lý luận khoa học, hệ tư tưởng)",
      "Tâm lý xã hội và hệ tư tưởng xã hội",
      "Ý thức tiến bộ và ý thức lạc hậu"
    ],
    correct: 1,
    desc: "Phân chia theo trình độ phản ánh của ý thức xã hội đối với tồn tại xã hội bao gồm ý thức xã hội thông thường (kinh nghiệm tự phát) và ý thức lý luận (khoa học, hệ tư tưởng)."
  },
  {
    q: "Theo hai cấp độ/bộ phận của đời sống tinh thần, ý thức xã hội gồm:",
    options: [
      "Ý thức thông thường và ý thức khoa học",
      "Tâm lý xã hội và hệ tư tưởng xã hội",
      "Ý thức tôn giáo và ý thức nghệ thuật",
      "Ý thức chính trị và ý thức đạo đức"
    ],
    correct: 1,
    desc: "Tâm lý xã hội và hệ tư tưởng là hai bộ phận cấu thành ý thức xã hội dựa theo cấp độ, nguồn gốc và mức độ khái quát của đời sống tinh thần."
  },
  {
    q: "Tâm lý xã hội hình thành như thế nào?",
    options: [
      "Do các nhà khoa học, nhà tư tưởng sáng tạo ra",
      "Trực tiếp và tự phát từ đời sống sinh hoạt hàng ngày của con người",
      "Thông qua giảng dạy lý luận chính trị và pháp luật",
      "Do ý chí chủ quan của nhà nước áp đặt"
    ],
    correct: 1,
    desc: "Tâm lý xã hội là toàn bộ tình cảm, ước muốn, thói quen, tâm trạng... nảy sinh trực tiếp và tự phát dưới tác động của đời sống thường nhật."
  },
  {
    q: "Hệ tư tưởng xã hội có đặc điểm nổi bật nào?",
    options: [
      "Chỉ bao gồm tình cảm, tâm trạng tự phát",
      "Là hệ thống quan điểm, tư tưởng được khái quát hóa, hệ thống hóa thành lý luận",
      "Hoàn toàn độc lập và không mang tính giai cấp trong xã hội",
      "Tự động biến đổi tức thời theo biến đổi kinh tế"
    ],
    correct: 1,
    desc: "Hệ tư tưởng là hệ thống các quan điểm, tư tưởng được khái quát hóa, hệ thống hóa thành các lý thuyết, học thuyết lớn đại diện cho lợi ích giai cấp."
  },
  {
    q: "Bộ phận nào phản ánh tồn tại xã hội một cách gián tiếp, tự giác và có tính lý luận cao?",
    options: [
      "Tâm lý xã hội",
      "Ý thức thông thường",
      "Hệ tư tưởng xã hội",
      "Phong tục tập quán"
    ],
    correct: 2,
    desc: "Hệ tư tưởng phản ánh tồn tại xã hội một cách gián tiếp qua lăng kính lý luận và lợi ích giai cấp, có tính tự giác và hệ thống cao."
  },
  {
    q: "Mối quan hệ biện chứng giữa tồn tại xã hội và ý thức xã hội là:",
    options: [
      "Ý thức xã hội quyết định hoàn toàn tồn tại xã hội",
      "Tồn tại xã hội quyết định ý thức xã hội, đồng thời ý thức xã hội có tính độc lập tương đối",
      "Hai yếu tố song song tồn tại, không liên quan và ảnh hưởng lẫn nhau",
      "Ý thức xã hội luôn thay đổi trước, sau đó tồn tại xã hội mới thay đổi theo"
    ],
    correct: 1,
    desc: "Đây là nguyên lý cơ bản của chủ nghĩa duy vật lịch sử: tồn tại xã hội quyết định ý thức xã hội nhưng ý thức xã hội có tính độc lập tương đối."
  },
  {
    q: "Khi phương thức sản xuất vật chất thay đổi, ý thức xã hội sẽ:",
    options: [
      "Thay đổi ngay lập tức không có độ trễ thời gian",
      "Sớm muộn cũng biến đổi theo để phù hợp với tồn tại xã hội mới",
      "Giữ nguyên vĩnh viễn không chịu tác động",
      "Trở nên tiến bộ hơn mà không cần tác động thực tiễn"
    ],
    correct: 1,
    desc: "Ý thức xã hội phản ánh tồn tại xã hội, do đó khi cơ sở vật chất (phương thức sản xuất) thay đổi thì ý thức xã hội sớm muộn cũng biến đổi theo."
  },
  {
    q: "Nguyên nhân chính khiến ý thức xã hội thường lạc hậu hơn tồn tại xã hội là:",
    options: [
      "Do con người không có tư duy khoa học",
      "Sức ỳ của thói quen, tập quán, truyền thống cũ và sự bảo thủ của giai cấp lỗi thời",
      "Do sự biến đổi quá nhanh của địa lý tự nhiên",
      "Do ý thức không có mối liên hệ nào với đời sống vật chất"
    ],
    correct: 1,
    desc: "Nhiều phong tục, thói quen cũ đã bén rễ sâu nên biến đổi chậm, đồng thời giai cấp lỗi thời muốn níu kéo tư tưởng cũ để bảo vệ lợi ích của mình."
  },
  {
    q: "Ý thức xã hội có thể vượt trước tồn tại xã hội trong trường hợp nào?",
    options: [
      "Tư tưởng lạc hậu, mê tín dị đoan truyền thống",
      "Tư tưởng cách mạng, lý luận khoa học tiên phong phản ánh đúng quy luật khách quan",
      "Tâm trạng lo âu tự phát của đám đông",
      "Ý thức thông thường dựa trên kinh nghiệm vụn vặt"
    ],
    correct: 1,
    desc: "Lý luận khoa học tiên phong có khả năng nắm bắt quy luật phát triển khách quan nên có thể vượt trước và định hướng cải tạo thực tiễn."
  },
  {
    q: "Tính độc lập tương đối của ý thức xã hội KHÔNG bao gồm biểu hiện nào?",
    options: [
      "Tính lạc hậu hoặc vượt trước tồn tại xã hội",
      "Tính kế thừa trong sự phát triển tư tưởng",
      "Quyết định sự xuất hiện ban đầu của phương thức sản xuất vật chất",
      "Sự tác động qua lại giữa các hình thái ý thức xã hội và tác động trở lại tồn tại xã hội"
    ],
    correct: 2,
    desc: "Ý thức xã hội không quyết định nguồn gốc sinh ra phương thức sản xuất vật chất; phương thức sản xuất là yếu tố khách quan thuộc tồn tại xã hội."
  },
  {
    q: "Ý thức xã hội tác động trở lại tồn tại xã hội chủ yếu thông qua yếu tố nào?",
    options: [
      "Quá trình suy ngẫm đơn thuần của các cá nhân lỗi lạc",
      "Hoạt động thực tiễn cải tạo xã hội của quần chúng nhân dân dưới sự chỉ đạo của tư tưởng",
      "Sự thay đổi mật độ dân số tự nhiên",
      "Sự thay đổi thời tiết khí hậu của môi trường địa lý"
    ],
    correct: 1,
    desc: "Ý thức xã hội chỉ tác động trở lại tồn tại xã hội thông qua hoạt động thực tiễn có ý thức của con người nhằm biến tư tưởng thành hiện thực."
  },
  {
    q: "Ý thức xã hội tác động trở lại tồn tại xã hội theo những hướng nào?",
    options: [
      "Chỉ thúc đẩy xã hội phát triển đi lên",
      "Chỉ kìm hãm xã hội và gây trì trệ",
      "Có thể thúc đẩy (nếu tiên tiến, khoa học) hoặc kìm hãm (nếu lạc hậu, lỗi thời)",
      "Không bao giờ tác động ngược trở lại được"
    ],
    correct: 2,
    desc: "Mức độ và hướng tác động phụ thuộc vào tính chất tư tưởng: tư tưởng khoa học tiến bộ sẽ thúc đẩy, tư tưởng lạc hậu sẽ kìm hãm tồn tại xã hội."
  },
  {
    q: "Hình thái ý thức nào thể hiện trực tiếp nhất lợi ích giai cấp và đấu tranh giành, giữ chính quyền?",
    options: [
      "Ý thức khoa học",
      "Ý thức chính trị",
      "Ý thức tôn giáo",
      "Ý thức thẩm mỹ"
    ],
    correct: 1,
    desc: "Ý thức chính trị xuất hiện trong xã hội có giai cấp, phản ánh trực tiếp quan hệ giai cấp và cuộc đấu tranh giành giật quyền lực nhà nước."
  },
  {
    q: "Hình thái ý thức pháp quyền phản ánh điều gì?",
    options: [
      "Các quan hệ kinh tế bằng ngôn ngữ của quyền lợi và nghĩa vụ pháp lý, luật lệ",
      "Tình cảm thẩm mỹ trước cái đẹp",
      "Sự thiêng liêng và niềm tin vào đấng siêu nhiên",
      "Mối quan hệ thiện và ác trong ứng xử xã hội"
    ],
    correct: 0,
    desc: "Ý thức pháp quyền là hệ thống quan điểm về tính hợp pháp/bất hợp pháp của hành vi, thể hiện qua hệ thống các quy phạm pháp luật và luật lệ."
  },
  {
    q: "Ý thức đạo đức phản ánh xã hội dưới góc độ nào?",
    options: [
      "Lợi ích kinh tế thuần túy",
      "Các hình tượng nghệ thuật sống động",
      "Thiện và ác, lương tâm, danh dự, nghĩa vụ và công bằng trong quan hệ người với người",
      "Các định luật khoa học khách quan"
    ],
    correct: 2,
    desc: "Ý thức đạo đức là hệ thống các chuẩn mực ứng xử tự nguyện dựa trên các khái niệm thiện - ác, nghĩa vụ, lương tâm, danh dự và lòng tự trọng."
  },
  {
    q: "Hình thái ý thức thẩm mỹ phản ánh thế giới bằng phương thức nào?",
    options: [
      "Thông qua các khái niệm toán học trừu tượng",
      "Thông qua các hình tượng nghệ thuật chân thực và sinh động",
      "Thông qua các niềm tin tâm linh thần bí",
      "Thông qua hệ thống các điều luật xử phạt"
    ],
    correct: 1,
    desc: "Ý thức thẩm mỹ (nghệ thuật) phản ánh hiện thực khách quan thông qua các hình tượng nghệ thuật nhằm khơi gợi cảm xúc thẩm mỹ và cái đẹp."
  },
  {
    q: "Hình thái ý thức tôn giáo phản ánh hiện thực như thế nào?",
    options: [
      "Phản ánh khách quan bằng kiểm chứng thực nghiệm",
      "Phản ánh hư ảo, hoang đường dưới dạng các lực lượng siêu nhiên, thần thánh",
      "Phản ánh bằng ngôn từ chính trị sắc bén",
      "Phản ánh thông qua đạo lý thiện ác"
    ],
    correct: 1,
    desc: "Tôn giáo phản ánh thế giới khách quan một cách hoang đường, hư ảo, gửi gắm niềm tin của con người vào thế giới siêu nhiên thần thánh."
  }
];

// Helper to get combinations of 5 out of 7 cards
const getCombinations = (array, k) => {
  const result = [];
  const f = (active, rest) => {
    if (active.length === k) {
      result.push(active);
      return;
    }
    for (let i = 0; i < rest.length; i++) {
      f([...active, rest[i]], rest.slice(i + 1));
    }
  };
  f([], array);
  return result;
};

// Evaluate a 5-card Poker Hand
const evaluate5CardHand = (hand) => {
  const valMap = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
  const ranks = hand.map(c => valMap[c.value]).sort((a, b) => b - a);
  const suits = hand.map(c => c.suit);

  const isFlush = suits.every(s => s === suits[0]);

  // Check straight
  let isStraight = false;
  const uniqueRanks = [...new Set(ranks)];
  if (uniqueRanks.length === 5) {
    if (ranks[0] - ranks[4] === 4) {
      isStraight = true;
    } else if (ranks[0] === 14 && ranks[1] === 5 && ranks[2] === 4 && ranks[3] === 3 && ranks[4] === 2) {
      isStraight = true;
    }
  }

  // Count frequencies
  const counts = {};
  ranks.forEach(r => { counts[r] = (counts[r] || 0) + 1; });
  const freqs = Object.values(counts).sort((a, b) => b - a);
  const freqKeys = Object.keys(counts).map(Number).sort((a, b) => {
    if (counts[b] !== counts[a]) {
      return counts[b] - counts[a];
    }
    return b - a;
  });

  let handType = 'Mậu Thầu';
  let typeScore = 0;

  if (isFlush && isStraight) {
    if (ranks[0] === 14 && ranks[4] === 10) {
      handType = 'Thùng Phá Sảnh Lớn (Royal Flush)';
      typeScore = 9;
    } else {
      handType = 'Thùng Phá Sảnh (Straight Flush)';
      typeScore = 8;
    }
  } else if (freqs[0] === 4) {
    handType = 'Tứ Quý (Four of a Kind)';
    typeScore = 7;
  } else if (freqs[0] === 3 && freqs[1] === 2) {
    handType = 'Cù Lũ (Full House)';
    typeScore = 6;
  } else if (isFlush) {
    handType = 'Thùng (Flush)';
    typeScore = 5;
  } else if (isStraight) {
    handType = 'Sảnh (Straight)';
    typeScore = 4;
  } else if (freqs[0] === 3) {
    handType = 'Sám Cô (Three of a Kind)';
    typeScore = 3;
  } else if (freqs[0] === 2 && freqs[1] === 2) {
    handType = 'Thú (Two Pair)';
    typeScore = 2;
  } else if (freqs[0] === 2) {
    handType = 'Đôi (One Pair)';
    typeScore = 1;
  } else {
    handType = 'Mậu Thầu (High Card)';
    typeScore = 0;
  }

  // Calculate detailed numeric score for tiebreaks
  let tieBreakerRanks = [...freqKeys];
  if (isStraight && ranks[0] === 14 && ranks[1] === 5) {
    // Wheel straight: rank should be evaluated as 5, 4, 3, 2, 1
    tieBreakerRanks = [5, 4, 3, 2, 1];
  }

  let scoreValue = typeScore * 1000000;
  let multiplier = 10000;
  for (let i = 0; i < tieBreakerRanks.length; i++) {
    scoreValue += tieBreakerRanks[i] * multiplier;
    multiplier /= 15;
  }

  return {
    handType,
    scoreValue,
    ranks: tieBreakerRanks,
    cards: hand
  };
};

const evaluate7CardHand = (sevenCards) => {
  const combinations = getCombinations(sevenCards, 5);
  let bestHand = null;
  for (const combo of combinations) {
    const evalResult = evaluate5CardHand(combo);
    if (!bestHand || evalResult.scoreValue > bestHand.scoreValue) {
      bestHand = evalResult;
    }
  }
  return bestHand;
};

// Card component representation
const Card = ({ card, hidden }) => {
  if (hidden) {
    return (
      <div className="w-16 h-24 md:w-20 md:h-30 rounded-xl bg-gradient-to-br from-soviet-red to-red-800 border-2 border-white/20 shadow-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-1.5 border border-white/10 rounded-lg flex items-center justify-center">
          <div className="text-white/20 font-black text-2xl">★</div>
        </div>
      </div>
    );
  }

  const suitObj = SUITS.find(s => s.name === card.suit);
  return (
    <motion.div
      initial={{ scale: 0.8, rotateY: 180, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-16 h-24 md:w-20 md:h-30 rounded-xl bg-white border border-zinc-200 shadow-md flex flex-col justify-between p-2 text-zinc-900 relative"
    >
      <div className="flex flex-col items-start leading-none">
        <span className="text-sm md:text-base font-black">{card.value}</span>
        <span className={suitObj.color}>{suitObj.icon}</span>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150`}>
        {suitObj.icon}
      </div>
      <div className="flex flex-col items-end leading-none rotate-180 self-end">
        <span className="text-sm md:text-base font-black">{card.value}</span>
        <span className={suitObj.color}>{suitObj.icon}</span>
      </div>
    </motion.div>
  );
};

const CardGame = () => {
  // Game state variables
  const [playerChips, setPlayerChips] = useState(500);
  const [botChips, setBotChips] = useState(500);
  const [pot, setPot] = useState(0);
  
  const [playerHand, setPlayerHand] = useState([]);
  const [botHand, setBotHand] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [revealedCommunityCount, setRevealedCommunityCount] = useState(0);
  
  const [gameState, setGameState] = useState('welcome'); // welcome, betting, preflop, flop, river, showdown, bankrupt_player, bankrupt_bot
  const [roundMessage, setRoundMessage] = useState('Bắt đầu chơi Poker Texas Hold\'em cùng Karl Marx!');
  const [botQuote, setBotQuote] = useState('Chào đồng chí! Hãy xem đời sống thực tế quyết định tư duy hay ngược lại trên bàn Poker này nhé.');
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null); // null, correct, incorrect
  const [penaltyCost, setPenaltyCost] = useState(0);

  // Initialize a shuffled deck
  const generateDeck = () => {
    const deck = [];
    SUITS.forEach(suit => {
      VALUES.forEach(value => {
        deck.push({ suit: suit.name, value });
      });
    });
    return deck;
  };

  const shuffle = (deck) => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };

  // Start new round
  const startNewRound = () => {
    if (playerChips < 20) {
      setGameState('bankrupt_player');
      return;
    }
    if (botChips < 20) {
      setGameState('bankrupt_bot');
      return;
    }

    const deck = shuffle(generateDeck());
    
    // Deal hands
    const pHand = [deck[0], deck[1]];
    const bHand = [deck[2], deck[3]];
    const comm = [deck[4], deck[5], deck[6], deck[7], deck[8]];

    setPlayerHand(pHand);
    setBotHand(bHand);
    setCommunityCards(comm);
    setRevealedCommunityCount(0);

    // Blinds posting (SB 10, BB 20)
    setPlayerChips(prev => prev - 10);
    setBotChips(prev => prev - 20);
    setPot(30);

    setGameState('preflop');
    setRoundMessage('Ván bài bắt đầu! Hãy trả lời câu hỏi để lật xem bài tẩy của bạn.');
    setBotQuote('Hãy để ý thức xã hội bắt đầu phân tích những lá bài tẩy!');
    triggerQuiz(15); // Trigger Quiz for Preflop
  };

  // Reset entire game
  const resetGame = () => {
    setPlayerChips(500);
    setBotChips(500);
    setPot(0);
    setPlayerHand([]);
    setBotHand([]);
    setCommunityCards([]);
    setRevealedCommunityCount(0);
    setGameState('betting');
    setRoundMessage('Sẵn sàng cho một trận đấu Poker tư duy mới!');
    setBotQuote('Đồng chí đã sẵn sàng thử thách tri thức triết học của mình chưa?');
  };

  // Trigger Quiz Modal
  const triggerQuiz = (penalty) => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    setCurrentQuiz(QUESTIONS[randomIndex]);
    setSelectedOption(null);
    setQuizFeedback(null);
    setPenaltyCost(penalty);
    setShowQuiz(true);
  };

  // Handle option click in Quiz
  const handleQuizAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
    if (optionIdx === currentQuiz.correct) {
      setQuizFeedback('correct');
    } else {
      setQuizFeedback('incorrect');
    }
  };

  // Progress after Quiz closes
  const handleQuizResultClose = () => {
    setShowQuiz(false);

    if (quizFeedback === 'correct') {
      // Free action: proceed to normal choice
      setRoundMessage('Xuất sắc! Câu trả lời chính xác giúp bạn có đầy đủ các quyền cược.');
      setBotQuote('Tư duy lý luận của đồng chí rất tốt! Hãy đưa ra nước đi đi.');
    } else {
      // Penalty action: forced call with penalty or fold
      const checkPenaltyAmount = Math.min(penaltyCost, playerChips);
      setPlayerChips(prev => prev - checkPenaltyAmount);
      setPot(prev => prev + checkPenaltyAmount);

      setRoundMessage(`Sai rồi! Bạn bị phạt cược ${checkPenaltyAmount} chips để tiếp tục ở lại ván đấu.`);
      setBotQuote('Ý thức lệch lạc so với thực tế sẽ dẫn tới hao tổn vật chất. Thật đáng tiếc!');
      
      // Auto-progress stages if they are penalized, or they can choose to fold
      progressGameStage('call');
    }
  };

  // User Actions during normal Correct stages
  const handlePlayerAction = (action) => {
    if (action === 'fold') {
      // Bot takes the pot
      setBotChips(prev => prev + pot);
      setRoundMessage('Bạn đã Úp bài (Fold). Karl Marx Bot thắng được hũ Pot!');
      setBotQuote('Lựa chọn an toàn. Rõ ràng hoàn cảnh vật chất đã làm bạn lùi bước.');
      setGameState('betting');
    } else if (action === 'check') {
      progressGameStage('check');
    } else if (action === 'call') {
      const callCost = gameState === 'preflop' ? 10 : 0; // Preflop needs 10 to match BB
      const actualCost = Math.min(callCost, playerChips);
      setPlayerChips(prev => prev - actualCost);
      setPot(prev => prev + actualCost);
      progressGameStage('call');
    } else if (action === 'bet') {
      // Normal Bet amount based on stage
      const betAmount = gameState === 'flop' ? 20 : 40;
      const actualPlayerBet = Math.min(betAmount, playerChips);
      const actualBotBet = Math.min(betAmount, botChips);
      
      setPlayerChips(prev => prev - actualPlayerBet);
      setBotChips(prev => prev - actualBotBet);
      setPot(prev => prev + actualPlayerBet + actualBotBet);
      progressGameStage('bet');
    }
  };

  // Progression of Poker Stages
  const progressGameStage = (actionTaken) => {
    if (gameState === 'preflop') {
      // Transition Preflop -> Flop
      setRevealedCommunityCount(3);
      setGameState('flop');
      setRoundMessage('Vòng Flop: 3 lá bài chung đầu tiên được lật. Trả lời Quiz tiếp theo để đặt cược.');
      setBotQuote('Thế giới khách quan đã hiện hình 3 phần. Đồng chí đánh giá thế nào?');
      triggerQuiz(25); // Penalty of 25 for flop
    } else if (gameState === 'flop') {
      // Transition Flop -> River (combine Turn & River to make it fast)
      setRevealedCommunityCount(5);
      setGameState('river');
      setRoundMessage('Vòng River: Lật toàn bộ 5 lá bài chung. Hãy trả lời câu hỏi quyết định cho vòng Showdown.');
      setBotQuote('Toàn bộ 5 lá bài chung đã xuất hiện. Thực tiễn đã hoàn chỉnh!');
      triggerQuiz(45); // Penalty of 45 for river
    } else if (gameState === 'river') {
      // Transition River -> Showdown
      setGameState('showdown');
      resolveShowdown();
    }
  };

  // Calculate and settle hand rankings at Showdown
  const resolveShowdown = () => {
    const playerFullHand = [...playerHand, ...communityCards];
    const botFullHand = [...botHand, ...communityCards];

    const playerEval = evaluate7CardHand(playerFullHand);
    const botEval = evaluate7CardHand(botFullHand);

    let showdownMsg = '';
    if (playerEval.scoreValue > botEval.scoreValue) {
      // Player wins
      setPlayerChips(prev => prev + pot);
      showdownMsg = `Bạn thắng Pot ${pot} với bộ [${playerEval.handType}] vượt qua [${botEval.handType}] của Marx!`;
      setBotQuote(`Thắng đẹp lắm đồng chí! Quả đúng là lý luận khoa học tiên phong đã đưa bạn tới chiến thắng.`);
    } else if (playerEval.scoreValue < botEval.scoreValue) {
      // Bot wins
      setBotChips(prev => prev + pot);
      showdownMsg = `Karl Marx thắng Pot ${pot} với bộ [${botEval.handType}] đánh bại [${playerEval.handType}] của bạn.`;
      setBotQuote(`Tôi đã thắng! Đời sống vật chất của tôi hôm nay có những quân bài tốt hơn. Đừng nản chí!`);
    } else {
      // Draw (Split Pot)
      const halfPot = Math.floor(pot / 2);
      setPlayerChips(prev => prev + halfPot);
      setBotChips(prev => prev + (pot - halfPot));
      showdownMsg = `Hòa! Cả hai cùng có bộ bài [${playerEval.handType}]. Pot được chia đôi.`;
      setBotQuote(`Biện chứng thật cân bằng! Hai tư duy xuất sắc gặp nhau ở cùng một kết quả.`);
    }

    setRoundMessage(showdownMsg);
  };

  // Card formatting info display
  const getHandRankName = (hand) => {
    if (hand.length < 2) return '';
    const fullHand = [...hand, ...communityCards.slice(0, revealedCommunityCount)];
    if (fullHand.length < 5) return 'Chưa đủ bài';
    const evalResult = evaluate7CardHand(fullHand);
    return evalResult.handType;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-20 px-6 pt-32 text-white flex flex-col items-center select-none overflow-x-hidden">
      <div className="max-w-5xl w-full">
        {/* Quay lại */}
        <div className="mb-6 flex justify-start">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
          </Link>
        </div>

        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-black text-soviet-red uppercase tracking-tight italic leading-none">
            Poker Tri Thức <span className="text-white">Marxist Texas Hold'em</span>
          </h2>
          <div className="h-1 bg-soviet-gold mx-auto mt-3 mb-4 w-24 rounded-full" />
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{roundMessage}</p>
        </motion.div>

        {/* BÀN POKER FELT TABLE */}
        <div className="w-full bg-gradient-to-b from-emerald-800 to-emerald-950 border-[10px] border-zinc-800 rounded-[5rem] shadow-2xl relative p-6 md:p-8 flex flex-col justify-between gap-8 min-h-[500px]">
          {/* Đường vẽ bàn poker viền trong */}
          <div className="absolute inset-4 border-2 border-white/5 rounded-[4.5rem] pointer-events-none" />

          {/* DEALER AREA (Karl Marx Bot) */}
          <div className="flex flex-col items-center gap-3 relative z-10">
            <div className="flex items-center gap-4 bg-black/40 px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
              {/* Marx Avatar */}
              <div className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-soviet-gold overflow-hidden flex items-center justify-center font-black text-white text-lg">
                KM
              </div>
              <div className="text-left">
                <span className="font-black text-xs uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-soviet-gold" /> Đối thủ: Karl Marx
                </span>
                <span className="font-mono text-sm font-bold text-soviet-gold block">{botChips} 🪙</span>
              </div>
            </div>

            {/* Speach bubble */}
            {botQuote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md bg-white text-zinc-900 px-4 py-2.5 rounded-2xl relative shadow-xl text-xs md:text-sm font-bold text-center border-2 border-soviet-gold"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
                "{botQuote}"
              </motion.div>
            )}

            {/* Bot Cards */}
            <div className="flex gap-2.5 mt-2">
              {botHand.map((card, i) => (
                <Card 
                  key={`bot-${i}`} 
                  card={card} 
                  hidden={gameState !== 'showdown'} 
                />
              ))}
            </div>
          </div>

          {/* COMMUNITY CARDS AREA (Center of felt table) */}
          <div className="flex flex-col items-center justify-center py-4 relative z-10">
            {/* POT */}
            <div className="bg-black/60 px-5 py-2 rounded-full border border-soviet-gold/40 text-center mb-4 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Tổng tiền cược (Pot)</span>
              <span className="text-xl font-mono font-black text-soviet-gold">{pot} 🪙</span>
            </div>

            {/* 5 Community Cards Grid */}
            <div className="flex gap-2 md:gap-3 bg-black/30 p-4 rounded-2xl border border-white/5 shadow-inner">
              {Array.from({ length: 5 }).map((_, idx) => {
                const card = communityCards[idx];
                const isRevealed = idx < revealedCommunityCount;

                if (card && isRevealed) {
                  return <Card key={`comm-${idx}`} card={card} />;
                }

                return (
                  <div 
                    key={`empty-comm-${idx}`} 
                    className="w-16 h-24 md:w-20 md:h-30 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-zinc-600 bg-black/10"
                  >
                    <span className="text-xs uppercase font-bold tracking-tighter opacity-30">
                      {idx === 3 ? 'Turn' : idx === 4 ? 'River' : 'Flop'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PLAYER AREA (Bottom of felt table) */}
          <div className="flex flex-col items-center gap-3 relative z-10">
            {/* Player Info */}
            <div className="flex items-center gap-4 bg-black/40 px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
              <div className="text-right">
                <span className="font-black text-xs uppercase text-zinc-400 tracking-wider block">Tài khoản của bạn</span>
                <span className="font-mono text-sm font-bold text-soviet-red block">{playerChips} 🪙</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-soviet-red border-2 border-white overflow-hidden flex items-center justify-center font-black text-white text-lg">
                U
              </div>
            </div>

            {/* Hand Ranking Name */}
            {gameState !== 'welcome' && gameState !== 'betting' && (
              <span className="text-xs font-black uppercase tracking-widest text-zinc-300">
                Bài của bạn: <span className="text-soviet-gold">{getHandRankName(playerHand)}</span>
              </span>
            )}

            {/* Player cards */}
            <div className="flex gap-2.5">
              {playerHand.map((card, i) => (
                <Card key={`player-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {gameState === 'welcome' && (
            <button
              onClick={resetGame}
              className="px-10 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              Vào bàn cược
            </button>
          )}

          {gameState === 'betting' && (
            <button
              onClick={startNewRound}
              className="px-12 py-4 bg-soviet-red text-white font-black uppercase tracking-[0.2em] rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              Chia bài cược mới
            </button>
          )}

          {(gameState === 'preflop' || gameState === 'flop' || gameState === 'river') && !showQuiz && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handlePlayerAction('fold')}
                className="px-8 py-3 bg-zinc-800 text-white font-black uppercase tracking-wider rounded-xl hover:bg-zinc-700 transition-all border border-white/5 active:scale-95"
              >
                Úp Bài (Fold)
              </button>
              {gameState === 'preflop' ? (
                <>
                  <button
                    onClick={() => handlePlayerAction('call')}
                    className="px-8 py-3 bg-white text-zinc-950 font-black uppercase tracking-wider rounded-xl hover:bg-zinc-100 transition-all active:scale-95"
                  >
                    Theo cược (Call)
                  </button>
                  <button
                    onClick={() => handlePlayerAction('bet')}
                    className="px-8 py-3 bg-soviet-gold text-zinc-950 font-black uppercase tracking-wider rounded-xl hover:bg-amber-500 transition-all active:scale-95"
                  >
                    Tố Thêm (Raise)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handlePlayerAction('check')}
                    className="px-8 py-3 bg-white text-zinc-950 font-black uppercase tracking-wider rounded-xl hover:bg-zinc-100 transition-all active:scale-95"
                  >
                    Xem bài (Check)
                  </button>
                  <button
                    onClick={() => handlePlayerAction('bet')}
                    className="px-8 py-3 bg-soviet-gold text-zinc-950 font-black uppercase tracking-wider rounded-xl hover:bg-amber-500 transition-all active:scale-95"
                  >
                    Đặt cược (Bet)
                  </button>
                </>
              )}
            </div>
          )}

          {gameState === 'showdown' && (
            <button
              onClick={startNewRound}
              className="px-12 py-4 bg-white text-zinc-900 font-black uppercase tracking-[0.2em] rounded-full shadow-lg hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
            >
              Ván tiếp theo
            </button>
          )}

          {(gameState === 'bankrupt_player' || gameState === 'bankrupt_bot') && (
            <div className="flex flex-col items-center gap-6">
              <div className="text-2xl font-black text-center uppercase tracking-wide">
                {gameState === 'bankrupt_player' ? (
                  <span className="text-red-500 flex items-center gap-2">
                    <TriangleAlert /> Đồng chí đã hết sạch chip cược!
                  </span>
                ) : (
                  <span className="text-soviet-gold flex items-center gap-2">
                    <Trophy /> Xuất sắc! Bạn đã khiến Karl Marx phá sản!
                  </span>
                )}
              </div>
              <button
                onClick={resetGame}
                className="px-12 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
              >
                Chơi lại từ đầu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {showQuiz && currentQuiz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden text-zinc-900"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-soviet-red" />
              
              <div className="mb-8 flex items-start gap-4">
                <div className="w-12 h-12 bg-soviet-red/10 rounded-2xl flex items-center justify-center text-soviet-red shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-400 font-black uppercase text-[10px] tracking-widest mb-1 italic">Vòng Đấu Cược: Trả Lời Câu Hỏi Để Có Quyền Đi</h3>
                  <p className="text-zinc-900 font-bold text-base md:text-lg leading-tight">{currentQuiz.q}</p>
                </div>
              </div>

              {/* Penalty Notice */}
              {quizFeedback === null && (
                <div className="mb-6 px-4 py-2 bg-red-50 text-red-700 font-bold text-xs rounded-xl border border-red-100 flex items-center gap-2">
                  <TriangleAlert className="w-4 h-4 shrink-0" />
                  <span>Cảnh báo: Trả lời sai bạn sẽ bị phạt tự động đóng thêm {penaltyCost} chips vào Pot!</span>
                </div>
              )}

              <div className="grid gap-4">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all text-sm flex justify-between items-center group ${
                      quizFeedback === null 
                        ? 'border-zinc-100 hover:border-soviet-red hover:bg-soviet-red/5 text-zinc-700'
                        : idx === currentQuiz.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : selectedOption === idx
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-zinc-100 text-zinc-300 opacity-60'
                    }`}
                  >
                    <span>{idx + 1}. {option}</span>
                    {quizFeedback !== null && idx === currentQuiz.correct && <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />}
                    {quizFeedback !== null && selectedOption === idx && idx !== currentQuiz.correct && <XCircle className="text-red-500 w-5 h-5 shrink-0" />}
                  </button>
                ))}
              </div>

              {/* Quiz Feedback Explanation */}
              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-5 rounded-2xl border-2 flex flex-col gap-3 ${
                      quizFeedback === 'correct' 
                        ? 'bg-green-50 border-green-200 text-green-900' 
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {quizFeedback === 'correct' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                      <span className="font-black uppercase text-xs tracking-widest">
                        {quizFeedback === 'correct' ? 'Chính Xác!' : 'Trả Lời Sai (Bị phạt cược)'}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm font-medium leading-relaxed">{currentQuiz.desc}</p>
                    
                    <button
                      onClick={handleQuizResultClose}
                      className={`self-end px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                        quizFeedback === 'correct' 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Tiếp tục ván bài
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardGame;
