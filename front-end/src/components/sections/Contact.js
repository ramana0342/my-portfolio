import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postUserContact } from "../../network/portfolioApiService/portfolioApiService";

export default function Contact({ onMessageSent }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSendLoading, setIsSendLoading] = useState(false);

  const handleSendUserContactData = async (formData) => {
    setIsSendLoading(true);
    try {
      const data = await postUserContact(formData);
      if (data.status.code === 201) {
        reset();
        toast.success(data?.status?.message);
        onMessageSent();
      } else {
        toast.error(data?.status?.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendLoading(false);
    }
  };

  return (
    <section id="contact" className="portfolio-section contact-section">
          <div className="section-shell">
            <div className="section-heading section-heading-wide" data-aos="fade-up">
              <span className="section-kicker">GET IN TOUCH</span>
              <h2>Let's Build Something.</h2>
              <p>Have a project in mind or want to discuss an opportunity? Send me a message and I'll get back to you.</p>
            </div>
            <div className="row" id="ContactRow">
              <div className="col-md-7 contact-form-panel" data-aos="fade-right">
                <span className="contact-panel-label">SEND A MESSAGE</span>
                <h3>Start a conversation.</h3>
                <form onSubmit={handleSubmit(handleSendUserContactData)}>
                  <div className="mb-3">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address"
                        }
                      })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}

                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-mobile" className="form-label">Contact Number <span>Optional</span></label>
                    <input
                      id="contact-mobile"
                      type="text"
                      className="form-control"
                      placeholder="Enter your number"
                      {...register("mobile", {
                        validate: (value) => {
                          if (!value) return true;
                          if (!/^\d{10}$/.test(value)) {
                            return "Enter valid 10-digit mobile number";
                          }
                          return true;
                        }
                      })}
                    />

                    {errors.mobile && (
                      <p className="text-danger">{errors.mobile.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      className="form-control"
                      rows="3"
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 5,
                          message: "Minimum 5 characters"
                        }
                      })}
                    />
                    {errors.message && <p className="text-danger">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSendLoading} className="contact-submit">
                    {isSendLoading ? (<><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Sending...</span></>) : <>Send Message <span>&rarr;</span></>}
                  </button>
                </form>
              </div>
              <div className="col-md-5 contact-details-panel" data-aos="fade-left">
                <span className="contact-panel-label">CONTACT DETAILS</span>
                <h3>Let's connect.</h3>
                <p className="contact-intro">I'm always open to talking about frontend development, collaborative work and new opportunities.</p>
                <div className="contact-details-list">
                  <div className="contact-detail"><i className="bi bi-telephone-fill"></i><div><span>PHONE</span><p>(+91) 7993810342</p></div></div>
                  <div className="contact-detail"><i className="bi bi-envelope-fill"></i><div><span>EMAIL</span><p>ramanareddy.m0342@gmail.com</p></div></div>
                  <div className="contact-detail"><i className="bi bi-browser-chrome"></i><div><span>PORTFOLIO</span><p>https://ramanareddy-portfolio.vercel.app</p></div></div>
                  <div className="contact-detail"><i className="bi bi-linkedin"></i><div><span>LINKEDIN</span><p className="bi-linkedin-content">linkedin.com/in/ramanareddymaddi</p></div></div>
                </div>
              </div>
            </div>
          </div>

        </section>
  );
}
