"use client"

import type React from "react"
import { useState, type ReactNode, useLayoutEffect, useRef, useCallback } from "react"
import Sidebar from "./Sidebar"
import Lenis from "lenis"
import "./ScrollStack.css"
import {
  BookOpen,
  Video,
  Award,
  BarChart3,
  Play,
  CheckCircle,
  Clock,
  Users,
  Brain,
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Bookmark,
} from "lucide-react"
import { useNavigate } from "react-router-dom";

// ScrollStack Components
export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  onStackComplete?: () => void
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, any>())
  const isUpdatingRef = useRef(false)

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (Number.parseFloat(value) / 100) * containerHeight
    }
    return Number.parseFloat(value as string)
  }, [])

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return

    isUpdatingRef.current = true
    const scrollTop = scroller.scrollTop
    const containerHeight = scroller.clientHeight
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = scroller.querySelector(".scroll-stack-end") as HTMLElement
    const endElementTop = endElement ? endElement.offsetTop : 0

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = card.offsetTop
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : ""
        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(i, newTransform)
      }
    })

    isUpdatingRef.current = false
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
  ])

  const handleScroll = useCallback(() => {
    updateCardTransforms()
  }, [updateCardTransforms])

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })

    lenis.on("scroll", handleScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }

    animationFrameRef.current = requestAnimationFrame(raf)
    lenisRef.current = lenis

    return lenis
  }, [handleScroll])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[]
    cardsRef.current = cards

    const transformsCache = lastTransformsRef.current
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = "transform, filter"
      card.style.transformOrigin = "top center"
      card.style.backfaceVisibility = "hidden"
      card.style.transform = "translateZ(0)"
      card.style.webkitTransform = "translateZ(0)"
      card.style.perspective = "1000px"
      card.style.webkitPerspective = "1000px"
    })

    setupLenis()
    updateCardTransforms()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      isUpdatingRef.current = false
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    setupLenis,
    updateCardTransforms,
  ])

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

// Interfaces
interface BlogPost {
  id: number
  title: string
  category: string
  readTime: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  tags: string[]
  image: string
}

interface VideoContent {
  id: number
  title: string
  expert: string
  duration: string
  topic: string
}

interface Quiz {
  id: number
  title: string
  questions: number
  difficulty: string
  certified: boolean
}

const Education: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("blogs")
  const [activeTab, setActiveTab] = useState<string>("education")
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Common Hair Diseases and Their Prevention",
      category: "Hair Health",
      readTime: "8 min read",
      excerpt: "Learn about the most common hair diseases, their symptoms, and effective prevention strategies.",
      author: "Dr. Sarah Johnson",
      publishDate: "December 15, 2024",
      tags: ["Hair Health", "Prevention", "Dermatology"],
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: `
        <h2>Introduction to Hair Diseases</h2>
        <p>Hair diseases affect millions of people worldwide, ranging from common conditions like dandruff to more serious disorders such as alopecia areata. Understanding these conditions is crucial for early detection and effective treatment.</p>
        
        <h3>Most Common Hair Diseases</h3>
        <h4>1. Androgenetic Alopecia (Male/Female Pattern Baldness)</h4>
        <p>This is the most common cause of hair loss, affecting up to 50% of people over the age of 50. It's characterized by a gradual thinning of hair, typically starting at the temples and crown in men, and diffuse thinning across the scalp in women.</p>
        
        <h4>2. Alopecia Areata</h4>
        <p>An autoimmune condition that causes patchy hair loss. The immune system mistakenly attacks hair follicles, leading to sudden hair loss in round or oval patches.</p>
        
        <h4>3. Telogen Effluvium</h4>
        <p>A temporary form of hair loss that occurs when a large number of hair follicles enter the resting phase simultaneously, often triggered by stress, illness, or hormonal changes.</p>
        
        <h4>4. Seborrheic Dermatitis</h4>
        <p>A common skin condition that affects the scalp, causing scaly, itchy rashes and dandruff. It can lead to hair loss if left untreated.</p>
        
        <h3>Prevention Strategies</h3>
        <ul>
          <li><strong>Maintain a healthy diet:</strong> Ensure adequate intake of proteins, vitamins, and minerals essential for hair health.</li>
          <li><strong>Gentle hair care:</strong> Avoid harsh chemicals, excessive heat styling, and tight hairstyles that can damage hair follicles.</li>
          <li><strong>Stress management:</strong> Practice stress-reduction techniques as chronic stress can contribute to hair loss.</li>
          <li><strong>Regular scalp care:</strong> Keep your scalp clean and moisturized to maintain a healthy environment for hair growth.</li>
          <li><strong>Early intervention:</strong> Seek professional help at the first signs of unusual hair loss or scalp problems.</li>
        </ul>
        
        <h3>When to See a Professional</h3>
        <p>Consult a dermatologist or trichologist if you experience:</p>
        <ul>
          <li>Sudden or patchy hair loss</li>
          <li>Excessive hair shedding (more than 100 hairs per day)</li>
          <li>Scalp irritation, redness, or scaling</li>
          <li>Changes in hair texture or growth patterns</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Understanding common hair diseases and their prevention is the first step toward maintaining healthy hair. Early detection and appropriate treatment can significantly improve outcomes and prevent further hair loss. Remember, what works for one person may not work for another, so it's important to consult with healthcare professionals for personalized advice.</p>
      `,
    },
    {
      id: 2,
      title: "Latest Research in Hair Loss Treatments",
      category: "Research",
      readTime: "12 min read",
      excerpt: "Discover cutting-edge treatments and breakthrough research in hair loss prevention and restoration.",
      author: "Dr. Michael Chen",
      publishDate: "December 10, 2024",
      tags: ["Research", "Treatments", "Innovation"],
      image: "https://images.pexels.com/photos/3845163/pexels-photo-3845163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: `
        <h2>Revolutionary Advances in Hair Loss Treatment</h2>
        <p>The field of hair loss treatment has seen remarkable advances in recent years, with new therapies offering hope to millions suffering from various forms of alopecia. This comprehensive review explores the latest research and breakthrough treatments that are changing the landscape of hair restoration.</p>
        
        <h3>Stem Cell Therapy</h3>
        <p>One of the most promising developments in hair loss treatment is the use of stem cell therapy. Researchers have discovered that stem cells can be used to regenerate hair follicles and promote new hair growth.</p>
        
        <h4>Adipose-Derived Stem Cells (ADSCs)</h4>
        <p>Studies have shown that ADSCs can differentiate into various cell types, including those found in hair follicles. Clinical trials have demonstrated significant improvements in hair density and thickness when ADSCs are injected into the scalp.</p>
        
        <h4>Platelet-Rich Plasma (PRP) Enhanced with Stem Cells</h4>
        <p>Combining PRP with stem cell therapy has shown even more promising results, with patients experiencing faster and more robust hair regrowth compared to traditional PRP treatments alone.</p>
        
        <h3>Gene Therapy Approaches</h3>
        <p>Recent breakthroughs in gene therapy have opened new avenues for treating genetic forms of hair loss.</p>
        
        <h4>CRISPR-Cas9 Technology</h4>
        <p>Researchers are exploring the use of CRISPR gene editing to correct genetic mutations that cause hereditary hair loss conditions. Early studies in animal models have shown promising results.</p>
        
        <h4>Gene Expression Modulation</h4>
        <p>Scientists have identified key genes involved in hair follicle development and cycling. New treatments aim to modulate the expression of these genes to promote hair growth and prevent hair loss.</p>
        
        <h3>Novel Pharmaceutical Treatments</h3>
        <h4>JAK Inhibitors</h4>
        <p>Janus kinase (JAK) inhibitors have shown remarkable success in treating alopecia areata. The FDA has approved several JAK inhibitors for this condition, with clinical trials showing significant hair regrowth in many patients.</p>
        
        <h4>Prostaglandin Analogs</h4>
        <p>New prostaglandin analogs are being developed that can extend the growth phase of hair follicles and increase hair density. These treatments show promise for both male and female pattern baldness.</p>
        
        <h3>Advanced Hair Transplantation Techniques</h3>
        <h4>Robotic Hair Transplantation</h4>
        <p>AI-powered robotic systems now offer unprecedented precision in hair transplantation, reducing procedure time and improving graft survival rates.</p>
        
        <h4>Follicular Unit Extraction (FUE) Innovations</h4>
        <p>New FUE techniques, including the use of specialized punches and extraction tools, have improved the success rate of hair transplantation while minimizing scarring.</p>
        
        <h3>Regenerative Medicine</h3>
        <h4>Hair Follicle Cloning</h4>
        <p>Researchers are working on techniques to clone hair follicles in laboratory settings, potentially providing an unlimited source of follicles for transplantation.</p>
        
        <h4>Tissue Engineering</h4>
        <p>Scientists are developing bioengineered hair follicles using a combination of stem cells, growth factors, and scaffolding materials. These artificial follicles could revolutionize hair restoration treatments.</p>
        
        <h3>Personalized Medicine Approaches</h3>
        <p>The future of hair loss treatment lies in personalized medicine, where treatments are tailored to individual genetic profiles and specific causes of hair loss.</p>
        
        <h4>Genetic Testing</h4>
        <p>Advanced genetic testing can now identify specific genetic variants associated with hair loss, allowing for more targeted treatment approaches.</p>
        
        <h4>Biomarker Analysis</h4>
        <p>Researchers are developing panels of biomarkers that can predict treatment response and help clinicians choose the most effective therapy for each patient.</p>
        
        <h3>Future Directions</h3>
        <p>The field of hair loss treatment continues to evolve rapidly, with several exciting developments on the horizon:</p>
        <ul>
          <li>3D bioprinting of hair follicles</li>
          <li>Nanotechnology-based drug delivery systems</li>
          <li>Artificial intelligence for treatment optimization</li>
          <li>Combination therapies targeting multiple pathways</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>The latest research in hair loss treatments offers unprecedented hope for those suffering from various forms of alopecia. From stem cell therapy to gene editing, these breakthrough treatments are transforming the field and providing new options for patients who previously had limited choices. As research continues to advance, we can expect even more innovative and effective treatments to emerge in the coming years.</p>
      `,
    },
    {
      id: 3,
      title: "Essential Prevention Tips for Healthy Hair",
      category: "Prevention",
      readTime: "6 min read",
      excerpt: "Simple yet effective daily habits to maintain healthy hair and prevent common hair problems.",
      author: "Dr. Emily Rodriguez",
      publishDate: "December 8, 2024",
      tags: ["Prevention", "Hair Care", "Lifestyle"],
      image: "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: `
        <h2>Your Guide to Healthy Hair: Prevention is Better Than Cure</h2>
        <p>Maintaining healthy hair doesn't require expensive treatments or complicated routines. With the right knowledge and consistent care, you can prevent most common hair problems and keep your hair looking its best. Here are essential prevention tips that everyone should know.</p>
        
        <h3>Daily Hair Care Routine</h3>
        <h4>1. Gentle Cleansing</h4>
        <p>How you wash your hair can make a significant difference in its health:</p>
        <ul>
          <li>Use lukewarm water instead of hot water to prevent stripping natural oils</li>
          <li>Choose sulfate-free shampoos that are gentler on your hair and scalp</li>
          <li>Don't wash your hair daily unless you have very oily hair</li>
          <li>Focus shampoo on the scalp, not the hair lengths</li>
          <li>Always follow with a conditioner to maintain moisture balance</li>
        </ul>
        
        <h4>2. Proper Drying Techniques</h4>
        <p>How you dry your hair is crucial for preventing damage:</p>
        <ul>
          <li>Gently squeeze out excess water with a microfiber towel</li>
          <li>Avoid rubbing your hair vigorously with a regular towel</li>
          <li>Use a heat protectant before blow-drying</li>
          <li>Keep the blow dryer at least 6 inches away from your hair</li>
          <li>Use the cool setting to finish and seal the hair cuticles</li>
        </ul>
        
        <h3>Nutrition for Healthy Hair</h3>
        <p>Your hair reflects your overall health, and proper nutrition is fundamental:</p>
        
        <h4>Essential Nutrients</h4>
        <ul>
          <li><strong>Protein:</strong> Hair is primarily made of protein. Include lean meats, fish, eggs, legumes, and nuts in your diet</li>
          <li><strong>Iron:</strong> Iron deficiency is a common cause of hair loss. Good sources include spinach, red meat, and lentils</li>
          <li><strong>Vitamin D:</strong> Essential for hair follicle health. Get sunlight exposure and consider supplements if deficient</li>
          <li><strong>Biotin:</strong> Supports hair growth. Found in eggs, nuts, and sweet potatoes</li>
          <li><strong>Omega-3 fatty acids:</strong> Keep hair shiny and healthy. Found in fish, walnuts, and flaxseeds</li>
          <li><strong>Zinc:</strong> Deficiency can cause hair loss. Sources include oysters, pumpkin seeds, and chickpeas</li>
        </ul>
        
        <h4>Hydration</h4>
        <p>Drink plenty of water throughout the day. Dehydration can make hair dry and brittle.</p>
        
        <h3>Lifestyle Factors</h3>
        <h4>Stress Management</h4>
        <p>Chronic stress is a major contributor to hair loss. Implement stress-reduction techniques:</p>
        <ul>
          <li>Regular exercise</li>
          <li>Meditation or mindfulness practices</li>
          <li>Adequate sleep (7-9 hours per night)</li>
          <li>Hobbies and relaxation activities</li>
          <li>Social support and communication</li>
        </ul>
        
        <h4>Sleep Quality</h4>
        <p>Good sleep is essential for hair health:</p>
        <ul>
          <li>Use a silk or satin pillowcase to reduce friction</li>
          <li>Tie long hair loosely to prevent tangling</li>
          <li>Maintain a consistent sleep schedule</li>
          <li>Create a relaxing bedtime routine</li>
        </ul>
        
        <h3>Avoiding Damaging Practices</h3>
        <h4>Heat Styling</h4>
        <ul>
          <li>Limit the use of hot styling tools</li>
          <li>Always use heat protectant products</li>
          <li>Use the lowest effective temperature setting</li>
          <li>Give your hair heat-free days</li>
        </ul>
        
        <h4>Chemical Treatments</h4>
        <ul>
          <li>Space out chemical treatments (coloring, perming, relaxing)</li>
          <li>Choose professional services over at-home treatments</li>
          <li>Deep condition regularly if you use chemical treatments</li>
          <li>Consider gentler alternatives like semi-permanent colors</li>
        </ul>
        
        <h4>Tight Hairstyles</h4>
        <ul>
          <li>Avoid consistently tight ponytails, braids, or buns</li>
          <li>Vary your hairstyles to prevent constant tension on the same areas</li>
          <li>Use soft hair ties without metal clasps</li>
          <li>Give your hair breaks from tight styles</li>
        </ul>
        
        <h3>Environmental Protection</h3>
        <h4>Sun Protection</h4>
        <ul>
          <li>Wear a hat or use UV-protective hair products when outdoors</li>
          <li>Limit prolonged sun exposure</li>
          <li>Rinse hair after swimming in chlorinated pools</li>
        </ul>
        
        <h4>Pollution Protection</h4>
        <ul>
          <li>Cover your hair in heavily polluted areas</li>
          <li>Use clarifying shampoos occasionally to remove buildup</li>
          <li>Consider protective hairstyles in dusty environments</li>
        </ul>
        
        <h3>Regular Maintenance</h3>
        <h4>Trimming</h4>
        <ul>
          <li>Get regular trims every 6-8 weeks to prevent split ends</li>
          <li>Don't wait until damage is severe</li>
          <li>Use sharp, professional scissors for at-home trims</li>
        </ul>
        
        <h4>Scalp Care</h4>
        <ul>
          <li>Massage your scalp regularly to improve circulation</li>
          <li>Use a scalp scrub occasionally to remove buildup</li>
          <li>Keep your scalp clean but not over-cleansed</li>
          <li>Address scalp issues (dandruff, irritation) promptly</li>
        </ul>
        
        <h3>Warning Signs to Watch For</h3>
        <p>Be aware of these signs that may indicate hair problems:</p>
        <ul>
          <li>Excessive hair shedding (more than 100 hairs per day)</li>
          <li>Sudden changes in hair texture or appearance</li>
          <li>Scalp irritation, redness, or unusual odor</li>
          <li>Patchy hair loss</li>
          <li>Persistent dandruff or flaking</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Healthy hair starts with consistent, gentle care and a holistic approach to wellness. By following these prevention tips and making them part of your daily routine, you can maintain strong, beautiful hair and prevent many common hair problems. Remember, what works best can vary from person to person, so pay attention to how your hair responds to different practices and adjust accordingly.</p>
        
        <p>If you notice persistent problems despite following good hair care practices, don't hesitate to consult with a dermatologist or trichologist for professional advice.</p>
      `,
    },
    {
      id: 4,
      title: "Scalp Health: The Foundation of Beautiful Hair",
      category: "Scalp Care",
      readTime: "10 min read",
      excerpt: "Understanding the importance of scalp health and how it affects overall hair condition.",
      author: "Dr. James Wilson",
      publishDate: "December 5, 2024",
      tags: ["Scalp Care", "Hair Health", "Dermatology"],
      image: "https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: `
        <h2>The Scalp: Your Hair's Foundation</h2>
        <p>When we think about hair care, we often focus on the visible strands while neglecting the scalp – the very foundation from which healthy hair grows. A healthy scalp is essential for strong, beautiful hair, yet it's often overlooked in our beauty routines. Understanding scalp health and how to maintain it is crucial for anyone seeking optimal hair health.</p>
        
        <h3>Understanding Scalp Anatomy</h3>
        <p>The scalp is a complex structure consisting of five layers:</p>
        <ol>
          <li><strong>Skin:</strong> The outermost layer containing hair follicles</li>
          <li><strong>Connective tissue:</strong> Contains blood vessels and nerves</li>
          <li><strong>Aponeurosis:</strong> A tough, fibrous layer</li>
          <li><strong>Loose connective tissue:</strong> Allows scalp mobility</li>
          <li><strong>Periosteum:</strong> The membrane covering the skull</li>
        </ol>
        
        <p>The scalp contains approximately 100,000 to 150,000 hair follicles, each with its own sebaceous gland that produces natural oils (sebum) to keep hair moisturized and protected.</p>
        
        <h3>Common Scalp Conditions</h3>
        <h4>1. Dandruff (Seborrheic Dermatitis)</h4>
        <p>Dandruff is one of the most common scalp conditions, characterized by flaking and sometimes itching. It's caused by:</p>
        <ul>
          <li>Overgrowth of Malassezia yeast</li>
          <li>Excessive oil production</li>
          <li>Sensitivity to hair care products</li>
          <li>Stress and hormonal changes</li>
        </ul>
        
        <h4>2. Scalp Psoriasis</h4>
        <p>An autoimmune condition causing thick, scaly patches on the scalp. Symptoms include:</p>
        <ul>
          <li>Thick, silvery scales</li>
          <li>Red, inflamed patches</li>
          <li>Itching and burning sensations</li>
          <li>Temporary hair loss in affected areas</li>
        </ul>
        
        <h4>3. Folliculitis</h4>
        <p>Inflammation of hair follicles, often caused by bacterial or fungal infections. Signs include:</p>
        <ul>
          <li>Small, red bumps around hair follicles</li>
          <li>Pus-filled lesions</li>
          <li>Tenderness and itching</li>
          <li>Temporary hair loss</li>
        </ul>
        
        <h4>4. Scalp Eczema</h4>
        <p>A form of dermatitis that causes:</p>
        <ul>
          <li>Red, inflamed patches</li>
          <li>Intense itching</li>
          <li>Dry, flaky skin</li>
          <li>Sometimes oozing or crusting</li>
        </ul>
        
        <h3>The Scalp-Hair Connection</h3>
        <p>The health of your scalp directly impacts your hair in several ways:</p>
        
        <h4>Blood Circulation</h4>
        <p>Good blood flow to the scalp ensures that hair follicles receive essential nutrients and oxygen needed for healthy hair growth. Poor circulation can lead to:</p>
        <ul>
          <li>Slower hair growth</li>
          <li>Weaker hair strands</li>
          <li>Premature hair loss</li>
        </ul>
        
        <h4>Sebum Production</h4>
        <p>The scalp's sebaceous glands produce natural oils that:</p>
        <ul>
          <li>Moisturize and protect hair strands</li>
          <li>Create a protective barrier against environmental damage</li>
          <li>Maintain the scalp's pH balance</li>
        </ul>
        
        <h4>Follicle Health</h4>
        <p>Healthy follicles are essential for:</p>
        <ul>
          <li>Strong hair growth</li>
          <li>Proper hair cycling</li>
          <li>Resistance to hair loss</li>
        </ul>
        
        <h3>Maintaining Scalp Health</h3>
        <h4>Proper Cleansing</h4>
        <p>Regular, gentle cleansing is fundamental to scalp health:</p>
        <ul>
          <li><strong>Frequency:</strong> Wash 2-3 times per week for normal scalps, daily for oily scalps</li>
          <li><strong>Technique:</strong> Massage gently with fingertips, not nails</li>
          <li><strong>Products:</strong> Choose pH-balanced, sulfate-free shampoos</li>
          <li><strong>Temperature:</strong> Use lukewarm water to avoid stripping natural oils</li>
        </ul>
        
        <h4>Scalp Massage</h4>
        <p>Regular scalp massage provides multiple benefits:</p>
        <ul>
          <li>Improves blood circulation</li>
          <li>Reduces stress and tension</li>
          <li>Helps distribute natural oils</li>
          <li>May stimulate hair growth</li>
        </ul>
        
        <p><strong>How to perform scalp massage:</strong></p>
        <ol>
          <li>Use your fingertips (not nails) to apply gentle pressure</li>
          <li>Start at the hairline and work toward the crown</li>
          <li>Use circular motions for 5-10 minutes</li>
          <li>Can be done with or without oils</li>
        </ol>
        
        <h4>Exfoliation</h4>
        <p>Gentle scalp exfoliation helps remove:</p>
        <ul>
          <li>Dead skin cells</li>
          <li>Product buildup</li>
          <li>Excess oil and debris</li>
        </ul>
        
        <p><strong>Exfoliation methods:</strong></p>
        <ul>
          <li>Scalp scrubs with gentle granules</li>
          <li>Chemical exfoliants (salicylic acid, glycolic acid)</li>
          <li>Clarifying shampoos</li>
          <li>DIY scrubs with sugar or salt</li>
        </ul>
        
        <h3>Nutrition for Scalp Health</h3>
        <p>A healthy scalp requires proper nutrition:</p>
        
        <h4>Essential Nutrients</h4>
        <ul>
          <li><strong>Omega-3 fatty acids:</strong> Reduce inflammation and support scalp health</li>
          <li><strong>Vitamin E:</strong> Antioxidant that protects scalp cells</li>
          <li><strong>Vitamin C:</strong> Supports collagen production and iron absorption</li>
          <li><strong>B vitamins:</strong> Essential for cell metabolism and hair growth</li>
          <li><strong>Zinc:</strong> Important for tissue repair and immune function</li>
          <li><strong>Selenium:</strong> Antioxidant that supports scalp health</li>
        </ul>
        
        <h3>Professional Scalp Treatments</h3>
        <h4>Scalp Analysis</h4>
        <p>Professional scalp analysis can identify:</p>
        <ul>
          <li>Scalp type and condition</li>
          <li>Hair follicle health</li>
          <li>Potential problems</li>
          <li>Appropriate treatment options</li>
        </ul>
        
        <h4>Medical Treatments</h4>
        <p>For serious scalp conditions, medical treatments may include:</p>
        <ul>
          <li>Prescription shampoos and topical treatments</li>
          <li>Oral medications for severe conditions</li>
          <li>Light therapy for certain conditions</li>
          <li>Steroid injections for inflammatory conditions</li>
        </ul>
        
        <h3>DIY Scalp Treatments</h3>
        <h4>Natural Remedies</h4>
        <ul>
          <li><strong>Tea tree oil:</strong> Antimicrobial properties for dandruff and irritation</li>
          <li><strong>Aloe vera:</strong> Soothing and moisturizing for irritated scalps</li>
          <li><strong>Apple cider vinegar:</strong> Helps balance pH and remove buildup</li>
          <li><strong>Coconut oil:</strong> Moisturizing and antimicrobial</li>
          <li><strong>Rosemary oil:</strong> May stimulate circulation and hair growth</li>
        </ul>
        
        <h4>Homemade Scalp Masks</h4>
        <p><strong>For dry scalp:</strong></p>
        <ul>
          <li>Avocado and honey mask</li>
          <li>Coconut oil and aloe vera treatment</li>
          <li>Oatmeal and yogurt mask</li>
        </ul>
        
        <p><strong>For oily scalp:</strong></p>
        <ul>
          <li>Clay and apple cider vinegar mask</li>
          <li>Lemon juice and tea tree oil treatment</li>
          <li>Green tea and mint mask</li>
        </ul>
        
        <h3>Lifestyle Factors Affecting Scalp Health</h3>
        <h4>Stress Management</h4>
        <p>Chronic stress can negatively impact scalp health by:</p>
        <ul>
          <li>Increasing oil production</li>
          <li>Triggering inflammatory conditions</li>
          <li>Disrupting the hair growth cycle</li>
          <li>Weakening the immune system</li>
        </ul>
        
        <h4>Sleep Quality</h4>
        <p>Good sleep supports scalp health through:</p>
        <ul>
          <li>Cellular repair and regeneration</li>
          <li>Hormone regulation</li>
          <li>Stress reduction</li>
          <li>Immune system support</li>
        </ul>
        
        <h4>Environmental Factors</h4>
        <p>Protect your scalp from:</p>
        <ul>
          <li>UV radiation with hats or UV-protective products</li>
          <li>Pollution by covering hair in heavily polluted areas</li>
          <li>Harsh weather conditions</li>
          <li>Chlorine and salt water</li>
        </ul>
        
        <h3>When to See a Professional</h3>
        <p>Consult a dermatologist or trichologist if you experience:</p>
        <ul>
          <li>Persistent itching, burning, or pain</li>
          <li>Unusual hair loss or thinning</li>
          <li>Severe dandruff that doesn't respond to over-the-counter treatments</li>
          <li>Red, inflamed patches that don't heal</li>
          <li>Signs of infection (pus, fever, swollen lymph nodes)</li>
          <li>Sudden changes in scalp condition</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>A healthy scalp is the foundation of beautiful, strong hair. By understanding your scalp's needs and implementing a consistent care routine, you can prevent many common scalp problems and create the optimal environment for healthy hair growth. Remember that scalp health is influenced by both external care and internal factors like nutrition, stress, and overall health.</p>
        
        <p>Investing time and attention in scalp care will pay dividends in the form of healthier, more beautiful hair. Start with gentle, consistent care, and don't hesitate to seek professional help when needed. Your scalp – and your hair – will thank you for it.</p>
      `,
    },
  ]

  const videos: VideoContent[] = [
    {
      id: 1,
      title: "Hair Loss Patterns and Treatment Options",
      expert: "Dr. Sarah Johnson, Dermatologist",
      duration: "15:30",
      topic: "Hair Loss",
    },
    {
      id: 2,
      title: "Advanced Hair Restoration Techniques",
      expert: "Dr. Michael Chen, Trichologist",
      duration: "22:45",
      topic: "Treatments",
    },
    {
      id: 3,
      title: "Understanding Hair Growth Cycles",
      expert: "Dr. Emily Rodriguez, Dermatologist",
      duration: "18:20",
      topic: "Hair Science",
    },
    {
      id: 4,
      title: "Nutrition and Hair Health Connection",
      expert: "Dr. James Wilson, Trichologist",
      duration: "12:15",
      topic: "Nutrition",
    },
  ]

  const quizzes: Quiz[] = [
    {
      id: 1,
      title: "Hair Health Fundamentals",
      questions: 25,
      difficulty: "Beginner",
      certified: true,
    },
    {
      id: 2,
      title: "Common Hair Diseases Recognition",
      questions: 30,
      difficulty: "Intermediate",
      certified: true,
    },
    {
      id: 3,
      title: "Advanced Treatment Methods",
      questions: 35,
      difficulty: "Advanced",
      certified: true,
    },
    {
      id: 4,
      title: "Hair Care Product Knowledge",
      questions: 20,
      difficulty: "Beginner",
      certified: false,
    },
  ]

  const renderBlogDetail = (blog: BlogPost) => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Blog Posts</span>
        </button>

        {/* Article Header */}
        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
                  {blog.category}
                </span>
                <div className="flex items-center text-white/90 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {blog.readTime}
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{blog.title}</h1>
            </div>
          </div>

          <div className="px-8 py-12">
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{blog.publishDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )

  const renderBlogs = () => {
    if (selectedBlog) {
      return renderBlogDetail(selectedBlog)
    }

    return (
      <div className="h-screen relative">
        <div className="text-center mb-8 px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Educational Blog Posts</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Regularly updated blog posts on various hair-related topics such as common diseases, treatments, prevention
            tips, and latest research.
          </p>
        </div>

        <ScrollStack
          className="px-4 sm:px-6 lg:px-8"
          itemDistance={120}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="15%"
          scaleEndPosition="5%"
          baseScale={0.9}
        >
          {blogPosts.map((post) => (
            <ScrollStackItem key={post.id} itemClassName="max-w-4xl mx-auto mb-8">
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedBlog(post)}
              >
                {/* Hero Image */}
                <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-white/90 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readTime}
                      </div>
                    </div>
                    <h4 className="font-bold text-white text-xl sm:text-2xl lg:text-3xl leading-tight">{post.title}</h4>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Read Full Article</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    )
  }

  const renderVideos = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Educational Videos</h3>
        <p className="text-gray-600 max-w-3xl mx-auto px-4">
          Educational videos featuring dermatologists and trichologists discussing different hair issues, treatments,
          and techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative bg-gradient-to-br from-pink-400 to-orange-400 h-40 sm:h-48 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-medium">
                {video.duration}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                  {video.topic}
                </span>
                <Video className="w-5 h-5 text-gray-400" />
              </div>

              <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-2 line-clamp-2">{video.title}</h4>

              <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                <Users className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">{video.expert}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Knowledge Quizzes</h3>
        <div className="space-y-4 max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 sm:p-6 rounded-xl border-l-4 border-pink-500">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-pink-600" />
              Certified Quizzes
            </h4>
            <p className="text-gray-700 text-sm sm:text-base">
              Quizzes designed to test users' knowledge on hair health and diseases, with certification upon completion.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 sm:p-6 rounded-xl border-l-4 border-orange-500">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
              Analysis of Quiz Results
            </h4>
            <p className="text-gray-700 text-sm sm:text-base">
              Analysis of quiz results to provide personalized recommendations and educational content based on users'
              knowledge gaps.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {quiz.certified && (
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-1 rounded-full">
                    <Award className="w-4 h-4" />
                  </div>
                )}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    quiz.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : quiz.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {quiz.difficulty}
                </span>
              </div>
              <Brain className="w-5 h-5 text-gray-400" />
            </div>

            <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-3 line-clamp-2">{quiz.title}</h4>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{quiz.questions} Questions</span>
              {quiz.certified && (
                <span className="flex items-center text-pink-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Certification Available
                </span>
              )}
            </div>

            <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 flex">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slideInUp {
          from {
             opacity: 0;
             transform: translateY(30px);
           }
          to {
             opacity: 1;
             transform: translateY(0);
           }
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Educational Content
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
                Comprehensive educational resources to help you understand hair health, treatments, and best practices
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {!selectedBlog && (
          <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
                {[
                  { id: "blogs", label: "Blog Posts", icon: BookOpen },
                  { id: "videos", label: "Videos", icon: Video },
                  { id: "quizzes", label: "Quizzes", icon: Award },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-3 sm:px-4 lg:px-6 border-b-2 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                      activeSection === tab.id
                        ? "border-pink-500 text-pink-600 bg-pink-50/50"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!selectedBlog && (
          <main className="flex-1">
            {activeSection === "blogs" && renderBlogs()}
            {activeSection === "videos" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">{renderVideos()}</div>
            )}
            {activeSection === "quizzes" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">{renderQuizzes()}</div>
            )}
          </main>
        )}

        {/* Blog Detail View */}
        {selectedBlog && renderBlogDetail(selectedBlog)}
      </div>
    </div>
  )
}

export default Education