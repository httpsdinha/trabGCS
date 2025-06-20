# -------------------------
# 🔨 Etapa de Build
# -------------------------
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Instala dependências para o Maven Wrapper
RUN apk add --no-cache bash sed

# Copia o projeto e prepara o Maven Wrapper
COPY . .
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Executa o build com Maven, pulando os testes
RUN ./mvnw clean package -DskipTests

# -------------------------
# 🚀 Etapa de Execução
# -------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o JAR gerado na etapa de build
COPY --from=builder /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para iniciar o app
ENTRYPOINT ["java", "-jar", "app.jar"]
