#!/bin/bash
# Update footer in all HTML files

FOOTER_CONTENT='            <div class="footer-grid">
                <div>
                    <h4>InfraLive Solutions</h4>
                    <p>Building the digital backbone of tomorrow.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="case-studies.html">Case Studies</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <ul class="footer-links">
                        <li>Email: info@infralive.com</li>
                        <li>Phone: (555) 123-4567</li>
                        <li>Address: 123 Tech Street, San Francisco, CA</li>
                    </ul>
                </div>
                <div>
                    <h4>Newsletter</h4>
                    <p>Subscribe for updates on AI & infrastructure trends.</p>
                    <form class="newsletter-form" id="newsletterForm">
                        <div class="form-group">
                            <input type="email" class="newsletter-input" placeholder="Your email address" required aria-label="Email address for newsletter">
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" required>
                                <span>I agree to receive updates (GDPR compliant)</span>
                            </label>
                        </div>
                        <button type="submit" class="newsletter-btn">Subscribe</button>
                        <div class="newsletter-message" id="newsletterMessage"></div>
                    </form>
                </div>
            </div>'

# Update about.html
sed -i '/<footer class="footer">/,/<\/footer>/c\<footer class="footer">\n    <div class="container">\n'"$FOOTER_CONTENT"'\n        <div class="copyright">\n            &copy; 2026 InfraLive Solutions. All rights reserved.\n        </div>\n    </div>\n</footer>' about.html

# Update services.html
sed -i '/<footer class="footer">/,/<\/footer>/c\<footer class="footer">\n    <div class="container">\n'"$FOOTER_CONTENT"'\n        <div class="copyright">\n            &copy; 2026 InfraLive Solutions. All rights reserved.\n        </div>\n    </div>\n</footer>' services.html

# Update case-studies.html
sed -i '/<footer class="footer">/,/<\/footer>/c\<footer class="footer">\n    <div class="container">\n'"$FOOTER_CONTENT"'\n        <div class="copyright">\n            &copy; 2026 InfraLive Solutions. All rights reserved.\n        </div>\n    </div>\n</footer>' case-studies.html

# Update contact.html
sed -i '/<footer class="footer">/,/<\/footer>/c\<footer class="footer">\n    <div class="container">\n'"$FOOTER_CONTENT"'\n        <div class="copyright">\n            &copy; 2026 InfraLive Solutions. All rights reserved.\n        </div>\n    </div>\n</footer>' contact.html

echo "Footer updated in all HTML files"
