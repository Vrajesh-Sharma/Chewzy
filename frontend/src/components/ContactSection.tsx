import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    restaurantName: '',
    contactNumber: '',
    howFoundUs: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.howFoundUs.trim()) {
      newErrors.howFoundUs = 'Please tell us how you found us';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          restaurant_name: formData.restaurantName,
          contact_number: formData.contactNumber,
          how_found_us: formData.howFoundUs,
          message: formData.message
        });

      if (error) throw error;
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ 
        fullName: '', 
        email: '', 
        restaurantName: '', 
        contactNumber: '',
        howFoundUs: '',
        message: '' 
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@chewzy.com",
      link: "mailto:hello@chewzy.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Culinary St, Food District, FC 12345",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="fade-in fade-in-delay-1">
            <div className="card-elegant p-8 rounded-2xl">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="floating-input">
                    <Input
                      id="fullName"
                      placeholder=" "
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={`peer ${errors.fullName ? 'border-destructive' : ''}`}
                    />
                    <label htmlFor="fullName">Full Name</label>
                    {errors.fullName && (
                      <p className="text-destructive text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="floating-input">
                    <Input
                      id="email"
                      type="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`peer ${errors.email ? 'border-destructive' : ''}`}
                    />
                    <label htmlFor="email">Email Address</label>
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Restaurant Name */}
                  <div className="floating-input">
                    <Input
                      id="restaurantName"
                      placeholder=" "
                      value={formData.restaurantName}
                      onChange={(e) => handleChange('restaurantName', e.target.value)}
                      className={`peer ${errors.restaurantName ? 'border-destructive' : ''}`}
                    />
                    <label htmlFor="restaurantName">Restaurant Name</label>
                    {errors.restaurantName && (
                      <p className="text-destructive text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.restaurantName}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="floating-input">
                    <Input
                      id="contactNumber"
                      placeholder=" "
                      value={formData.contactNumber}
                      onChange={(e) => handleChange('contactNumber', e.target.value)}
                      className={`peer ${errors.contactNumber ? 'border-destructive' : ''}`}
                    />
                    <label htmlFor="contactNumber">Contact Number</label>
                    {errors.contactNumber && (
                      <p className="text-destructive text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* How Found Us */}
                <div className="floating-input">
                  <Input
                    id="howFoundUs"
                    placeholder=" "
                    value={formData.howFoundUs}
                    onChange={(e) => handleChange('howFoundUs', e.target.value)}
                    className={`peer ${errors.howFoundUs ? 'border-destructive' : ''}`}
                  />
                  <label htmlFor="howFoundUs">How did you find us?</label>
                  {errors.howFoundUs && (
                    <p className="text-destructive text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.howFoundUs}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="floating-input">
                  <Textarea
                    id="message"
                    placeholder=" "
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`peer resize-none ${errors.message ? 'border-destructive' : ''}`}
                  />
                  <label htmlFor="message">Message</label>
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-ripple bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="fade-in fade-in-delay-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                  Contact Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're here to help! Reach out to us through any of the following channels:
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{info.title}</h4>
                      {info.link === "#" ? (
                        <p className="text-muted-foreground">{info.content}</p>
                      ) : (
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="card-elegant p-6 rounded-xl">
                <h4 className="font-heading font-semibold text-primary mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-primary font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-primary font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-primary font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;