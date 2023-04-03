FROM rust:1.68 as builder
WORKDIR /usr/src/service
COPY Cargo.* ./
COPY src src
RUN cargo build --release

# Create the final image
FROM rust:1.68-slim-buster
COPY --from=builder /usr/src/service/target/release/hardwire /usr/local/bin/
CMD ["hardwire"]
