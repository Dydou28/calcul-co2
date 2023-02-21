FROM nginx:latest
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/front /usr/share/nginx/html

EXPOSE 8080
