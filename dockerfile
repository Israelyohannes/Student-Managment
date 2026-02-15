FROM php:8.2-apache

# Enable PDO MySQL extension (needed for your code)
RUN docker-php-ext-install pdo_mysql

# Copy your app files to Apache web root
COPY . /var/www/html/

# Set permissions (optional but good)
RUN chown -R www-data:www-data /var/www/html
