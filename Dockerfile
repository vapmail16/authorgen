FROM nginx:alpine

# Set which site to deploy (default to minimal-white)
ARG SITE=arjun-singh-minimal-white
# Available template-specific sites:
# - arjun-singh-artistic-portfolio (Modern vibrant gradients)
# - arjun-singh-elegant-serif (Classical elegance)
# - arjun-singh-minimal-white (Clean minimal design)
# - arjun-singh-modern-bright (Vibrant modern)
# - arjun-singh-newspaper-style (Editorial newspaper)
# - arjun-singh-retro-vintage (Vintage charm)
# - arjun-singh-tech-dark (High-tech dark)

# Copy the entire site directory
COPY generated-sites/${SITE} /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

