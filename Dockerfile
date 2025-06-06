FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Habilitar el módulo rewrite de Apache (común para muchas páginas web dinámicas)
RUN a2enmod rewrite

COPY . /var/www/html/
	
RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R 755 /var/www/html/

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]