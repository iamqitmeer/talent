"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowBigUp,
  AtomIcon,
  Edit,
  Share2,
  ChevronDown,
  Check,
  Star,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  MoveRight,
  Zap,
  Shield,
  Users,
  BarChart,
  Sparkles,
  Rocket,
  Trophy,
  MousePointerClick,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Header from "@/components/layout/Header";
import PageWrapper from "@/components/common/PageWrapper";
import { useTransform, useScroll } from "framer-motion";

const useScrollAnimation = (start = 0, end = 100) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const element = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    if (element.current) {
      const elementRect = element.current.getBoundingClientRect();
      setElementTop(elementRect.top + scrollY);
      setClientHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const input = [start, end];
  const output = [0, 1];
  const scroll = useTransform(useScroll().scrollYProgress, input, output);

  return { ref: element, scroll };
};

const Page = () => {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const scaleIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const slideIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };
  const { ref: featuresRef, scroll: featuresScroll } = useScrollAnimation(
    0.1,
    0.6
  );
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-32 pb-20 px-6 mx-auto max-w-screen-xl text-center relative overflow-hidden"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 text-lg px-4 py-2 bg-primary-100 text-primary-700"
              >
                AI-Powered Resume Builder
              </Badge>
            </motion.div>
            <motion.h1
              className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-gray-900 md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Create Your Dream Resume{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                With Talent AI
              </span>
            </motion.h1>
            <motion.p
              className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Build a professional, impactful resume in minutes using the power
              of AI. Stand out from the crowd and land your dream job.
            </motion.p>
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                <Link href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}>
                  Get Started for Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                <Link href="#learn-more">See How It Works</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 relative"
          >
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://cdn.dribbble.com/userupload/7406767/file/original-02b04e0f754a16f89f750758bb7a6de5.jpg?resize=1024x768&vertical=center"
                alt="Talent AI Dashboard Preview"
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </AspectRatio>
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Decorative element"
                width={160}
                height={160}
                className="animate-pulse"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Animated Stats Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren}
          className="py-12 bg-gradient-to-r from-primary-50 to-secondary-50"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Resumes Created", value: "1M+", icon: Edit },
                { label: "Job Offers Received", value: "500K+", icon: Rocket },
                { label: "User Satisfaction", value: "99%", icon: Trophy },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={childVariants}
                  className="text-center"
                >
                  <motion.div
                    className="inline-block p-4 bg-white rounded-full shadow-lg mb-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <stat.icon className="h-8 w-8 text-primary-500" />
                  </motion.div>
                  <motion.h3
                    className="text-4xl font-bold text-primary-700"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trusted By Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-12 "
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-bold text-4xl mb-4 text-center"
              variants={childVariants}
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center items-center gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  title: "Google",
                  img: "https://pngimg.com/d/google_PNG19644.png",
                },
                {
                  title: "Microsoft",
                  img: "https://pngimg.com/uploads/microsoft/microsoft_PNG4.png",
                },
                {
                  title: "Amazon",
                  img: "https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small_2x/amazon-logo-amazon-icon-transparent-free-png.png",
                },
                {
                  title: "Apple",
                  img: "https://icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_168588.png",
                },
                {
                  title: "Facebook",
                  img: "https://logolook.net/wp-content/uploads/2021/06/Facebook-Logo-2019.png",
                },
              ].map((company, index) => (
                <motion.div
                  key={company.title}
                  className="flex items-center justify-center p-6 w-48 h-24"
                  variants={childVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={`${company.img}`}
                    alt={`${company.title} logo`}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          ref={featuresRef}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center"
          id="features"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Unlock your career potential with our cutting-edge tools
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                icon: Zap,
                title: "AI-Powered Suggestions",
                description:
                  "Get personalized AI-driven suggestions to improve your resume and make it stand out from the competition.",
                badge: "AI",
              },
              {
                icon: Edit,
                title: "Real-time Editing",
                description:
                  "Edit your resume in real-time and see instant updates with our intuitive drag-and-drop interface.",
                badge: "User-Friendly",
              },
              {
                icon: Share2,
                title: "One-Click Sharing",
                description:
                  "Share your resume directly with recruiters or download in multiple formats with just one click.",
                badge: "Efficient",
              },
              {
                icon: Shield,
                title: "ATS-Friendly Templates",
                description:
                  "Choose from a variety of ATS-friendly templates to ensure your resume gets past applicant tracking systems.",
                badge: "Optimized",
              },
              {
                icon: Users,
                title: "Industry-Specific Content",
                description:
                  "Access tailored content suggestions based on your industry and job role for a more targeted resume.",
                badge: "Customized",
              },
              {
                icon: BarChart,
                title: "Performance Analytics",
                description:
                  "Track your resume's performance with detailed analytics on views, downloads, and application success rates.",
                badge: "Insightful",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={childVariants}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <feature.icon className="h-8 w-8 text-primary-500" />
                    </motion.div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Badge
                      variant="secondary"
                      className="bg-primary-100 text-primary-700"
                    >
                      {feature.badge}
                    </Badge>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center bg-gray-50"
          id="how-it-works"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            id="learn-more"
            variants={childVariants}
          >
            How Talent AI Works
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Create your perfect resume in just a few simple steps
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                number: 1,
                title: "Choose Your Template",
                description:
                  "Select from our wide range of professionally designed and ATS-optimized templates.",
                icon: MousePointerClick,
              },
              {
                number: 2,
                title: "Input Your Details",
                description:
                  "Fill in your professional information and let our AI suggest improvements and optimizations.",
                icon: Edit,
              },
              {
                number: 3,
                title: "Review and Download",
                description:
                  "Preview your polished resume, make any final adjustments, and download or share it directly.",
                icon: ArrowUpRight,
              },
            ].map((step, index) => (
              <motion.div key={index} variants={childVariants}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-2xl font-bold mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-12" variants={childVariants}>
            <Button
              size="lg"
              asChild
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              <Link href="#get-started">
                <ArrowBigUp className="mr-2 h-5 w-5" /> Get Started Today
              </Link>
            </Button>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Our AI Technology
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Discover the cutting-edge AI that powers Talent AI
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerChildren}
          >
            <motion.div
              variants={childVariants}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                Natural Language Processing
              </h3>
              <p className="text-gray-600 mb-6">
                Our advanced NLP algorithms analyze your resume content to
                provide tailored suggestions and improvements.
              </p>
              <ul className="text-left space-y-2">
                {[
                  "Keyword optimization",
                  "Sentence structure enhancement",
                  "Industry-specific language adaptation",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={childVariants}
              className="relative h-64 md:h-auto"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI Technology Visualization"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center"
          id="testimonials"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            What Our Users Are Saying
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Join thousands of satisfied professionals who have boosted their
            careers with Talent AI
          </motion.p>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[
                {
                  name: "John Doe",
                  role: "Software Engineer",
                  company: "Tech Corp",
                  image: "https://i.pravatar.cc/150?img=1",
                },
                {
                  name: "Jane Smith",
                  role: "Marketing Manager",
                  company: "Brand Co",
                  image: "https://i.pravatar.cc/150?img=2",
                },
                {
                  name: "Alex Johnson",
                  role: "Data Scientist",
                  company: "AI Innovations",
                  image: "https://i.pravatar.cc/150?img=3",
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div variants={childVariants}>
                    <Card className="border-none shadow-lg">
                      <CardHeader>
                        <Avatar className="w-20 h-20 mx-auto">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.role} at {testimonial.company}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg italic">
                          "Talent AI transformed my job search. The AI
                          suggestions were spot-on, and I landed my dream job
                          within weeks of using the platform!"
                        </p>
                      </CardContent>
                      <CardFooter className="justify-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center bg-gray-50"
          id="pricing"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Find the perfect plan to boost your career with Talent AI
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                title: "Basic",
                description: "For individuals just starting out",
                price: "$9.99",
                features: [
                  "1 Resume",
                  "Basic AI Suggestions",
                  "5 Templates",
                  "Email Support",
                ],
                cta: "Choose Basic",
                highlighted: false,
              },
              {
                title: "Pro",
                description: "For professionals seeking more",
                price: "$19.99",
                features: [
                  "Unlimited Resumes",
                  "Advanced AI Features",
                  "All Templates",
                  "Priority Support",
                  "Performance Analytics",
                ],
                cta: "Choose Pro",
                highlighted: true,
              },
              {
                title: "Enterprise",
                description: "For large teams and organizations",
                price: "Custom",
                features: [
                  "All Pro Features",
                  "Custom Branding",
                  "API Access",
                  "Dedicated Account Manager",
                  "Onboarding & Training",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div key={index} variants={childVariants}>
                <Card
                  className={`h-full transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-primary-500 shadow-lg scale-105"
                      : "border-2 border-gray-200 hover:border-primary-300"
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold mb-4">
                      {plan.price}
                      <span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="text-left space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />{" "}
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Real stories from professionals who transformed their careers with
            Talent AI
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                name: "Sarah Thompson",
                role: "UX Designer",
                company: "Tech Innovators Inc.",
                image: "https://i.pravatar.cc/150?img=4",
                story:
                  "Talent AI helped me showcase my UX skills effectively. I received multiple job offers within a month!",
              },
              {
                name: "Michael Chen",
                role: "Data Analyst",
                company: "Global Analytics Corp.",
                image: "https://i.pravatar.cc/150?img=5",
                story:
                  "The AI-powered suggestions highlighted my data skills perfectly. I landed my dream job at a top tech company.",
              },
            ].map((story, index) => (
              <motion.div key={index} variants={childVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{story.name}</CardTitle>
                    <CardDescription>
                      {story.role} at {story.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"{story.story}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* New Section: Latest Blog Posts */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center bg-gray-50"
          id="blog"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={childVariants}
          >
            Stay updated with career tips and resume trends
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                title: "10 Resume Trends for 2024",
                excerpt:
                  "Discover the latest resume trends that will help you stand out in the job market.",
                image:
                  "https://cdn.dribbble.com/userupload/5302258/file/original-bab664bfee87a4536f921be5099ca1d8.jpg?resize=1024x682&vertical=center",
                date: "March 15, 2024",
              },
              {
                title: "Mastering the Art of the Cover Letter",
                excerpt:
                  "Learn how to craft a compelling cover letter that complements your resume.",
                image:
                  "https://cdn.dribbble.com/userupload/6588702/file/original-fe04460e1276fd326172d4a19f62d54a.jpg?resize=1024x683&vertical=center",
                date: "March 10, 2024",
              },
              {
                title: "Navigating Remote Job Interviews",
                excerpt:
                  "Tips and tricks for acing your remote job interviews and landing your dream role.",
                image:
                  "https://cdn.dribbble.com/userupload/5989095/file/original-46c499923c5871f8de1d73c0b887e487.webp?resize=1024x768&vertical=center",
                date: "March 5, 2024",
              },
            ].map((post, index) => (
              <motion.div key={index} variants={childVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="rounded-lg mb-4"
                    />
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <p className="text-sm text-gray-500">{post.date}</p>
                    <Button variant="link">Read More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-20 px-6 mx-auto max-w-screen-xl text-center"
        >
          <motion.h2
            className="font-bold text-4xl mb-12"
            variants={childVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {[
              {
                question: "How does AI help in creating my resume?",
                answer:
                  "Our AI analyzes your input and suggests improvements in phrasing, highlights key achievements, and ensures your resume is optimized for applicant tracking systems (ATS). It also provides industry-specific content suggestions to make your resume more targeted and effective.",
              },
              {
                question: "Can I use Talent AI for free?",
                answer:
                  "Yes, we offer a limited free trial that allows you to create one resume and experience some of our basic features. For full access to all features, including multiple resumes and advanced AI suggestions, we recommend upgrading to one of our paid plans.",
              },
              {
                question: "How often can I update my resume?",
                answer:
                  "You can update your resume as often as you like. We encourage keeping your resume up-to-date with your latest achievements and experiences. With our Pro and Enterprise plans, you have unlimited resume creations and updates.",
              },
              {
                question: "Is my data secure with Talent AI?",
                answer:
                  "Yes, we take data security very seriously. All your personal information and resume data is encrypted and stored securely. We never share your information with third parties without your explicit consent. Our systems are regularly audited to ensure the highest level of security and compliance with data protection regulations.",
              },
              {
                question: "Can I cancel my subscription at any time?",
                answer:
                  "Absolutely. You can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access to your plan's features until the end of your current billing cycle. We don't offer refunds for partial months, but you're welcome to continue using the service until your subscription ends.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={childVariants}>
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="py-20 my-5 px-6 mx-auto max-w-screen-xl text-center bg-primary-50 rounded-2xl"
        >
          <motion.h2
            className="font-bold text-4xl mb-4"
            variants={childVariants}
          >
            Ready to Supercharge Your Career?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            variants={childVariants}
          >
            Join thousands of professionals who have boosted their careers with
            Talent AI
          </motion.p>
          <motion.div variants={childVariants}>
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-primary-500 hover:bg-primary-600 text-white"
            >
              <Link href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}>
                Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </motion.div>
          <motion.p
            className="mt-4 text-sm text-gray-500"
            variants={childVariants}
          >
            No credit card required | 14-day free trial
          </motion.p>
        </motion.section>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <Link href="/" className="text-2xl font-bold flex items-center">
                  <Sparkles className="mr-2 h-8 w-8 text-primary-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                    Talent AI
                  </span>
                </Link>
                <p className="text-sm text-gray-400">
                  Empowering careers through AI-driven resume creation and
                  optimization. We're on a mission to help professionals
                  worldwide showcase their best selves.
                </p>
                <div className="flex space-x-4">
                  <Button
                    variant="secondary"
                    className="bg-primary-500 hover:bg-primary-600 text-primary-100"
                    size="icon"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-primary-500 hover:bg-primary-600 text-primary-100"
                    size="icon"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-primary-500 hover:bg-primary-600 text-primary-100"
                    size="icon"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {[
                    "Home",
                    "Features",
                    "Pricing",
                    "Testimonials",
                    "Blog",
                    "Contact",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  {[
                    "Resume Templates",
                    "Career Advice",
                    "Job Search Tips",
                    "Interview Preparation",
                    "Skill Development",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Subscribe to our newsletter for the latest career tips and
                  updates.
                </p>
                <form className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-600"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <Separator className="my-8 bg-gray-800" />
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2024 Talent AI™. All Rights Reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
};

export default Page;
