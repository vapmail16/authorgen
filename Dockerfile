FROM nginx:alpine

# Copy all generated sites (you can specify which one to serve)
COPY generated-sites/ /usr/share/nginx/html/

# Create nginx config to serve the first available site
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

