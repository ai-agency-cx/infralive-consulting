#!/bin/bash
# Add security meta tags to HTML files

SECURITY_TAGS='    <!-- Security Headers (as meta tags for GitHub Pages) -->
    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https://www.googletagmanager.com https://www.google-analytics.com; style-src '\''self'\'' '\''unsafe-inline'\'' https://fonts.googleapis.com; font-src '\''self'\'' https://fonts.gstatic.com; img-src '\''self'\'' data: https:; connect-src '\''self'\'' https://www.google-analytics.com; frame-src '\''none'\''; object-src '\''none'\''; base-uri '\''self'\'';">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()">'

for file in about.html services.html case-studies.html contact.html; do
    # Insert security tags before stylesheet link
    sed -i "/<link rel=\"stylesheet\" href=\"css\/style.css\">/i\\$SECURITY_TAGS" "$file"
    echo "Added security tags to: $file"
done

echo "Security meta tags added to all HTML files"
