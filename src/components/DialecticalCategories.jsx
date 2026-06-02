import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Users2, Landmark, Zap } from 'lucide-react';

const items = [
  {
    icon: Users2,
    title: 'Tồn tại xã hội quyết định ý thức xã hội',
    desc: 'Ý thức xã hội nảy sinh từ tồn tại xã hội và phản ánh tồn tại xã hội. Khi tồn tại xã hội (đặc biệt là phương thức sản xuất) biến đổi sâu sắc thì ý thức xã hội sớm muộn cũng biến đổi theo.'
  },
  {
    icon: Scale,
    title: 'Ý thức xã hội thường lạc hậu hơn',
    desc: 'Nhiều tập quán, thói quen, định kiến và tư tưởng cũ vẫn bám rễ sâu sắc trong đời sống tinh thần ngay cả khi những điều kiện vật chất sinh ra chúng đã biến đổi hoặc tiêu biến.'
  },
  {
    icon: ShieldCheck,
    title: 'Ý thức xã hội có thể vượt trước',
    desc: 'Các tư tưởng khoa học, cách mạng tiên phong có thể phản ánh vượt trước tiến trình thực tế, dự báo chính xác xu thế khách quan và dẫn dắt hoạt động thực tiễn để cải tạo tồn tại xã hội.'
  },
  {
    icon: Landmark,
    title: 'Tính kế thừa và sự tác động qua lại',
    desc: 'Ý thức xã hội của một thời đại kế thừa di sản tinh thần của thế hệ trước. Đồng thời, các hình thái ý thức chính trị, đạo đức, khoa học, tôn giáo... thường xuyên tác động, ảnh hưởng lẫn nhau.'
  },
  {
    icon: Zap,
    title: 'YTXH TÁC ĐỘNG TRỞ LẠI TTXH',
    desc: 'Ý thức xã hội không thụ động mà có tính độc lập tương đối, tác động mạnh mẽ trở lại tồn tại xã hội. Ý thức tiến bộ, khoa học sẽ thúc đẩy xã hội phát triển; ngược lại, ý thức lạc hậu sẽ cản trước sự tiến bộ.'
  }
];

const DialecticalCategories = () => {
  return (
    <section className="py-24 px-6 bg-zinc-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-soviet-red filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-soviet-gold filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-soviet-red mb-6 uppercase tracking-tighter italic">
            Biện Chứng Quyết Định Của Đời Sống
          </h2>
          <div className="h-2 w-24 bg-soviet-gold mx-auto mb-8 rounded-full" />
          <p className="text-lg text-zinc-500 max-w-3xl mx-auto font-medium">
            Lý giải luận điểm của Marx: Tại sao tồn tại xã hội (đời sống thực tế) giữ vai trò quyết định ý thức xã hội (tư tưởng), và tính độc lập tương đối của nó.
          </p>
        </motion.div>

        <div className="relative">
          {/* Cột cây thẳng đứng / Trục thời gian */}
          <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-soviet-red via-soviet-gold to-soviet-red rounded-full" />

          <div className="space-y-12 md:space-y-16">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title} 
                  className={`flex flex-col md:flex-row items-center relative ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Nội dung card */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="bg-white rounded-3xl border-2 border-zinc-100 p-8 shadow-sm hover:shadow-2xl hover:border-soviet-red/30 transition-all duration-500 relative group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-soviet-red/10 text-soviet-red flex items-center justify-center flex-shrink-0 group-hover:bg-soviet-red group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-zinc-800 uppercase tracking-tight leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-zinc-600 text-sm leading-relaxed font-semibold">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Nút tròn / Nút cây (Dot) */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white bg-soviet-red shadow-lg z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-soviet-gold animate-pulse" />
                  </div>

                  {/* Spacer chiếm chỗ */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DialecticalCategories;
