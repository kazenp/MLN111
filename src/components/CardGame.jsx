import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Club, Heart, Spade, Diamond, RefreshCcw, Hand, Trophy, TriangleAlert, Cpu, ArrowLeft, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUITS = [
  { name: 'Spades', icon: <Spade className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Hearts', icon: <Heart className="w-6 h-6" />, color: 'text-soviet-red' },
  { name: 'Clubs', icon: <Club className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Diamonds', icon: <Diamond className="w-6 h-6" />, color: 'text-soviet-red' },
];

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

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
  },
  {
    q: "Hệ thống tri thức chân thực dưới dạng khái niệm, định luật, học thuyết được thực nghiệm chứng minh thuộc về:",
    options: [
      "Ý thức khoa học",
      "Ý thức tôn giáo",
      "Ý thức pháp quyền",
      "Ý thức chính trị"
    ],
    correct: 0,
    desc: "Ý thức khoa học phản ánh thế giới dưới dạng các tri thức khách quan, hệ thống và được chứng minh bằng các phương pháp nghiên cứu, thực nghiệm."
  },
  {
    q: "Tính kế thừa của ý thức xã hội có nghĩa là:",
    options: [
      "Giai đoạn sau bê nguyên xi ý thức của giai đoạn trước mà không thay đổi",
      "Giai đoạn sau tiếp thu, lọc bỏ và phát triển những giá trị tư tưởng từ thời kỳ trước",
      "Ý thức xã hội được thừa kế các di sản vật chất như nhà xưởng, đất đai",
      "Mỗi thời kỳ lịch sử phát triển tư tưởng hoàn toàn độc lập, cắt rời nhau"
    ],
    correct: 1,
    desc: "Tính kế thừa thể hiện ở chỗ sự phát triển tư tưởng của một thời kỳ luôn dựa trên cơ sở tiếp thu có chọn lọc các thành tựu tư tưởng của quá khứ."
  },
  {
    q: "Ý nghĩa phương pháp luận lớn nhất của mối quan hệ biện chứng này trong thực tiễn là gì?",
    options: [
      "Chỉ cần tập trung cải tạo tư tưởng tinh thần của con người",
      "Muốn cải tạo ý thức xã hội, thay đổi tư tưởng cũ phải bắt đầu từ cải tạo tồn tại xã hội (đời sống vật chất, kinh tế)",
      "Không cần quan tâm đến giáo dục tư tưởng vì kinh tế tự quyết định",
      "Tập trung đầu tư hoàn toàn vào môi trường tự nhiên"
    ],
    correct: 1,
    desc: "Muốn thay đổi ý thức xã hội một cách căn bản phải thay đổi tồn tại xã hội sinh ra nó trước tiên (tức đời sống vật chất, phương thức sản xuất)."
  },
  {
    q: "Quan điểm cho rằng ý thức xã hội hoàn toàn độc lập và quyết định tồn tại xã hội là lập trường của:",
    options: [
      "Chủ nghĩa duy vật lịch sử",
      "Chủ nghĩa duy tâm lịch sử",
      "Chủ nghĩa duy vật biện chứng",
      "Chủ nghĩa duy vật tầm thường"
    ],
    correct: 1,
    desc: "Chủ nghĩa duy tâm lịch sử coi tư tưởng, ý thức xã hội hoặc ý chí của những nhân vật xuất chúng là lực lượng quyết định lịch sử."
  },
  {
    q: "Sai lầm của chủ nghĩa duy vật tầm thường khi xem xét quan hệ này là gì?",
    options: [
      "Tuyệt đối hóa đời sống tinh thần",
      "Tuyệt đối hóa tồn tại xã hội, coi nhẹ tính độc lập tương đối và sự tác động trở lại của ý thức",
      "Coi ý thức là sản phẩm của thần linh",
      "Coi trọng quá mức công tác giáo dục văn hóa tinh thần"
    ],
    correct: 1,
    desc: "Chủ nghĩa duy vật tầm thường chỉ thấy tồn tại xã hội quyết định một chiều mà bỏ qua tính độc lập tương đối và vai trò thúc đẩy của ý thức cách mạng."
  },
  {
    q: "Hình thái ý thức triết học đóng vai trò gì đối với các hình thái ý thức khác?",
    options: [
      "Cung cấp các hình tượng nghệ thuật độc đáo",
      "Cung cấp thế giới quan và phương pháp luận chung nhất để định hướng nhận thức",
      "Quy định luật lệ xử phạt hành chính",
      "Thiết lập giáo lý thờ cúng tâm linh"
    ],
    correct: 1,
    desc: "Ý thức triết học phản ánh hiện thực một cách khái quát nhất, cung cấp thế giới quan và phương pháp luận định hướng cho khoa học, đạo đức, chính trị..."
  },
  {
    q: "Tác động của điều kiện tự nhiên - hoàn cảnh địa lý đối với sự phát triển xã hội là:",
    options: [
      "Nhân tố quyết định trực tiếp tiến trình lịch sử",
      "Điều kiện thường xuyên, tất yếu, ảnh hưởng đến sự sinh tồn và phát triển của xã hội",
      "Không có bất kỳ vai trò hay ảnh hưởng nào",
      "Chỉ tác động trong thời kỳ nguyên thủy hoang sơ"
    ],
    correct: 1,
    desc: "Điều kiện tự nhiên là nền tảng không thể thiếu cho đời sống con người, nhưng nó chỉ đóng vai trò ảnh hưởng chứ không quyết định trực tiếp xã hội."
  },
  {
    q: "Sự biến đổi của ý thức xã hội xét đến cùng bắt nguồn từ biến đổi của:",
    options: [
      "Nghị quyết của các đảng phái chính trị",
      "Sự phát triển của lực lượng sản xuất và phương thức sản xuất vật chất",
      "Hệ thống khí hậu thời tiết tự nhiên",
      "Ý chí chủ quan của các nhà khoa học vĩ đại"
    ],
    correct: 1,
    desc: "Xét đến cùng, mọi sự thay đổi trong đời sống tinh thần đều phản ánh những biến đổi sâu xa trong phương thức sản xuất của cải vật chất của xã hội."
  },
  {
    q: "Để xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc, chúng ta cần:",
    options: [
      "Loại bỏ hoàn toàn các giá trị tư tưởng cũ trong lịch sử",
      "Kế thừa các giá trị tinh thần tốt đẹp, kết hợp tiếp thu tinh hoa nhân loại và cải tạo tư tưởng cũ lỗi thời",
      "Sao chép nguyên bản mô hình văn hóa nước ngoài",
      "Đóng cửa hoàn toàn để bảo vệ tư tưởng truyền thống"
    ],
    correct: 1,
    desc: "Xây dựng văn hóa mới đòi hỏi kế thừa có chọn lọc di sản tinh thần dân tộc đồng thời tiếp thu khoa học, văn hóa tiến bộ của thế giới."
  }
];

const Card = ({ card, hidden }) => (
  <motion.div
    initial={{ scale: 0, rotateY: 180 }}
    animate={{ scale: 1, rotateY: hidden ? 180 : 0 }}
    className={`w-24 h-36 bg-white rounded-xl border-2 border-zinc-200 shadow-lg flex flex-col items-center justify-center relative overflow-hidden ${hidden ? 'bg-soviet-red shadow-[0_0_20px_rgba(220,38,38,0.3)]' : ''}`}
  >
    {hidden ? (
      <div className="w-full h-full flex items-center justify-center bg-soviet-red">
        <div className="w-12 h-20 border-2 border-white/20 rounded-lg flex items-center justify-center text-white/20 font-black text-2xl italic">?</div>
      </div>
    ) : (
      <>
        <div className={`absolute top-2 left-2 font-black text-lg ${card.suit.color}`}>{card.value}</div>
        <div className={`${card.suit.color} scale-125`}>{card.suit.icon}</div>
        <div className={`absolute bottom-2 right-2 font-black text-lg rotate-180 ${card.suit.color}`}>{card.value}</div>
      </>
    )}
  </motion.div>
);

const CardGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); 
  const [message, setMessage] = useState('Chào mừng đến với trò chơi kiến thức Tồn tại xã hội & Ý thức xã hội!');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  const isXiBan = (hand) => hand.length === 2 && hand.every(c => c.value === 'A');
  const isXiDach = (hand) => hand.length === 2 && hand.some(c => c.value === 'A') && hand.some(c => ['10', 'J', 'Q', 'K'].includes(c.value));

  const calculateScore = (hand) => {
    if (!hand || hand.length === 0) return 0;
    let score = 0;
    let aces = 0;
    for (let card of hand) {
      if (card.value === 'A') {
        aces += 1;
        score += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  };

  const createDeck = () => {
    const newDeck = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const newDeck = createDeck();
    const pHand = [newDeck.pop(), newDeck.pop()];
    const dHand = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setPlayerScore(calculateScore(pHand));
    setDealerScore(calculateScore(dHand));
    setWrongAnswers(0);
    setShowResultOverlay(false);

    // Check Special Hands Immediately
    const playerXB = isXiBan(pHand);
    const playerXD = isXiDach(pHand);
    const dealerXB = isXiBan(dHand);
    const dealerXD = isXiDach(dHand);

    if (playerXB || playerXD || dealerXB || dealerXD) {
      setGameState('finished');
      setShowResultOverlay(true);
      if (playerXB && !dealerXB) setMessage("XÌ BÀN! Bạn thắng tuyệt đối!");
      else if (dealerXB && !playerXB) setMessage("NHÀ CÁI XÌ BÀN! Bạn đã thua.");
      else if (playerXD && !dealerXD && !dealerXB) setMessage("XÌ DÁCH! Bạn thắng ngay lập tức!");
      else if (dealerXD && !playerXD && !playerXB) setMessage("NHÀ CÁI XÌ DÁCH! Bạn đã thua.");
      else setMessage("Cả hai cùng có bộ bài đặc biệt! Hòa bài (Push)!");
    } else {
      setGameState('playing');
      setMessage('Muốn rút bài? Hãy trả lời đúng câu hỏi về tồn tại xã hội và ý thức xã hội!');
    }
    setQuizFeedback(null);
  };

  const requestHit = () => {
    if (gameState !== 'playing') return;
    const randomQuiz = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuiz(randomQuiz);
    setQuizFeedback(null);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (index) => {
    if (index === currentQuiz.correct) {
      setQuizFeedback('correct');
      // Không tự động đóng, để người chơi đọc giải thích
    } else {
      setQuizFeedback('incorrect');
      setWrongAnswers(prev => prev + 1);
    }
  };

  const closeQuiz = () => {
    if (quizFeedback === 'correct') {
      executeHit();
    } else if (quizFeedback === 'incorrect') {
      if (wrongAnswers >= 3) {
        setGameState('finished');
        setShowResultOverlay(true);
        setMessage("BẠN ĐÃ THUA! Sai 3 câu hỏi, bạn không đủ trình độ để tiếp tục cuộc chơi!");
      } else {
        setMessage(`Sai rồi! Bạn không được rút bài lượt này. (Sai ${wrongAnswers}/3 câu)`);
      }
    }
    setShowQuiz(false);
    setQuizFeedback(null);
  };

  const executeHit = () => {
    const newDeck = [...deck];
    if (newDeck.length === 0) return;
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);
    const score = calculateScore(newHand);
    setPlayerScore(score);

    if (score > 21) {
      setGameState('finished');
      setShowResultOverlay(true);
      setMessage('Quá 21 điểm! Bạn đã thua.');
    } else {
      setMessage("Trả lời đúng! Bạn đã nhận được một lá bài.");
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    setGameState('dealerTurn');
    setMessage('Lượt của Nhà cái...');
  };

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const timer = setTimeout(() => {
        const dScore = calculateScore(dealerHand);
        const pScore = calculateScore(playerHand);
        
        // Logic Nhà cái thông minh & may mắn hơn:
        // 1. Rút nếu dưới 17 (bắt buộc)
        // 2. Rút nếu vẫn thua điểm người chơi và người chơi chưa quắc (đến ngưỡng 19 điểm)
        const shouldHit = dScore < 17 || (dScore < pScore && pScore <= 21 && dScore < 19);

        if (shouldHit) {
          let newDeck = [...deck];
          if (newDeck.length === 0) return;
          
          let nextCard = newDeck[newDeck.length - 1];
          
          // Nếu rút quân tiếp theo bị quắc, có 40% cơ hội tráo sang lá an toàn hơn
          if (calculateScore([...dealerHand, nextCard]) > 21 && Math.random() < 0.4) {
            const safeCardIdx = newDeck.findIndex(c => calculateScore([...dealerHand, c]) <= 21);
            if (safeCardIdx !== -1) {
              // Tráo quân bài an toàn lên đầu để rút
              const safeCard = newDeck.splice(safeCardIdx, 1)[0];
              newDeck.push(safeCard);
              nextCard = safeCard;
            }
          }

          const newCard = newDeck.pop();
          const nextDealerHand = [...dealerHand, newCard];
          setDeck(newDeck);
          setDealerHand(nextDealerHand);
          setDealerScore(calculateScore(nextDealerHand));
        } else {
          setGameState('finished');
          setShowResultOverlay(true);
          if (dScore > 21) setMessage('NHÀ CÁI QUẮC! Bạn đã thắng!');
          else if (pScore > dScore) setMessage('CHÚC MỪNG! Bạn thắng với điểm số cao hơn!');
          else if (pScore < dScore) setMessage('NHÀ CÁI THẮNG! Bạn đã thua rồi.');
          else setMessage('Hòa bài (Push)!');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, dealerHand, deck, playerHand]);

  return (
    <section className="min-h-screen bg-zinc-900 pt-32 pb-20 px-6 flex flex-col items-center overflow-x-hidden relative">
      <AnimatePresence>
        {showResultOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResultOverlay(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -10 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              className={`relative max-w-sm w-full p-8 rounded-[3rem] border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center ${
                message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'bg-soviet-gold border-white text-zinc-900' 
                  : message.includes('Hòa')
                  ? 'bg-zinc-600 border-zinc-400 text-white'
                  : 'bg-soviet-red border-white text-white'
              }`}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-inherit border-4 border-white rounded-full flex items-center justify-center shadow-xl">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') ? (
                  <Trophy className="w-12 h-12" />
                ) : message.includes('Hòa') ? (
                  <RefreshCcw className="w-12 h-12" />
                ) : (
                  <XCircle className="w-12 h-12" />
                )}
              </div>
              
              <h3 className="mt-8 text-3xl font-black uppercase italic tracking-tighter leading-tight mb-4">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'CHIẾN THẮNG!' 
                  : message.includes('Hòa')
                  ? 'KẾT QUẢ HÒA'
                  : 'THẤT BẠI!'}
              </h3>
              
              <p className="font-bold text-lg leading-tight mb-8 opacity-90">
                {message}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95 ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-900'
                }`}
              >
                Chơi ván mới
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full">
        <div className="mb-8 flex justify-start">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-[clamp(1.9rem,4.8vw,4.2rem)] font-black text-soviet-red mb-4 uppercase tracking-[-0.04em] italic leading-none whitespace-nowrap">
            Kiến Thức <span className="text-white">Tồn Tại &amp; Ý Thức Xã Hội</span>
          </h2>
          <div className="h-1.5 w-20 bg-soviet-gold mx-auto mb-6 rounded-full" />
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm px-4">{message}</p>
        </motion.div>

        <div className="grid gap-12">
          {/* Dealer Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Nhà cái
              </span>
              <span className="font-mono font-bold text-soviet-gold text-xl">
                {gameState === 'finished' ? dealerScore : (dealerHand.length > 0 ? '??' : '0')}
              </span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-dashed border-white/5">
              {dealerHand.map((card, i) => (
                <Card key={`dealer-${i}`} card={card} hidden={i === 1 && gameState === 'playing'} />
              ))}
            </div>
          </div>

          {/* Player Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                  <Hand className="w-4 h-4" /> Bạn
                </span>
                {wrongAnswers > 0 && (
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-1">
                    Lỗi: {wrongAnswers}/3
                  </span>
                )}
              </div>
              <span className="font-mono font-bold text-soviet-red text-xl">{playerScore}</span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-soviet-red/10 shadow-[0_0_50px_rgba(220,38,38,0.05)]">
              {playerHand.map((card, i) => (
                <Card key={`player-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {gameState === 'betting' && (
            <button
              onClick={startGame}
              className="px-12 py-5 bg-soviet-red text-white font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              Bắt đầu ván bài
            </button>
          )}

          {gameState === 'playing' && (
            <>
              <button
                onClick={requestHit}
                className="px-10 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest rounded-full hover:bg-zinc-100 transition-all shadow-xl flex items-center gap-3"
              >
                <HelpCircle className="w-5 h-5 text-soviet-red" /> Rút bài (Trả lời Quiz)
              </button>
              <button
                onClick={stand}
                className="px-10 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full hover:bg-red-700 transition-all shadow-xl flex items-center gap-3"
              >
                <Hand className="w-5 h-5" /> Dừng
              </button>
            </>
          )}

          {gameState === 'finished' && (
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xl md:text-3xl font-black uppercase tracking-tighter p-6 rounded-3xl border-2 text-center ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                    ? 'bg-soviet-gold/10 text-soviet-gold border-soviet-gold/20' 
                    : message.includes('Hòa') 
                    ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}
              >
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                  ? <Trophy className="inline w-8 h-8 mr-3 mb-1" /> 
                  : <TriangleAlert className="inline w-8 h-8 mr-3 mb-1" />}
                {message}
              </motion.div>
              <button
                onClick={startGame}
                className="px-12 py-5 bg-white text-zinc-900 font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
              >
                Chơi ván mới
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && currentQuiz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={quizFeedback ? closeQuiz : null}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-soviet-red" />
              
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-soviet-red/10 rounded-2xl flex items-center justify-center text-soviet-red">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-400 font-black uppercase text-xs tracking-widest italic">Tồn tại & Ý thức xã hội</h3>
                  <p className="text-zinc-900 font-bold text-lg leading-tight">{currentQuiz.q}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center group ${
                      quizFeedback === null 
                        ? 'border-zinc-100 hover:border-soviet-red hover:bg-soviet-red/5 text-zinc-700'
                        : idx === currentQuiz.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : quizFeedback === 'incorrect' && idx !== currentQuiz.correct
                        ? 'border-zinc-100 text-zinc-300 opacity-50'
                        : 'border-zinc-100'
                    }`}
                  >
                    <span>{idx + 1}. {option}</span>
                    {quizFeedback !== null && idx === currentQuiz.correct && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-2xl border-2 flex items-start gap-4 ${
                      quizFeedback === 'correct' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {quizFeedback === 'correct' ? (
                      <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-black uppercase text-xs tracking-widest mb-1">
                        {quizFeedback === 'correct' ? 'Chính xác!' : 'Chưa đúng rồi!'}
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{currentQuiz.desc}</p>
                      
                      <button
                        onClick={closeQuiz}
                        className={`mt-4 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                          quizFeedback === 'correct' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Tiếp tục ván bài
                      </button>
                    </div>
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
