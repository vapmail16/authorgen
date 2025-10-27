FROM nginx:alpine

# Set which site to deploy (default to latest)
ARG SITE=arjun-singh-2025-10-16

# Copy the entire site directory
COPY generated-sites/${SITE} /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

