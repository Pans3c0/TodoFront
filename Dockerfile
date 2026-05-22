# ETAPA 2: Servidor Nginx
FROM nginx:alpine

# Borramos la configuración por defecto y metemos la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos compilados de la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]