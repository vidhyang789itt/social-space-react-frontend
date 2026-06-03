import { motion, type Variants } from "framer-motion";
import { MessageCircle, Users, Image as ImageIcon, Bell } from "lucide-react";
import {
  LandingContainer,
  HeroSection,
  Title,
  Subtitle,
  ActionGroup,
  PrimaryButton,
  SecondaryButton,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDesc,
  BackgroundBlob,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel,
  CtaSection,
  CtaTitle,
} from "../../styles/PageNotFound";

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: <Users size={32} />,
      title: "Connect Freely",
      desc: "Find and connect with friends, family, and people who share your interests globally.",
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Real-time Chat",
      desc: "Experience seamless, lightning-fast messaging with live typing indicators and read receipts.",
    },
    {
      icon: <ImageIcon size={32} />,
      title: "Share Moments",
      desc: "Upload photos, share updates, and let your network know what you're up to in real-time.",
    },
    {
      icon: <Bell size={32} />,
      title: "Stay Updated",
      desc: "Never miss out. Get instant notifications for messages, friend requests, and new posts.",
    },
  ];

  const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "10K+", label: "Communities" },
    { number: "50M+", label: "Messages Sent" },
  ];

  return (
    <LandingContainer>
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BackgroundBlob color="#8b5cf6" size="500px" top="-150px" left="-150px" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BackgroundBlob color="#ec4899" size="400px" top="30%" left="75%" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BackgroundBlob color="#3b82f6" size="450px" top="70%" left="-10%" />
      </motion.div>

      <HeroSection>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Title>Welcome to SocialSpace</Title>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Subtitle>
              Connect, share, and engage with your community. Experience a modern social network built for meaningful interactions.
            </Subtitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <ActionGroup>
              <PrimaryButton to="/login">Log In</PrimaryButton>
              <SecondaryButton to="/register">Create Account</SecondaryButton>
            </ActionGroup>
          </motion.div>
        </motion.div>
      </HeroSection>

      <FeaturesSection>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDesc>{feature.desc}</FeatureDesc>
            </FeatureCard>
          </motion.div>
        ))}
      </FeaturesSection>

      <StatsSection>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <StatCard>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          </motion.div>
        ))}
      </StatsSection>

      <CtaSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CtaTitle>Ready to join the conversation?</CtaTitle>
          <PrimaryButton to="/register">Get Started For Free</PrimaryButton>
        </motion.div>
      </CtaSection>
    </LandingContainer>
  );
}
