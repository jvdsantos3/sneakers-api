model User {
  id           String    @id @default(uuid())
  name         String
  email        String    @unique
  passwordHash String    @map("password_hash")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime? @updatedAt @map("updated_at")

  products Product[]

  @@map("users")
}

model Product {
  id        Int       @id @default(autoincrement())
  image     String
  name      String
  size      Int
  brand     String
  price     Int
  amount    Int
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime? @updatedAt @map("updated_at")

  user   User   @relation(fields: [userId], references: [id])
  userId String @map("user_id")

  @@map("products")
}