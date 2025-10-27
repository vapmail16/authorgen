FROM nginx:alpine

# Set which site to deploy (default to latest)
ARG SITE=arjun-singh-2025-10-16
# Available sites:
# - arjun-singh-artistic-portfolio
# - arjun-singh-elegant-serif
# - arjun-singh-minimal-white
# - arjun-singh-modern-bright
# - arjun-singh-newspaper-style
# - arjun-singh-retro-vintage
# - arjun-singh-tech-dark

# Copy the entire site directory
COPY generated-sites/${SITE} /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

