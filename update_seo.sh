#!/bin/bash
# Update SEO meta tags for HTML files

update_file() {
    local file=$1
    local title=$2
    local description=$3
    local page_type=$4
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Update meta tags
    sed -i "s|<title>.*</title>|<title>$title</title>|" "$file"
    sed -i "s|<meta name=\"description\" content=\".*\">|<meta name=\"description\" content=\"$description\">|" "$file"
    sed -i "s|<meta property=\"og:title\" content=\".*\">|<meta property=\"og:title\" content=\"$title\">|" "$file"
    sed -i "s|<meta property=\"og:description\" content=\".*\">|<meta property=\"og:description\" content=\"$description\">|" "$file"
    sed -i "s|<meta property=\"twitter:title\" content=\".*\">|<meta property=\"twitter:title\" content=\"$title\">|" "$file"
    sed -i "s|<meta property=\"twitter:description\" content=\".*\">|<meta property=\"twitter:description\" content=\"$description\">|" "$file"
    
    # Update canonical URL
    local base_url="https://ai-agency-cx.github.io/Infralyze-consulting/"
    local page_name=$(basename "$file")
    sed -i "s|<link rel=\"canonical\" href=\".*\">|<link rel=\"canonical\" href=\"${base_url}${page_name}\">|" "$file"
    
    # Update Open Graph URL
    sed -i "s|<meta property=\"og:url\" content=\".*\">|<meta property=\"og:url\" content=\"${base_url}${page_name}\">|" "$file"
    sed -i "s|<meta property=\"twitter:url\" content=\".*\">|<meta property=\"twitter:url\" content=\"${base_url}${page_name}\">|" "$file"
    
    echo "Updated SEO for: $file"
}

# Update about.html
update_file "about.html" \
    "About Infralyze Solutions | Our Mission & Team" \
    "Learn about Infralyze Solutions - Our mission, experienced team, and expertise in AI & IT infrastructure consulting." \
    "about"

# Update services.html
update_file "services.html" \
    "Our Services | AI Solutions & IT Infrastructure Consulting" \
    "Comprehensive AI solutions, IT infrastructure consulting, cloud architecture, and cybersecurity services for enterprise and government." \
    "services"

# Update case-studies.html
update_file "case-studies.html" \
    "Case Studies | Infralyze Solutions Client Success Stories" \
    "Explore our client success stories and case studies in AI implementation and IT infrastructure transformation." \
    "case-studies"

# Update contact.html
update_file "contact.html" \
    "Contact Infralyze Solutions | Get in Touch" \
    "Contact Infralyze Solutions for AI and IT infrastructure consulting. Get in touch with our expert team." \
    "contact"

echo "SEO updates completed for all pages"
