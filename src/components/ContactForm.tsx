import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const action = form.action;

    setIsSubmitting(true);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        const data = await res.json().catch(() => null);
        if (data && data.errors && Array.isArray(data.errors)) {
          toast.error(data.errors.map((err: any) => err.message).join(', '));
        } else {
          toast.error('Failed to send message. Please try again.');
        }
      }
    } catch (err) {
      toast.error('Failed to send message. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4" action="https://formspree.io/f/xrbykbgr" method="POST">
        <div>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your Name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border-2 border-white text-white placeholder-white/70 rounded-2xl h-12 px-4 ${
              errors.name ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-300 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Your Email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border-2 border-white text-white placeholder-white/70 rounded-2xl h-12 px-4 ${
              errors.email ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Textarea
            id="contact-message"
            name="message"
            placeholder="Write something..."
            autoComplete="off"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`w-full bg-[rgba(161,143,133,0.8)] border-2 border-white text-white placeholder-white/70 rounded-2xl p-4 min-h-[120px] resize-none ${
              errors.message ? 'border-red-400' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-300 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#a18f85] hover:bg-[#8d7a70] text-white border-2 border-white rounded-full h-12 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            'SUBMIT'
          )}
        </Button>
      </form>
    </div>
  );
}