import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { toast } from 'sonner';

export default function UserSupport() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent! We\'ll get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@ecobazaar.com',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 1800-ECO-SHOP',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Green Plaza, Mumbai, India',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const faqs = [
    {
      question: 'How is the carbon footprint calculated?',
      answer: 'We calculate the carbon footprint by considering the entire product lifecycle - from raw material extraction, manufacturing, packaging, to delivery. Our data is verified by third-party environmental agencies.',
    },
    {
      question: 'What makes a product eco-friendly?',
      answer: 'Eco-friendly products on our platform meet strict criteria: sustainable materials, ethical production, minimal packaging, low carbon emissions, and recyclability or biodegradability.',
    },
    {
      question: 'How do I earn Eco Points?',
      answer: 'You earn Eco Points with every purchase. The lower the carbon footprint of your order, the more points you earn. Points can be redeemed for discounts on future purchases.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products. Items must be in original condition. We use carbon-neutral return shipping to maintain our eco-friendly commitment.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order in real-time from your Profile > Order History section. You\'ll receive email updates at each stage of delivery.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship within India. We\'re working on expanding to other countries while maintaining carbon-neutral shipping practices.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] bg-clip-text text-transparent">
          How Can We Help?
        </h1>
        <p className="text-xl text-gray-600">
          We're here to support your eco-friendly shopping journey
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-4 rounded-full ${info.color} mb-4`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#2E7D32]" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Animated Support Icon */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-full p-12 inline-block mb-6">
              <MessageCircle size={100} className="text-[#2E7D32]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              We're Here to Help!
            </h3>
            <p className="text-gray-600">
              Our support team typically responds within 24 hours
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQs */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#2E7D32]" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="shadow-lg bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-green-800 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Check our FAQ section before contacting support</li>
            <li>✓ Include your order number for order-related queries</li>
            <li>✓ Use live chat for immediate assistance (Mon-Fri, 9AM-6PM)</li>
            <li>✓ Check your spam folder for our email responses</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
