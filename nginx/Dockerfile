FROM nginx:1.19.2-alpine
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
