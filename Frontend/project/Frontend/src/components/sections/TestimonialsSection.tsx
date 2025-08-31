import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
const farmer1 = "https://images.unsplash.com/photo-1607321809142-5364a2fc94a8?q=80&w=961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const farmer2 = "https://images.unsplash.com/photo-1622182605529-ee049ded8c82?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const farmer3 = "https://images.unsplash.com/photo-1628492058844-589eb5dc6a35?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const farmer4 =  "https://images.unsplash.com/photo-1708354056626-c147e2470a8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const farmer5 = "https://plus.unsplash.com/premium_photo-1682092047778-a5ebda1804e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const farmer6 = "https://images.unsplash.com/photo-1709532918611-77db9df9b27d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// To update testimonial images, replace the 'image' URL for each testimonial below with your own image link or local path.
const testimonials = [
  {
    id: 1,
    name: "राजेश कुमार",
    nameEng: "Rajesh Kumar",
    location: "ਪੰਜਾਬ",
    locationEng: "Punjab",
    image: farmer1,
    rating: 5,
    text: "ਕ੍ਰਿਸ਼ੀਕਨੈਕਟ ਦੀ ਮਿੱਟੀ ਜਾਂਚ ਅਤੇ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼ ਨਾਲ ਮੇਰੀ ਖੇਤੀ ਬਿਲਕੁਲ ਬਦਲ ਗਈ। 40% ਵਾਧੂ ਪੈਦਾਵਾਰ ਹੋਈ ਅਤੇ ਖਾਦ 'ਤੇ ਖਰਚ ਵੀ ਘੱਟ ਹੋਇਆ। ਬਹੁਤ ਵਧੀਆ ਐਪ ਹੈ!",
    textEng: "KrishiConnect's soil analysis and crop recommendations have completely transformed our farming. Got 40% more yield and fertilizer costs also reduced. Very good app!"
  },
  {
    id: 2,
    name: "லட்சுமி தேவி",
    nameEng: "Lakshmi Devi", 
    location: "தமிழ்நாடு",
    locationEng: "Tamil Nadu",
    image: farmer2,
    rating: 5,
    text: "வானிலை முன்னறிவிப்பு அம்சம் ரொம்ப நல்லா இருக்கு. இப்போ நீர்ப்பாசனம் திட்டமிட்டு செய்ய முடிகிறது. தண்ணீர் வீணாகாது, பயிரும் பாதுகாப்பாக இருக்கு.",
    textEng: "Weather forecast feature is very good. Now we can plan irrigation properly. No water wastage and crops are also safe."
  },
  {
    id: 3,
    name: "अमित शर्मा",
    nameEng: "Amit Sharma",
    location: "उत्तर प्रदेश", 
    locationEng: "Uttar Pradesh",
    image: farmer3,
    rating: 4,
    text: "पहले तकनीक से डर लगता था, लेकिन यह ऐप बहुत आसान है। रोग पूर्वानुमान फीचर से हमारे टमाटर की फसल बच गई। धन्यवाद KrishiConnect!",
    textEng: "Earlier I was afraid of technology, but this app is very easy. Disease prediction feature saved our tomato crop. Thank you KrishiConnect!"
  },
  {
    id: 4,
    name: "પ્રિયા પટેલ",
    nameEng: "Priya Patel",
    location: "ગુજરાત",
    locationEng: "Gujarat", 
    image: farmer4,
    rating: 5,
    text: "કમ્યુનિટી ફીચર ખાસ છે. બીજાં ખેડૂત મિત્રો સાથે જોડાઈને નવી ટેકનિક્સ શીખવા મળે છે. અમે બધા સાથે ટિપ્સ શેર કરીએ છીએ.",
    textEng: "Community feature is special. Connecting with other farmers and learning new techniques. We all share tips together."
  },
  {
    id: 5,
    name: "मोहम्मद फारूक",
    nameEng: "Mohammad Farooq",
    location: "महाराष्ट्र",
    locationEng: "Maharashtra",
    image: farmer5,
    rating: 5,
    text: "एआय चैटबॉट २४ तास उपलब्ध असतो. कोणताही प्रश्न असो, लगेच उत्तर मिळतं. आमच्यासारख्या व्यस्त शेतकऱ्यांसाठी हे अ‍ॅप परफेक्ट आहे.",
    textEng: "AI chatbot is available 24 hours. Whatever question we have, we get immediate answers. Perfect for busy farmers like us."
  },
  {
    id: 6,
    name: "सुनीता यादव",
    nameEng: "Sunita Yadav", 
    location: "हरियाणा",
    locationEng: "Haryana",
    image: farmer6,
    rating: 5,
    text: "ऑर्गेनिक खेती के बारे में सीखा। अब हमारी सब्जियों की बाजार में बहुत मांग है। KrishiConnect ने हमारी जिंदगी बदल दी है!",
    textEng: "Learned about organic farming. Now our vegetables have great demand in the market. KrishiConnect has changed our lives!"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Automatic right-to-left slider
  useEffect(() => {
    let frame: number;
    let offset = 0;
    const speed = 0.7; // px per frame
    const slider = sliderRef.current;
    if (!slider) return;

    function animate() {
      offset += speed;
      if (offset > slider.scrollWidth / 2) {
        offset = 0;
      }
      slider.scrollLeft = offset;
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-agri-50 via-agri-100 to-agri-200 relative overflow-hidden">
      {/* Blurred agriculture image background */}
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
        alt="Agriculture field background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-lg scale-105 pointer-events-none z-0"
      />
      {/* Decorative glowing shapes */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-golden/20 rounded-full blur-2xl animate-glow" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-glow/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-golden-light/30 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-golden bg-clip-text text-transparent">
            किसान क्या कहते हैं
          </h2>
          <p className="text-lg md:text-xl text-agri-700 max-w-4xl mx-auto leading-relaxed">
            उन किसानों की आवाज़ सुनें जिन्होंने KrishiConnect के साथ अपनी खेती को बदला है
          </p>
        </motion.div>

        {/* Automatic right-to-left slider */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-scroll no-scrollbar py-4"
            style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={idx}
                className="min-w-[340px] max-w-sm bg-card/95 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border-2 border-golden/20 backdrop-blur-md hover:shadow-golden transition-all duration-500"
                style={{ display: "inline-block" }}
              >
                <div className="flex flex-col items-center md:items-start">
                  <div className="rounded-full overflow-hidden w-20 h-20 md:w-24 md:h-24 mb-2 border-4 border-golden/60 shadow-md">
                    <img
                      src={testimonial.image}
                      alt={testimonial.nameEng}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-agri-800">{testimonial.name}</h3>
                  <p className="text-golden font-medium">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`mr-1 ${i < testimonial.rating ? "text-golden fill-golden" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-golden text-5xl font-serif mb-2">"</div>
                  <p className="text-base text-agri-700 italic mb-2 break-words max-w-[260px] overflow-hidden text-ellipsis">
                    {testimonial.text}
                  </p>
                  <div className="text-golden text-5xl font-serif self-end">"</div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm text-muted-foreground italic leading-relaxed break-words max-w-[260px] overflow-hidden text-ellipsis">
                      {testimonial.textEng}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-agri-600 mb-6">
            आप भी बनें KrishiConnect परिवार का हिस्सा
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-agri text-primary-foreground rounded-full font-semibold shadow-agri hover:shadow-golden transition-all duration-300"
          >
            आज ही शुरू करें
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}